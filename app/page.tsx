"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products, getProductsByCategory } from "../data/products";
import ProductCard from "@/components/ProductCard";

// Filtrer les produits par catégorie
const hiverProducts = getProductsByCategory('Hiver');
const valentinProducts = getProductsByCategory('Saint-Valentin');

export default function HomePage() {
  const hiverProducts = getProductsByCategory('Hiver');
  const valentinProducts = getProductsByCategory('Saint-Valentin');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/white-rose-flower-red-tablecloth-blue.jpg"
            alt="Hero background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Flocon
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            L'eleganza incontra la dolcezza per creare momenti indimenticabili
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#collection-hiver"
              className="bg-textDark text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors uppercase tracking-wide"
            >
              Esplora l'inverno
            </a>
            <a
              href="#collection-valentin"
              className="bg-rose text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors uppercase tracking-wide"
            >
              San Valentino
            </a>
          </motion.div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4">
          {/* Collection Hiver */}
          <div id="collection-hiver" className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-display font-bold text-textDark mb-4 relative pb-3 inline-block">
                L'Arte del Cocooning
                <motion.div 
                  className="absolute bottom-0 left-20 w-1/2 h-1 bg-rose"
                  initial={{ width: 0 }}
                  whileInView={{ width: "50%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Texture che ti avvolgono quando arriva il freddo. Scopri la nostra selezione di plaid e candele per un inverno accogliente.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hiverProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Collection Saint-Valentin */}
          <div id="collection-valentin">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-display font-bold text-textDark mb-4 relative pb-3 inline-block">
                Fiocchi di Tenerezza
                <motion.div 
                  className="absolute bottom-0 left-20 w-1/2 h-1 bg-rose"
                  initial={{ width: 0 }}
                  whileInView={{ width: "50%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Dichiara la tua fiamma con i nostri tesori di San Valentino. Gioielli eccezionali ed esperienze romantiche per celebrare il tuo amore.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valentinProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-textDark mt-2 mb-4">
              Cosa dicono i nostri clienti
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Scopri le recensioni dei nostri clienti soddisfatti
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie Martin",
                location: "Paris",
                rating: 5,
                text: "Il plaid 'Nuage' è incredibilmente morbido! Mi avvolgo dentro ogni sera. La qualità è eccezionale e il design è magnifico. Un vero nido di dolcezza!",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
              },
              {
                name: "Thomas Dubois",
                location: "Lyon",
                rating: 5,
                text: "Ho regalato il gioiello 'Fiocco' alla mia compagna per San Valentino. Le è piaciuto moltissimo! L'imballaggio era magnifico e il gioiello è di una bellezza rara. Servizio impeccabile!",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
              },
              {
                name: "Marie Leclerc",
                location: "Marseille",
                rating: 5,
                text: "La candela 'Crepitio' crea un'atmosfera magica! Il profumo di legno di cedro è sottile e rilassante. Perfetto per le nostre serate cocooning. Consiglio vivamente!",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-textDark">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
