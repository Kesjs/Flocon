import { createClient } from '@supabase/supabase-js';
import { Order, OrderStorage } from './order-storage';
import { RealtimeSync, RealtimeOrder } from './realtime-sync';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export class UnifiedOrderManager {
  private userId: string;
  private userEmail: string;
  private realtimeSync: RealtimeSync;

  constructor(userId: string, userEmail: string) {
    this.userId = userId;
    this.userEmail = userEmail;
    this.realtimeSync = new RealtimeSync(userId);
  }

  // Initialiser le système unifié
  async initialize() {
    console.log('🚀 Initialisation UnifiedOrderManager pour:', this.userEmail);
    
    // Démarrer la synchronisation temps réel
    this.realtimeSync.start();
    
    // Configurer les callbacks
    this.setupCallbacks();
    
    // Synchronisation initiale
    await this.fullSync();
    
    console.log('✅ UnifiedOrderManager initialisé');
  }

  // Configurer les callbacks temps réel
  private setupCallbacks() {
    this.realtimeSync.on('newOrder', (order: RealtimeOrder) => {
      console.log('🔔 Nouvelle commande reçue:', order.id);
      this.showNotification('Nouvelle commande', `Commande #${order.id.slice(-8)} créée`);
    });

    this.realtimeSync.on('statusChange', (orderId: string, newStatus: string) => {
      console.log('🔄 Changement de statut:', orderId, '→', newStatus);
      this.showNotification(
        'Commande mise à jour', 
        `Commande #${orderId.slice(-8)} est maintenant ${newStatus}`
      );
    });
  }

  // Créer une commande unifiée (localStorage + Supabase)
  async createOrder(orderData: Omit<Order, 'id' | 'date' | 'userId'>): Promise<Order> {
    console.log('📦 Création commande unifiée...');

    try {
      // 1. Créer dans localStorage (immédiat)
      const localOrder = OrderStorage.addOrder({
        ...orderData,
        userId: this.userId
      });

      // 2. Créer dans Supabase (async)
      const supabaseOrder = {
        id: localOrder.id,
        user_email: this.userEmail,
        total: localOrder.total,
        status: 'pending',
        fst_status: 'pending',
        items: localOrder.items,
        products: localOrder.products,
        created_at: localOrder.date,
        updated_at: localOrder.date
      };

      const { data, error } = await supabase
        .from('orders')
        .insert(supabaseOrder)
        .select()
        .single();

      if (error) {
        console.error('❌ Erreur création Supabase:', error);
        // La commande locale existe déjà, on continue
      } else {
        console.log('✅ Commande créée dans Supabase:', data.id);
      }

      // 3. Notifier l'utilisateur
      this.showNotification(
        'Commande confirmée', 
        `Votre commande #${localOrder.id.slice(-8)} a été enregistrée`
      );

      return localOrder;

    } catch (error) {
      console.error('❌ Erreur création commande unifiée:', error);
      throw error;
    }
  }

  // Synchronisation complète
  async fullSync() {
    console.log('🔄 Synchronisation complète...');
    
    try {
      // 1. Récupérer toutes les commandes Supabase
      let supabaseOrders: any[] = [];
      let supabaseError: any = null;
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_email', this.userEmail)
          .order('created_at', { ascending: false });

        if (error) {
          supabaseError = error;
          console.error('❌ Erreur récupération Supabase:', error);
          
          // Si erreur de permissions, essayer avec user_id si disponible
          if (error.message?.includes('permission') || error.code === '42501') {
            console.log('🔄 Tentative avec user_id...');
            const { data: dataById, error: errorById } = await supabase
              .from('orders')
              .select('*')
              .eq('user_id', this.userId)
              .order('created_at', { ascending: false });
              
            if (!errorById && dataById) {
              supabaseOrders = dataById;
              supabaseError = null;
              console.log('✅ Récupération via user_id réussie');
            }
          }
        } else {
          supabaseOrders = data || [];
        }
      } catch (err) {
        supabaseError = err;
        console.error('❌ Erreur de connexion Supabase:', err);
      }

      // 2. Récupérer les commandes locales (fallback garanti)
      const localOrders = OrderStorage.getUserOrders(this.userId);
      console.log(`📱 Commandes locales: ${localOrders.length}`);

      // 3. Si Supabase a échoué, utiliser uniquement les commandes locales
      if (supabaseError) {
        console.log('⚠️ Supabase indisponible, utilisation des commandes locales uniquement');
        this.updateLocalStorage(localOrders);
        console.log('✅ Synchronisation locale terminée');
        return true;
      }

      // 4. Synchroniser les commandes Supabase vers localStorage
      if (supabaseOrders.length > 0) {
        console.log(`🔄 Synchronisation de ${supabaseOrders.length} commandes Supabase vers localStorage`);
        
        const clientOrders = supabaseOrders.map(order => ({
          id: order.id,
          userId: this.userId,
          date: order.created_at,
          status: this.mapFstStatusToClientStatus(order.fst_status),
          total: order.total,
          items: order.items,
          products: order.products || [],
          trackingNumber: order.tracking_number,
          shippingAddress: order.shipping_address || {
            name: order.customer_name || 'Client',
            address: order.shipping_address?.address || 'Adresse confirmée',
            city: order.shipping_address?.city || 'Ville',
            postalCode: order.shipping_address?.postal_code || '00000',
            phone: order.shipping_address?.phone || 'Téléphone'
          }
        }));

        // Mettre à jour localStorage avec les commandes synchronisées
        this.updateLocalStorage(clientOrders);
        console.log('✅ Commandes Supabase synchronisées dans localStorage');
        return true;
      }

      // 5. Fusionner les données si Supabase est disponible
      await this.mergeOrders(localOrders, supabaseOrders);

      console.log('✅ Synchronisation complète terminée');
      return true;

    } catch (error) {
      console.error('❌ Erreur synchronisation complète:', error);
      
      // Fallback ultime : utiliser uniquement le localStorage
      const localOrders = OrderStorage.getUserOrders(this.userId);
      this.updateLocalStorage(localOrders);
      
      return true; // Ne pas bloquer l'interface
    }
  }

  // Fusionner les commandes locales et Supabase
  private async mergeOrders(localOrders: Order[], supabaseOrders: any[]) {
    const mergedOrders = new Map<string, Order>();

    // 1. Ajouter les commandes Supabase (priorité)
    supabaseOrders.forEach(supabaseOrder => {
      const order: Order = {
        id: supabaseOrder.id,
        userId: this.userId,
        date: supabaseOrder.created_at,
        status: this.mapFstStatusToClientStatus(supabaseOrder.fst_status),
        total: supabaseOrder.total,
        items: supabaseOrder.items,
        products: supabaseOrder.products || [],
        shippingAddress: supabaseOrder.shippingAddress || {
          name: 'Client',
          address: 'Adresse à compléter',
          city: 'Ville',
          postalCode: '00000',
          phone: 'Téléphone'
        }
      };
      mergedOrders.set(supabaseOrder.id, order);
    });

    // 2. Ajouter les commandes locales uniquement si elles n'existent pas dans Supabase
    localOrders.forEach(localOrder => {
      if (!mergedOrders.has(localOrder.id)) {
        mergedOrders.set(localOrder.id, localOrder);
        
        // Tenter de synchroniser cette commande locale vers Supabase
        this.syncLocalToSupabase(localOrder);
      }
    });

    // 3. Mettre à jour localStorage avec les données fusionnées
    const finalOrders = Array.from(mergedOrders.values());
    this.updateLocalStorage(finalOrders);

    console.log(`🔄 Fusion: ${finalOrders.length} commandes finales`);
  }

  // Synchroniser une commande locale vers Supabase
  private async syncLocalToSupabase(localOrder: Order) {
    try {
      const supabaseOrder = {
        id: localOrder.id,
        user_email: this.userEmail,
        total: localOrder.total,
        status: 'pending',
        fst_status: 'pending',
        items: localOrder.items,
        products: localOrder.products,
        created_at: localOrder.date,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('orders')
        .insert(supabaseOrder);

      if (error) {
        console.error('❌ Erreur sync locale → Supabase:', error);
      } else {
        console.log('✅ Commande locale synchronisée:', localOrder.id);
      }
    } catch (error) {
      console.error('❌ Erreur sync locale → Supabase:', error);
    }
  }

  // Mettre à jour localStorage
  private updateLocalStorage(orders: Order[]) {
    if (typeof window === 'undefined') return;

    const ORDERS_KEY = 'flocon_orders';
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

    // Déclencher un événement pour notifier le dashboard
    window.dispatchEvent(new CustomEvent('ordersSynced', { 
      detail: { orders, count: orders.length }
    }));
  }

  // Mapper le statut FST vers le statut client
  private mapFstStatusToClientStatus(fstStatus?: string): Order['status'] {
    switch (fstStatus) {
      case 'confirmed':
        return 'En préparation';  // ✅ CORRECT : Confirmé = En préparation
      case 'declared':
        return 'En préparation';  // ✅ Déclaré = En préparation  
      case 'processing':
        return 'En cours';        // ✅ En traitement = En cours
      case 'rejected':
        return 'Annulé';         // ✅ Rejeté = Annulé
      case 'archived':
        return 'Archivé';        // ✅ Archivé = Archivé
      default:
        return 'En attente';       // ✅ Par défaut = En attente
    }
  }

  // Afficher une notification navigateur
  private showNotification(title: string, body: string) {
    if (typeof window === 'undefined') return;

    // Notification navigateur si permission accordée
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    }

    // Notification visuelle dans l'interface
    const event = new CustomEvent('showNotification', {
      detail: { title, body, type: 'info' }
    });
    window.dispatchEvent(event);
  }

  // Demander la permission pour les notifications
  async requestNotificationPermission() {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  // Obtenir les statistiques unifiées
  getUnifiedStats() {
    const orders = OrderStorage.getUserOrders(this.userId);
    
    const stats = {
      totalOrders: orders.length,
      totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
      averageOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
      deliveredOrders: orders.filter(o => o.status === 'Livré').length,
      preparingOrders: orders.filter(o => o.status === 'En préparation').length,
      pendingOrders: orders.filter(o => o.status === 'En attente').length,
      processingOrders: orders.filter(o => o.status === 'En cours').length,
      lastOrderDate: orders.length > 0 ? new Date(orders[0].date) : null
    };

    return stats;
  }

  // Nettoyer les ressources
  cleanup() {
    this.realtimeSync.cleanup();
    console.log('🧹 UnifiedOrderManager nettoyé');
  }
}
