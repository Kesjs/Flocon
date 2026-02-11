import { useState, useEffect, useRef } from 'react';
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
  
  const [allCopied, setAllCopied] = useState(false);
  const [canDeclare, setCanDeclare] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  // Utiliser une ref pour éviter les re-renders
  const listenerRef = useRef<((event: ClipboardEvent) => void) | null>(null);

  // Écouter les copies des champs existants - mount une seule fois
  useEffect(() => {
    // Nettoyer l'ancien listener s'il existe
    if (listenerRef.current) {
      document.removeEventListener('copy', listenerRef.current);
    }

    // Détecter quand l'utilisateur copie les champs existants
    const handleCopyEvent = (event: ClipboardEvent) => {
      console.log('🔍 Copy event detected!');
      
      const selection = document.getSelection();
      if (selection && selection.toString()) {
        const selectedText = selection.toString().toLowerCase();
        console.log('📋 Text copied:', selectedText);
        
        // Détecter quel champ est copié
        if (selectedText.includes('fr76') || selectedText.includes('3123')) {
          console.log('✅ IBAN detected');
          setCopiedFields(prev => ({ ...prev, iban: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, iban: false })), 10000);
        } else if (selectedText.includes('trbk') || selectedText.includes('trbkfrpp')) {
          console.log('✅ BIC detected');
          setCopiedFields(prev => ({ ...prev, bic: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, bic: false })), 10000);
        } else if (selectedText.includes('megan') || selectedText.includes('victoria') || selectedText.includes('lumale')) {
          console.log('✅ Titulaire detected');
          setCopiedFields(prev => ({ ...prev, titulaire: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, titulaire: false })), 10000);
        } else if (selectedText.includes('#cmd-') || selectedText.includes('cmd-')) {
          console.log('✅ Reference detected');
          setCopiedFields(prev => ({ ...prev, reference: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, reference: false })), 10000);
        } else {
          console.log('❌ No field matched - Text:', selectedText);
        }
      } else {
        console.log('❌ No selection');
      }
    };

    document.addEventListener('copy', handleCopyEvent);
    listenerRef.current = handleCopyEvent;
    console.log('👂 Copy listener added (stable)');
    
    return () => {
      if (listenerRef.current) {
        document.removeEventListener('copy', listenerRef.current);
        listenerRef.current = null;
        console.log('👂 Copy listener removed (stable)');
      }
    };
  }, []); // Mount une seule fois

  // Debug : Afficher l'état des champs copiés
  useEffect(() => {
    console.log('🔄 Copied fields state:', copiedFields);
    console.log('🎯 All copied?', Object.values(copiedFields).every(Boolean));
    console.log('🔓 Can declare?', canDeclare);
  }, [copiedFields, canDeclare]);

  // Vérifier si tous les champs sont copiés
  useEffect(() => {
    const allFieldsCopied = Object.values(copiedFields).every(Boolean);
    setAllCopied(allFieldsCopied);
    
    console.log('🔄 Checking all fields copied:', allFieldsCopied);
    
    // Dès que tous les champs sont copiés, débloquer immédiatement
    if (allFieldsCopied && !canDeclare) {
      console.log('🔓 All fields copied - unlocking button immediately!');
      setCanDeclare(true);
    }
    // Retiré la réinitialisation automatique - une fois débloqué, reste débloqué
  }, [copiedFields]);

  return (
    <div className="space-y-4">
      {/* Case à cocher pour déverrouiller */}
      <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <input
          type="checkbox"
          id="confirm-payment"
          checked={checkboxChecked}
          onChange={(e) => setCheckboxChecked(e.target.checked)}
          className="w-5 h-5 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
        />
        <label htmlFor="confirm-payment" className="text-sm text-amber-800 font-medium cursor-pointer">
          Je confirme avoir effectué le virement bancaire
        </label>
      </div>

      {/* Bouton de déclaration */}
      <button
        onClick={onDeclarePayment}
        disabled={!checkboxChecked || isDeclaring}
        className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg ${
          !checkboxChecked || isDeclaring
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
