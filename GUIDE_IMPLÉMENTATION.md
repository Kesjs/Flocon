# 🚀 Guide d'Implémentation des Améliorations

Ce guide vous aidera à implémenter les améliorations suggérées dans l'ordre de priorité.

## ✅ Déjà Implémenté

1. **Persistance du panier** - Le panier est maintenant sauvegardé dans localStorage
2. **ErrorBoundary** - Composant de gestion d'erreurs ajouté

## 📋 Prochaines Étapes

### 1. Validation des Formulaires (react-hook-form + zod)

```bash
npm install react-hook-form zod @hookform/resolvers
```

Exemple d'implémentation pour le formulaire de checkout :

```typescript
// app/checkout/page.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  address: z.string().min(5, "L'adresse est requise"),
  postalCode: z.string().regex(/^\d{5}$/, "Code postal invalide"),
  city: z.string().min(2, "La ville est requise"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

// Dans le composant
const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
  resolver: zodResolver(checkoutSchema),
});
```

### 2. Authentification Sécurisée (NextAuth.js)

```bash
npm install next-auth
```

Créer `app/api/auth/[...nextauth]/route.ts` :

```typescript
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Votre logique d'authentification
        if (credentials?.email && credentials?.password) {
          return { id: "1", email: credentials.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
```

### 3. Tests Unitaires

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

Créer `jest.config.js` :

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

### 4. ESLint + Prettier

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier prettier
```

Créer `.prettierrc` :

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2
}
```

### 5. Accessibilité

Installer les outils d'accessibilité :

```bash
npm install --save-dev @axe-core/react
```

Ajouter dans `jest.setup.js` :

```javascript
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);
```

### 6. SEO - Métadonnées Dynamiques

Exemple pour une page produit :

```typescript
// app/products/[id]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.id);
  
  return {
    title: `${product.name} - Flocon`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}
```

### 7. Performance - Lazy Loading

```typescript
// Lazy load des composants lourds
import dynamic from 'next/dynamic';

const CartDrawer = dynamic(() => import('@/components/CartDrawer'), {
  ssr: false,
  loading: () => <div>Chargement...</div>,
});
```

### 8. Toast Notifications

```bash
npm install react-hot-toast
```

Utilisation :

```typescript
import toast from 'react-hot-toast';

const handleAddToCart = () => {
  addToCart(product);
  toast.success('Produit ajouté au panier !');
};
```

---

## 📊 Checklist d'Implémentation

- [x] Persistance du panier (localStorage)
- [x] ErrorBoundary
- [ ] Validation formulaires (react-hook-form + zod)
- [ ] Authentification sécurisée (NextAuth.js)
- [ ] Tests unitaires
- [ ] ESLint + Prettier
- [ ] Accessibilité (ARIA, tests)
- [ ] SEO (métadonnées dynamiques)
- [ ] Performance (lazy loading, memoization)
- [ ] Toast notifications
- [ ] Analytics
- [ ] Monitoring d'erreurs (Sentry)

---

## 🎯 Objectifs

- **Sécurité** : Authentification robuste, validation côté serveur
- **Performance** : Temps de chargement < 2s, Core Web Vitals optimaux
- **Accessibilité** : Score WCAG AA minimum
- **SEO** : Score Lighthouse > 90
- **Qualité** : Couverture de tests > 80%
