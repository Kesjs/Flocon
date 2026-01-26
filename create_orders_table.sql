-- Créer la table orders pour sauvegarder les commandes clients
CREATE TABLE orders (
  id TEXT PRIMARY KEY,                    -- ID unique de commande (ex: CMD-123456)
  user_email TEXT,                        -- Email du client
  status TEXT NOT NULL DEFAULT 'En préparation', -- Statut: 'En préparation', 'En cours', 'Livré'
  total DECIMAL(10,2) NOT NULL,           -- Montant total de la commande
  items INTEGER NOT NULL,                 -- Nombre d'articles
  products TEXT[],                        -- Liste des noms de produits
  stripe_session_id TEXT UNIQUE,           -- ID de session Stripe pour référence
  payment_status TEXT NOT NULL,            -- Statut du paiement: 'paid', 'unpaid', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- Date de création
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  -- Date de dernière modification
);

-- Créer un index pour accélérer les recherches par email
CREATE INDEX idx_orders_user_email ON orders(user_email);

-- Créer un index pour les recherches par statut
CREATE INDEX idx_orders_status ON orders(status);

-- Créer un index pour les recherches par date
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Activer le Row Level Security (RLS) pour la sécurité
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Politique: Les utilisateurs ne peuvent voir que leurs propres commandes
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (
    auth.email() = user_email
  );

-- Politique: Les utilisateurs peuvent insérer leurs propres commandes (via webhook)
CREATE POLICY "Service can insert orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Politique: Les utilisateurs peuvent mettre à jour leurs propres commandes
CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (
    auth.email() = user_email
  );

-- Créer un trigger pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Commentaires pour la documentation
COMMENT ON TABLE orders IS 'Table des commandes clients pour Flocon E-commerce';
COMMENT ON COLUMN orders.id IS 'Identifiant unique de commande format CMD-XXXXX';
COMMENT ON COLUMN orders.user_email IS 'Email du client ayant passé la commande';
COMMENT ON COLUMN orders.status IS 'Statut actuel de la commande';
COMMENT ON COLUMN orders.total IS 'Montant total en euros';
COMMENT ON COLUMN orders.items IS 'Nombre total d articles dans la commande';
COMMENT ON COLUMN orders.products IS 'Liste des noms de produits commandés';
COMMENT ON COLUMN orders.stripe_session_id IS 'Référence à la session Stripe';
COMMENT ON COLUMN orders.payment_status IS 'Statut du paiement Stripe';
