import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

interface StealthPaymentValidatorProps {
  onDeclarePayment: () => void;
  isDeclaring: boolean;
  order: any;
}

export function StealthPaymentValidator({ onDeclarePayment, isDeclaring, order }: StealthPaymentValidatorProps) {
  const [copiedFields, setCopiedFields] = useState({
    iban: false,
    bic: false,
    titulaire: false,
    reference: false
  });
  
  const [bankConfidence, setBankConfidence] = useState(0);
  const [canDeclare, setCanDeclare] = useState(false);

  // Calcul silencieux de la confiance totale
  useEffect(() => {
    const copiedCount = Object.values(copiedFields).filter(Boolean).length;
    const copyConfidence = (copiedCount / 4) * 50; // Max 50%
    const behaviorConfidence = Math.min(bankConfidence, 50); // Max 50%
    const totalConfidence = copyConfidence + behaviorConfidence;
    
    // Règle silencieuse : débloquer si ≥ 80%
    setCanDeclare(totalConfidence >= 80);
  }, [copiedFields, bankConfidence]);

  // Détection comportementale invisible
  useEffect(() => {
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

  const handleCopy = async (field: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedFields(prev => ({ ...prev, [field]: true }));
      
      // Réinitialiser après 3 secondes (visuel seulement)
      setTimeout(() => {
        setCopiedFields(prev => ({ ...prev, [field]: false }));
      }, 3000);
    } catch (error) {
      console.error('Erreur copie:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Champs bancaires avec retour visuel simple */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium">IBAN</p>
            <p className="text-xs text-gray-600">FR76 3000 4000 0400 0000 1234 5678</p>
          </div>
          <button
            onClick={() => handleCopy('iban', 'FR76 3000 4000 0400 0000 1234 5678')}
            className={`p-2 rounded-lg transition-all ${
              copiedFields.iban 
                ? 'bg-emerald-100 text-emerald-600' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {copiedFields.iban ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium">BIC</p>
            <p className="text-xs text-gray-600">BNPAFRPPXXX</p>
          </div>
          <button
            onClick={() => handleCopy('bic', 'BNPAFRPPXXX')}
            className={`p-2 rounded-lg transition-all ${
              copiedFields.bic 
                ? 'bg-emerald-100 text-emerald-600' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {copiedFields.bic ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium">Titulaire</p>
            <p className="text-xs text-gray-600">Flocon Market</p>
          </div>
          <button
            onClick={() => handleCopy('titulaire', 'Flocon Market')}
            className={`p-2 rounded-lg transition-all ${
              copiedFields.titulaire 
                ? 'bg-emerald-100 text-emerald-600' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {copiedFields.titulaire ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium">Référence</p>
            <p className="text-xs text-gray-600">{order?.id || 'CMD-XXXX'}</p>
          </div>
          <button
            onClick={() => handleCopy('reference', order?.id || 'CMD-XXXX')}
            className={`p-2 rounded-lg transition-all ${
              copiedFields.reference 
                ? 'bg-emerald-100 text-emerald-600' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {copiedFields.reference ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Bouton unique - pas de messages explicatifs */}
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

      {/* Pas de messages d'avertissement - juste le bouton qui change d'état */}
    </div>
  );
}
