// Script pour tester la détection de copie dans le navigateur
console.log('🧪 Test de détection de copie FST');

// Simuler les textes à copier
const testTexts = {
  iban: 'FR76 3123 3123 4503 8488 8911 133',
  bic: 'TRBKFRPPXXX', 
  titulaire: 'Megan Victoria Alicia Lumale',
  reference: 'CMD-1770797125395'
};

// Fonction pour simuler un événement de copie
function simulateCopy(text) {
  console.log(`📋 Simulation copie: "${text}"`);
  
  // Créer un événement de copie simulé
  const copyEvent = new ClipboardEvent('copy', {
    clipboardData: new DataTransfer()
  });
  
  // Ajouter le texte au clipboardData
  copyEvent.clipboardData.setData('text/plain', text);
  
  // Simuler la sélection
  const selection = {
    toString: () => text
  };
  
  // Mock document.getSelection
  Object.defineProperty(document, 'getSelection', {
    value: () => selection,
    writable: true
  });
  
  // Déclencher l'événement
  document.dispatchEvent(copyEvent);
  
  console.log('✅ Événement de copie déclenché');
}

// Test de détection
async function testCopyDetection() {
  console.log('\n🔄 Test de détection des copies...');
  
  // Attendre que la page soit chargée
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Tester chaque champ
  for (const [field, text] of Object.entries(testTexts)) {
    console.log(`\n--- Test ${field.toUpperCase()} ---`);
    simulateCopy(text);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n⏰ Attente de 10 secondes pour le timer...');
  await new Promise(resolve => setTimeout(resolve, 11000));
  
  console.log('\n✅ Test terminé - vérifiez si le bouton est débloqué');
}

// Exécuter le test
testCopyDetection().catch(console.error);
