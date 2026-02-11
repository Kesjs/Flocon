import { useState, useEffect } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';

interface SmartPaymentButtonProps {
  onDeclarePayment: () => void;
  isDeclaring: boolean;
  order: any;
}

export function SmartPaymentButton({ onDeclarePayment, isDeclaring, order }: SmartPaymentButtonProps) {
  const [copiedFields, setCopiedFields] = useState({
    iban: false,
    bic: false,
    titulaire: false,
    reference: false
  });
  
  const [allCopied, setAllCopied] = useState(false);

  // Vérifier si tous les champs sont copiés
  useEffect(() => {
    const allFieldsCopied = Object.values(copiedFields).every(Boolean);
    setAllCopied(allFieldsCopied);
  }, [copiedFields]);

  const handleCopy = async (field: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedFields(prev => ({ ...prev, [field]: true }));
      
      // Réinitialiser après 5 secondes
      setTimeout(() => {
        setCopiedFields(prev => ({ ...prev, [field]: false }));
      }, 5000);
    } catch (error) {
      console.error('Erreur copie:', error);
    }
  };

  const getProgress = () => {
    const copied = Object.values(copiedFields).filter(Boolean).length;
    return (copied / Object.keys(copiedFields).length) * 100;
  };

  return (
    <div className="space-y-4">
      {/* Barre de progression */}
      <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-emerald-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${getProgress()}%` }}
        />
      </div>
      
      <p className="text-xs text-gray-600 text-center">
        Copiez toutes les informations pour débloquer la déclaration ({Object.values(copiedFields).filter(Boolean).length}/4)
      </p>

      {/* Champs à copier */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium">IBAN</p>
            <p className="text-xs text-gray-600">FR76 3000 4000 0400 0000 1234 5678</p>
          </div>
          <button
            onClick={() => handleCopy('iban', 'FR76 3000 4000 0400 0000 1234 5678')}
            className={`p-2 rounded-lg transition-colors ${
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
            className={`p-2 rounded-lg transition-colors ${
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
            className={`p-2 rounded-lg transition-colors ${
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
            className={`p-2 rounded-lg transition-colors ${
              copiedFields.reference 
                ? 'bg-emerald-100 text-emerald-600' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {copiedFields.reference ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Bouton de déclaration */}
      <button
        onClick={onDeclarePayment}
        disabled={!allCopied || isDeclaring}
        className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg ${
          !allCopied || isDeclaring
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-emerald-500 text-white hover:bg-emerald-600'
        }`}
      >
        {isDeclaring ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Traitement en cours...
          </>
        ) : allCopied ? (
          <>
            PAIEMENT EFFECTUÉ
            <Check size={18} />
          </>
        ) : (
          <>
            <AlertCircle size={18} />
            Copiez toutes les informations
          </>
        )}
      </button>

      {!allCopied && (
        <p className="text-xs text-amber-600 text-center flex items-center justify-center gap-2">
          <AlertCircle size={14} />
          Vous devez copier toutes les informations bancaires avant de déclarer le paiement
        </p>
      )}
    </div>
  );
}
