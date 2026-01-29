import { useMemo } from 'react';
import { products, Product } from '@/data/products';
import { PRODUCT_DISPLAY_CONFIG, ProductDisplayRule, PageConfig } from '@/data/PRODUCT_DISPLAY_CONFIG';

export interface DisplayedProduct extends Product {
  discountPercentage?: number;
}

export const useProductDisplay = (pageKey: keyof typeof PRODUCT_DISPLAY_CONFIG['pages'], subKey?: string) => {
  return useMemo(() => {
    const config = subKey 
      ? PRODUCT_DISPLAY_CONFIG.pages.categories[subKey as keyof typeof PRODUCT_DISPLAY_CONFIG.pages.categories] ||
        PRODUCT_DISPLAY_CONFIG.pages.subcategories[subKey as keyof typeof PRODUCT_DISPLAY_CONFIG.pages.subcategories]
      : PRODUCT_DISPLAY_CONFIG.pages[pageKey as keyof typeof PRODUCT_DISPLAY_CONFIG.pages];

    if (!config) {
      console.warn(`Configuration not found for page: ${String(pageKey)}${subKey ? `/${subKey}` : ''}`);
      return { sections: [], allProducts: [] };
    }

    const processRule = (rule: ProductDisplayRule): DisplayedProduct[] => {
      let filteredProducts = [...products];

      // Filtrage par IDs spécifiques
      if (rule.productIds && rule.productIds.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
          rule.productIds!.includes(product.id)
        );
      }

      // Filtrage par catégorie
      if (rule.filterBy?.category) {
        filteredProducts = filteredProducts.filter(product =>
          rule.filterBy!.category!.includes(product.category)
        );
      }

      // Filtrage par sous-catégorie
      if (rule.filterBy?.subCategory) {
        filteredProducts = filteredProducts.filter(product =>
          rule.filterBy!.subCategory!.includes(product.subCategory)
        );
      }

      // Filtrage par tags
      if (rule.filterBy?.tags) {
        filteredProducts = filteredProducts.filter(product =>
          product.tags && rule.filterBy!.tags!.some(tag => product.tags!.includes(tag))
        );
      }

      // Filtrage par plage de prix
      if (rule.filterBy?.priceRange) {
        filteredProducts = filteredProducts.filter(product => {
          const price = product.oldPrice || product.price;
          return price >= rule.filterBy!.priceRange!.min && 
                 price <= rule.filterBy!.priceRange!.max;
        });
      }

      // Filtrage par stock
      if (rule.filterBy?.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(product =>
          rule.filterBy!.inStock ? product.stock > 0 : product.stock === 0
        );
      }

      // Filtrage par produits vedettes
      if (rule.filterBy?.featured !== undefined) {
        filteredProducts = filteredProducts.filter(product =>
          rule.filterBy!.featured === product.featured
        );
      }

      // Tri
      if (rule.sortBy) {
        filteredProducts.sort((a, b) => {
          let comparison = 0;
          
          switch (rule.sortBy) {
            case 'name':
              comparison = a.name.localeCompare(b.name);
              break;
            case 'price':
              const priceA = a.oldPrice || a.price;
              const priceB = b.oldPrice || b.price;
              comparison = priceA - priceB;
              break;
            case 'rating':
              comparison = a.rating - b.rating;
              break;
            case 'discount':
              const discountA = a.oldPrice ? ((a.oldPrice - a.price) / a.oldPrice) * 100 : 0;
              const discountB = b.oldPrice ? ((b.oldPrice - b.price) / b.oldPrice) * 100 : 0;
              comparison = discountA - discountB;
              break;
          }
          
          return rule.sortOrder === 'desc' ? -comparison : comparison;
        });
      }

      // Limiter le nombre de produits
      if (rule.maxProducts) {
        filteredProducts = filteredProducts.slice(0, rule.maxProducts);
      }

      // Ajouter le pourcentage de réduction
      return filteredProducts.map(product => ({
        ...product,
        discountPercentage: product.oldPrice 
          ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
          : undefined
      }));
    };

    const sections = (config as any).sections?.map((section: any) => ({
      ...section,
      products: processRule(section.rule)
    })) || [];

    const allProducts = sections.flatMap((section: any) => section.products);

    return { sections, allProducts };
  }, [pageKey, subKey]);
};

export const usePromotionProducts = () => {
  return useMemo(() => {
    const promotionProducts = products.filter(product => 
      product.oldPrice && product.oldPrice > product.price && product.stock > 0
    );

    return promotionProducts.map(product => ({
      ...product,
      discountPercentage: Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)
    }));
  }, []);
};

export const useFeaturedProducts = () => {
  return useMemo(() => {
    return products.filter(product => product.featured && product.stock > 0);
  }, []);
};

export const useProductsByCategory = (category: string) => {
  return useMemo(() => {
    return products.filter(product => product.category === category);
  }, [category]);
};

export const useProductsBySubCategory = (subCategory: string) => {
  return useMemo(() => {
    return products.filter(product => product.subCategory === subCategory);
  }, [subCategory]);
};

export const useSearchProducts = (query: string) => {
  return useMemo(() => {
    if (!query.trim()) return [];
    
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.subCategory.toLowerCase().includes(lowercaseQuery) ||
      product.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }, [query]);
};

export const useProductStats = () => {
  return useMemo(() => {
    const totalProducts = products.length;
    const inStock = products.filter(p => p.stock > 0).length;
    const outOfStock = totalProducts - inStock;
    const promotions = products.filter(p => p.oldPrice && p.oldPrice > p.price).length;
    const featured = products.filter(p => p.featured).length;
    
    const categoryStats = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalProducts,
      inStock,
      outOfStock,
      promotions,
      featured,
      categoryStats
    };
  }, []);
};
