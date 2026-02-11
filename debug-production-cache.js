// Script pour debugger le cache du dashboard en production
console.log('🔍 Diagnostic du cache dashboard production...');

// 1. Vérifier localStorage
console.log('📦 localStorage:');
console.log('  - Clés disponibles:', Object.keys(localStorage));
Object.keys(localStorage).forEach(key => {
  if (key.includes('revenue') || key.includes('stats') || key.includes('order')) {
    console.log(`  - ${key}:`, localStorage.getItem(key));
  }
});

// 2. Vérifier sessionStorage
console.log('📦 sessionStorage:');
console.log('  - Clés disponibles:', Object.keys(sessionStorage));
Object.keys(sessionStorage).forEach(key => {
  if (key.includes('revenue') || key.includes('stats') || key.includes('order')) {
    console.log(`  - ${key}:`, sessionStorage.getItem(key));
  }
});

// 3. Vérifier les cookies
console.log('🍪 Cookies:');
document.cookie.split(';').forEach(cookie => {
  const [name, value] = cookie.trim().split('=');
  if (name.includes('revenue') || name.includes('stats') || name.includes('order')) {
    console.log(`  - ${name}:`, value);
  }
});

// 4. Forcer un rechargement complet
console.log('🔄 Forcer rechargement complet...');
setTimeout(() => {
  window.location.reload(true);
}, 2000);
