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
  
  const [allCopied, setAllCopied] = useState(false);
  const [canDeclare, setCanDeclare] = useState(false);

  // Écouter les copies des champs existants
  useEffect(() => {
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
          setTimeout(() => setCopiedFields(prev => ({ ...prev, iban: false })), 15000); // 15s au lieu de 3s
        } else if (selectedText.includes('trbk') || selectedText.includes('bic')) {
          console.log('✅ BIC detected');
          setCopiedFields(prev => ({ ...prev, bic: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, bic: false })), 15000); // 15s au lieu de 3s
        } else if (selectedText.includes('megan') || selectedText.includes('lumale')) {
          console.log('✅ Titulaire detected');
          setCopiedFields(prev => ({ ...prev, titulaire: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, titulaire: false })), 15000); // 15s au lieu de 3s
        } else if (selectedText.includes('#cmd-') || selectedText.includes('cmd-')) {
          console.log('✅ Reference detected');
          // Détecter n'importe quel format de référence CMD
          setCopiedFields(prev => ({ ...prev, reference: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, reference: false })), 15000); // 15s au lieu de 3s
        } else {
          console.log('❌ No field matched');
        }
      } else {
        console.log('❌ No selection');
      }
    };

    document.addEventListener('copy', handleCopyEvent);
    console.log('👂 Copy listener added');
    
    return () => {
      document.removeEventListener('copy', handleCopyEvent);
      console.log('👂 Copy listener removed');
    };
  }, []); // Supprimer order?.id de la dépendance

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
    
    if (allFieldsCopied && !canDeclare) {
      // Si tous les champs sont copiés, débloquer après 10 secondes
      console.log('⏰ Starting 10s timer...');
      const timer = setTimeout(() => {
        console.log('🔓 Timer finished - unlocking button!');
        setCanDeclare(true);
      }, 10000);
      
      return () => {
        console.log('⏹️ Timer cleared');
        clearTimeout(timer);
      };
    }
    
    // Réinitialiser si tous les champs ne sont plus copiés
    if (!allFieldsCopied) {
      console.log('🔒 Not all fields copied - locking button');
      setCanDeclare(false);
    }
  }, [copiedFields, canDeclare]);

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
