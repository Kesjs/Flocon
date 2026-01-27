export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  category: 'Hiver' | 'Saint-Valentin';
  subCategory: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  stock: number;
  badge?: string;
  ambiance: 'Cocooning' | 'Romantique';
}

// Images locales disponibles
const localImages = [
  '/My-project-1-57.jpg',
  '/Podarok-na-8-marta.webp',
  '/cadeau-saint-valentin-couple.webp',
  '/idees_cadeaux_saint_valentin_couverture.jpg',
  '/lud.jpg',
  '/white-rose-flower-red-tablecloth-blue.jpg',
  '/afro-man-holding-big-heart.jpg',
  '/cadeau-ouverture-femme-coup-moyen_23-2149212140.jpg',
  '/curious-couple-looking-box.jpg',
  '/handmade-heart-heap-presents.jpg',
  '/hands-with-painted-nails-holding-gift.jpg',
  '/ludique-femme-noire-souriante-tenant-rose-blanche-boite-cadeau-forme-coeur-isole-rouge_97712-3167.jpg'
];

// Fonction pour obtenir une image locale aléatoire
const getRandomLocalImage = (index: number): string => {
  return localImages[index % localImages.length];
};

export const products: Product[] = [
  // Produits Hiver (12 produits)
  {
    id: '1',
    slug: 'plaid-manche',
    name: 'Plaid Manche',
    price: 27.99,
    oldPrice: 38.99,
    description: 'Une couverture incroyablement douce qui vous enveloppe de chaleur. Tissée en fibres premium avec une texture nuageuse qui invite au relax absolu.',
    category: 'Hiver',
    subCategory: 'Coperte & Texture',
    rating: 4.8,
    reviewsCount: 234,
    images: [getRandomLocalImage(0)],
    stock: 15,
    badge: 'Bestseller',
    ambiance: 'Cocooning'
  },
  {
    id: '2',
    slug: 'bougie-crepitement',
    name: 'Bougie Crépitement',
    price: 34.99,
    oldPrice: 44,
    description: 'Une bougie artisanale qui reproduit le son relaxant d\'un cheminée. Parfum de bois de cèdre et vanille.',
    category: 'Hiver',
    subCategory: 'Atmosfera & Candele',
    rating: 4.6,
    reviewsCount: 189,
    images: [getRandomLocalImage(1)],
    stock: 28,
    badge: 'Nouveauté',
    ambiance: 'Cocooning'
  },
  {
    id: '3',
    slug: 'tasse-thermo',
    name: 'Tasse Thermo',
    price: 22.99,
    description: 'Tasse isotherme élégante qui garde votre boisson chaude pendant des heures. Design minimaliste avec finition mate.',
    category: 'Hiver',
    subCategory: 'Tazze & Accessori',
    rating: 4.7,
    reviewsCount: 145,
    images: [getRandomLocalImage(2)],
    stock: 35,
    badge: 'Confort garanti',
    ambiance: 'Cocooning'
  },
  {
    id: '4',
    slug: 'bouteille-thermos',
    name: 'Bouteille Thermos Deluxe',
    price: 45.99,
    oldPrice: 59.99,
    description: 'Thermos premium en acier inoxydable avec double paroi. Garde la température pendant 24 heures.',
    category: 'Hiver',
    subCategory: 'Tazze & Accessori',
    rating: 4.5,
    reviewsCount: 98,
    images: [getRandomLocalImage(3)],
    stock: 22,
    badge: 'Qualité premium',
    ambiance: 'Cocooning'
  },
  {
    id: '5',
    slug: 'bonnet-laine',
    name: 'Bonnet Laine Merinos',
    price: 38.99,
    description: 'Bonnet en laine mérinos ultra-douce et chaude. Design nordique avec pompon.',
    category: 'Hiver',
    subCategory: 'Coperte & Texture',
    rating: 4.9,
    reviewsCount: 267,
    images: [getRandomLocalImage(4)],
    stock: 18,
    badge: 'Innovation',
    ambiance: 'Cocooning'
  },
  {
    id: '6',
    slug: 'couverture-électrique',
    name: 'Couverture Électrique',
    price: 89.99,
    oldPrice: 119.99,
    description: 'Couverture chauffante avec 6 niveaux de température. Sécurité garantie avec arrêt automatique.',
    category: 'Hiver',
    subCategory: 'Coperte & Texture',
    rating: 4.4,
    reviewsCount: 89,
    images: [getRandomLocalImage(5)],
    stock: 12,
    badge: 'Atmosphère magique',
    ambiance: 'Cocooning'
  },
  {
    id: '7',
    slug: 'gants-tactiles',
    name: 'Gants Tactiles',
    price: 24.99,
    description: 'Gants chauffants avec compatibilité tactile. Idéaux pour utiliser votre smartphone dehors.',
    category: 'Hiver',
    subCategory: 'Coperte & Texture',
    rating: 4.6,
    reviewsCount: 156,
    images: [getRandomLocalImage(6)],
    stock: 40,
    badge: 'Pratique',
    ambiance: 'Cocooning'
  },
  {
    id: '8',
    slug: 'diffuseur-arome',
    name: 'Diffuseur d\'Arômes',
    price: 32.99,
    description: 'Diffuseur ultrasonique avec lumière LED. Crée une ambiance relaxante avec vos huiles essentielles préférées.',
    category: 'Hiver',
    subCategory: 'Atmosfera & Candele',
    rating: 4.6,
    reviewsCount: 198,
    images: [getRandomLocalImage(7)],
    stock: 25,
    badge: 'Aromathérapie',
    ambiance: 'Cocooning'
  },
  {
    id: '9',
    slug: 'kit-spa',
    name: 'Kit Spa Maison',
    price: 67.99,
    oldPrice: 89.99,
    description: 'Kit complet pour créer votre spa à la maison. Sels de bain, huiles et masques inclus.',
    category: 'Hiver',
    subCategory: 'Atmosfera & Candele',
    rating: 4.9,
    reviewsCount: 156,
    images: [getRandomLocalImage(8)],
    stock: 22,
    badge: 'Cadeau parfait',
    ambiance: 'Cocooning'
  },
  {
    id: '10',
    slug: 'lampe-sel',
    name: 'Lampe en Sel de l\'Himalaya',
    price: 42.99,
    description: 'Lampe naturelle en sel rose de l\'Himalaya. Propriétés détoxifiantes et purifiantes.',
    category: 'Hiver',
    subCategory: 'Atmosfera & Candele',
    rating: 4.7,
    reviewsCount: 98,
    images: [getRandomLocalImage(9)],
    stock: 8,
    badge: 'Naturel',
    ambiance: 'Cocooning'
  },
  {
    id: '11',
    slug: 'coussin-chauffant',
    name: 'Coussin Chauffant',
    price: 28.99,
    description: 'Coussin chauffant micro-ondable avec graines de lavande. Soulage les douleurs musculaires.',
    category: 'Hiver',
    subCategory: 'Coperte & Texture',
    rating: 4.8,
    reviewsCount: 267,
    images: [getRandomLocalImage(10)],
    stock: 12,
    badge: 'Coup de cœur',
    ambiance: 'Cocooning'
  },
  {
    id: '12',
    slug: 'chaussettes-laine',
    name: 'Chaussettes Laine Cachemire',
    price: 19.99,
    description: 'Chaussettes en laine cachemire extrêmement douces. Semelle antidérapante.',
    category: 'Hiver',
    subCategory: 'Coperte & Texture',
    rating: 4.6,
    reviewsCount: 189,
    images: [getRandomLocalImage(11)],
    stock: 15,
    badge: 'Confort absolu',
    ambiance: 'Cocooning'
  },
  
  // Produits Saint-Valentin (12 produits)
  {
    id: '13',
    slug: 'coffret-bijoux',
    name: 'Coffret Bijoux Personnalisé',
    price: 78.99,
    oldPrice: 99.99,
    description: 'Coffret en bois avec bijoux gravés personnalisables. Message secret à l\'intérieur.',
    category: 'Saint-Valentin',
    subCategory: 'Gioielli & Accessori',
    rating: 4.8,
    reviewsCount: 234,
    images: [getRandomLocalImage(0)],
    stock: 18,
    badge: 'Amore eterno',
    ambiance: 'Romantique'
  },
  {
    id: '14',
    slug: 'parfum-luxe',
    name: 'Parfum de Luxe Édition Limitée',
    price: 125.99,
    description: 'Parfum exclusif avec notes florales et boisées. Flacon collector gravé.',
    category: 'Saint-Valentin',
    subCategory: 'Fragranze & Bellezza',
    rating: 4.7,
    reviewsCount: 145,
    images: [getRandomLocalImage(1)],
    stock: 10,
    badge: 'Armonia',
    ambiance: 'Romantique'
  },
  {
    id: '15',
    slug: 'diner-candlelight',
    name: 'Kit Diner Candlelight',
    price: 95.99,
    description: 'Kit complet pour un dîner romantique : bougies, vaisselle et décorations.',
    category: 'Saint-Valentin',
    subCategory: 'Esperienze & Attività',
    rating: 4.9,
    reviewsCount: 312,
    images: [getRandomLocalImage(2)],
    stock: 20,
    badge: 'Momento magico',
    ambiance: 'Romantique'
  },
  {
    id: '16',
    slug: 'collier-message',
    name: 'Collier avec Message Caché',
    price: 58.99,
    description: 'Collier en argent avec médaillon ouvrant contenant un message personnalisé.',
    category: 'Saint-Valentin',
    subCategory: 'Gioielli & Accessori',
    rating: 4.8,
    reviewsCount: 167,
    images: [getRandomLocalImage(3)],
    stock: 6,
    badge: 'Segreto d\'amore',
    ambiance: 'Romantique'
  },
  {
    id: '17',
    slug: 'boite-souvenirs',
    name: 'Boîte à Souvenirs Couple',
    price: 45.99,
    description: 'Boîte en bois personnalisée pour garder vos précieux souvenirs.',
    category: 'Saint-Valentin',
    subCategory: 'Esperienze & Attività',
    rating: 4.6,
    reviewsCount: 198,
    images: [getRandomLocalImage(4)],
    stock: 25,
    badge: 'Relax',
    ambiance: 'Romantique'
  },
  {
    id: '18',
    slug: 'champagne-rosé',
    name: 'Champagne Rosé Millésimé',
    price: 67.99,
    description: 'Bouteille de champagne rosé prestige avec flûtes gravées.',
    category: 'Saint-Valentin',
    subCategory: 'Esperienze & Attività',
    rating: 4.9,
    reviewsCount: 89,
    images: [getRandomLocalImage(5)],
    stock: 12,
    badge: 'Eredità',
    ambiance: 'Romantique'
  },
  {
    id: '19',
    slug: 'massage-oil',
    name: 'Huile de Massage Bio',
    price: 34.99,
    description: 'Huile de massage bio aux huiles essentielles. Relaxante et aphrodisiaque.',
    category: 'Saint-Valentin',
    subCategory: 'Fragranze & Bellezza',
    rating: 4.7,
    reviewsCount: 234,
    images: [getRandomLocalImage(6)],
    stock: 30,
    badge: 'Celebrazione',
    ambiance: 'Romantique'
  },
  {
    id: '20',
    slug: 'album-photo',
    name: 'Album Photo Personnalisé',
    price: 52.99,
    description: 'Album photo en cuir avec gravure personnalisée et pages de qualité.',
    category: 'Saint-Valentin',
    subCategory: 'Esperienze & Attività',
    rating: 4.5,
    reviewsCount: 156,
    images: [getRandomLocalImage(7)],
    stock: 35,
    badge: 'Personalizzato',
    ambiance: 'Romantique'
  },
  {
    id: '21',
    slug: 'coeur-en-chocolat',
    name: 'Cœur en Chocolat Artisanal',
    price: 28.99,
    description: 'Cœur en chocolat belge avec garniture surprise. Emballage luxe.',
    category: 'Saint-Valentin',
    subCategory: 'Gioielli & Accessori',
    rating: 4.8,
    reviewsCount: 267,
    images: [getRandomLocalImage(8)],
    stock: 40,
    badge: 'Dolcezza',
    ambiance: 'Romantique'
  },
  {
    id: '22',
    slug: 'rose-eternelle',
    name: 'Rose Éternelle Stabilisée',
    price: 89.99,
    description: 'Rose naturelle stabilisée qui dure des années. En boîte luxe.',
    category: 'Saint-Valentin',
    subCategory: 'Fragranze & Bellezza',
    rating: 4.9,
    reviewsCount: 312,
    images: [getRandomLocalImage(9)],
    stock: 15,
    badge: 'Eterno',
    ambiance: 'Romantique'
  },
  {
    id: '23',
    slug: 'bracelet-couple',
    name: 'Bracelet Couple Magnétique',
    price: 42.99,
    description: 'Paire de bracelets magnétiques qui s\'attirent. En acier inoxydable.',
    category: 'Saint-Valentin',
    subCategory: 'Gioielli & Accessori',
    rating: 4.6,
    reviewsCount: 189,
    images: [getRandomLocalImage(10)],
    stock: 25,
    badge: 'Connessione',
    ambiance: 'Romantique'
  },
  {
    id: '24',
    slug: 'lettre-damour',
    name: 'Lettre d\'Amor Scentée',
    price: 18.99,
    description: 'Lettre parfumée avec encre invisible et message secret. Coffret élégant.',
    category: 'Saint-Valentin',
    subCategory: 'Esperienze & Attività',
    rating: 4.7,
    reviewsCount: 145,
    images: [getRandomLocalImage(11)],
    stock: 50,
    badge: 'Romantico',
    ambiance: 'Romantique'
  }
];

// Fonctions utilitaires
export const getProductsByCategory = (category: 'Hiver' | 'Saint-Valentin') => {
  return products.filter(product => product.category === category);
};

export const getProductsBySubCategory = (subCategory: string) => {
  return products.filter(product => product.subCategory === subCategory);
};

export const getProductsByAmbiance = (ambiance: 'Cocooning' | 'Romantique') => {
  return products.filter(product => product.ambiance === ambiance);
};

export const getProductBySlug = (slug: string) => {
  return products.find(product => product.slug === slug);
};
