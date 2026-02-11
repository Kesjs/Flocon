import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface StealthPaymentValidatorProps {
  onDeclarePayment: () => void;
  isDeclaring: boolean;
  order: any;
  existingCopiedState: string; // 'iban' | 'bic' | '' (état de copie existant)
}

export function StealthPaymentValidator({ onDeclarePayment, isDeclaring, order, existingCopiedState }: StealthPaymentValidatorProps) {
  const [copiedFields, setCopiedFields] = useState({
    iban: false,
    bic: false,
    titulaire: false,
    reference: false
  });
  
  const [bankConfidence, setBankConfidence] = useState(0);
  const [canDeclare, setCanDeclare] = useState(false);

  // Détecter si c'est un mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Timer mobile pour simuler la visite bancaire
  useEffect(() => {
    const copiedCount = Object.values(copiedFields).filter(Boolean).length;
    
    if (copiedCount > 0 && isMobile) {
      // Sur mobile : après 45s d'inactivité post-copie = visite banque simulée
      const mobileTimer = setTimeout(() => {
        setBankConfidence(40); // +40% de confiance
      }, 45000);
      
      return () => clearTimeout(mobileTimer);
    }
  }, [copiedFields, isMobile]);

  // Calcul silencieux de la confiance totale (adapté pour mobile)
  useEffect(() => {
    const copiedCount = Object.values(copiedFields).filter(Boolean).length;
    
    if (isMobile) {
      // Mobile : 70% max pour les copies, pas de détection comportementale
      const copyConfidence = (copiedCount / 4) * 70;
      const totalConfidence = copyConfidence + bankConfidence;
      
      // Mobile : débloquer à 70% au lieu de 80%
      setCanDeclare(totalConfidence >= 70);
    } else {
      // Desktop : 50% copies + 50% comportement = 80% requis
      const copyConfidence = (copiedCount / 4) * 50;
      const behaviorConfidence = Math.min(bankConfidence, 50);
      const totalConfidence = copyConfidence + behaviorConfidence;
      
      setCanDeclare(totalConfidence >= 80);
    }
  }, [copiedFields, bankConfidence, isMobile]);

  // Écouter les copies des champs existants
  useEffect(() => {
    // Détecter quand l'utilisateur copie les champs existants
    const handleCopyEvent = (event: ClipboardEvent) => {
      const selection = document.getSelection();
      if (selection && selection.toString()) {
        const selectedText = selection.toString().toLowerCase();
        
        // Détecter quel champ est copié
        if (selectedText.includes('fr76') || selectedText.includes('3123')) {
          setCopiedFields(prev => ({ ...prev, iban: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, iban: false })), 3000);
        } else if (selectedText.includes('trbk') || selectedText.includes('bic')) {
          setCopiedFields(prev => ({ ...prev, bic: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, bic: false })), 3000);
        } else if (selectedText.includes('megan') || selectedText.includes('lumale')) {
          setCopiedFields(prev => ({ ...prev, titulaire: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, titulaire: false })), 3000);
        } else if (selectedText.includes('cmd-') || selectedText.includes(order?.id?.slice(-8))) {
          setCopiedFields(prev => ({ ...prev, reference: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, reference: false })), 3000);
        }
      }
    };

    document.addEventListener('copy', handleCopyEvent);
    return () => document.removeEventListener('copy', handleCopyEvent);
  }, [order?.id]);

  // Détection comportementale invisible (desktop uniquement)
  useEffect(() => {
    // Pas de détection comportementale sur mobile
    if (isMobile) return;

    let awayInterval: NodeJS.Timeout | null = null;
    let awayStartTime: number | null = null;

    const startAwayTimer = () => {
      if (!awayStartTime) {
        awayStartTime = Date.now();
        
        awayInterval = setInterval(() => {
          const awayTime = Date.now() - (awayStartTime || 0);
          
          // Calcul silencieux de la confiance bancaire
          let confidence = 0;
          if (awayTime >= 300000) confidence = 50; // 5min+
          else if (awayTime >= 120000) confidence = 35; // 2-5min
          else if (awayTime >= 30000) confidence = 20; // 30s-2min
          else if (awayTime >= 10000) confidence = 10; // 10-30s
          
          setBankConfidence(confidence);
        }, 1000);
      }
    };

    const stopAwayTimer = () => {
      if (awayInterval) {
        clearInterval(awayInterval);
        awayInterval = null;
      }
      
      if (awayStartTime) {
        const totalAwayTime = Date.now() - awayStartTime;
        
        // Confiance finale basée sur le temps total
        let finalConfidence = 0;
        if (totalAwayTime >= 300000) finalConfidence = 50; // 5min+
        else if (totalAwayTime >= 120000) finalConfidence = 35; // 2-5min
        else if (totalAwayTime >= 30000) finalConfidence = 20; // 30s-2min
        else if (totalAwayTime >= 10000) finalConfidence = 10; // 10-30s
        
        setBankConfidence(finalConfidence);
      }
      
      awayStartTime = null;
    };

    // Écouteurs invisibles
    window.addEventListener('blur', startAwayTimer);
    window.addEventListener('focus', stopAwayTimer);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        startAwayTimer();
      } else {
        stopAwayTimer();
      }
    });

    return () => {
      window.removeEventListener('blur', startAwayTimer);
      window.removeEventListener('focus', stopAwayTimer);
      document.removeEventListener('visibilitychange', stopAwayTimer);
      if (awayInterval) clearInterval(awayInterval);
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Bouton unique qui s'intègre avec les champs existants */}
      <button
        onClick={onDeclarePayment}
        disabled={!canDeclare || isDeclaring}
        className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg ${
          !canDeclare || isDeclaring
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-emerald-500 text-white hover:bg-emerald-600'
        }`}
      >
        {isDeclaring ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Traitement en cours...
          </>
        ) : (
          <>
            PAIEMENT EFFECTUÉ
            <Check size={18} />
          </>
        )}
      </button>
    </div>
  );
}
