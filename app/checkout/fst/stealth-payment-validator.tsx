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
      const selection = document.getSelection();
      if (selection && selection.toString()) {
        const selectedText = selection.toString().toLowerCase();
        
        // Détecter quel champ est copié
        if (selectedText.includes('fr76') || selectedText.includes('3123')) {
          setCopiedFields(prev => ({ ...prev, iban: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, iban: false })), 15000); // 15s au lieu de 3s
        } else if (selectedText.includes('trbk') || selectedText.includes('bic')) {
          setCopiedFields(prev => ({ ...prev, bic: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, bic: false })), 15000); // 15s au lieu de 3s
        } else if (selectedText.includes('megan') || selectedText.includes('lumale')) {
          setCopiedFields(prev => ({ ...prev, titulaire: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, titulaire: false })), 15000); // 15s au lieu de 3s
        } else if (selectedText.includes('#cmd-') || selectedText.includes('cmd-')) {
          // Détecter n'importe quel format de référence CMD
          setCopiedFields(prev => ({ ...prev, reference: true }));
          setTimeout(() => setCopiedFields(prev => ({ ...prev, reference: false })), 15000); // 15s au lieu de 3s
        }
      }
    };

    document.addEventListener('copy', handleCopyEvent);
    return () => document.removeEventListener('copy', handleCopyEvent);
  }, [order?.id]);

  // Vérifier si tous les champs sont copiés
  useEffect(() => {
    const allFieldsCopied = Object.values(copiedFields).every(Boolean);
    setAllCopied(allFieldsCopied);
    
    if (allFieldsCopied && !canDeclare) {
      // Si tous les champs sont copiés, débloquer après 10 secondes
      const timer = setTimeout(() => {
        setCanDeclare(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
    
    // Réinitialiser si tous les champs ne sont plus copiés
    if (!allFieldsCopied) {
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
