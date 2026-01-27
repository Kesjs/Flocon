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

      {/* Moments Cadeaux Section */}
      <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* 3 Cadres Principaux */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 justify-center">
            {/* Cadre 1: Message Cadeau */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-rose from-rose-600 to-pink-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg"
              style={{ width: '388px', height: '505px' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
              <div className="relative z-10 text-left">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-black mb-6 drop-shadow-lg"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Parce que chaque moment mérite d'être célébré
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-lg font-light leading-relaxed drop-shadow-md mb-3"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  Un cadeau n'est jamais qu'un simple objet.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-base font-medium leading-relaxed drop-shadow-md"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  C'est un sourire, une émotion, un souvenir qui restera gravé dans les cœurs.
                </motion.p>
              </div>
            </motion.div>

            {/* Cadre 2: Personne avec cadeau */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ width: '388px', height: '505px' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop"
                alt="Personne offrant un cadeau"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h4 className="text-xl font-semibold mb-2">La joie de donner</h4>
                <p className="text-white/80 text-sm">Rendre quelqu'un heureux est le plus beau des cadeaux</p>
              </div>
            </motion.div>

            {/* Cadre 3: Personne recevant un cadeau */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ width: '388px', height: '505px' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop"
                alt="Personne recevant un cadeau"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h4 className="text-xl font-semibold mb-2">Le bonheur de recevoir</h4>
                <p className="text-white/80 text-sm">Chaque cadeau raconte une histoire unique</p>
              </div>
            </motion.div>
          </div>

          {/* Moments Spéciaux */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-textDark mb-4">
                Des moments qui appellent à être célébrés
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                La vie nous offre mille raisons de faire plaisir. Découvrez les occasions parfaites pour exprimer vos sentiments.
              </p>
            </motion.div>

            {/* Carousel des Moments */}
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" id="moments-carousel">
                {[
                  {
                    emoji: "💝",
                    title: "Saint-Valentin",
                    description: "L'amour mérite d'être célébré chaque jour",
                    color: "from-rose-100 to-pink-100"
                  },
                  {
                    emoji: "🎂",
                    title: "Anniversaire",
                    description: "Une année de plus, une occasion en or",
                    color: "from-purple-100 to-indigo-100"
                  },
                  {
                    emoji: "🎄",
                    title: "Noël",
                    description: "La magie de partager et d'offrir",
                    color: "from-red-100 to-green-100"
                  },
                  {
                    emoji: "💐",
                    title: "Fête des Mères",
                    description: "Celle qui nous a tout donné",
                    color: "from-pink-100 to-rose-100"
                  },
                  {
                    emoji: "🎓",
                    title: "Réussite",
                    description: "Célébrer chaque victoire, grande ou petite",
                    color: "from-yellow-100 to-orange-100"
                  },
                  {
                    emoji: "💍",
                    title: "Mariage",
                    description: "Deux cœurs, une seule promesse",
                    color: "from-rose-100 to-pink-100"
                  },
                  {
                    emoji: "🏠",
                    title: "Déménagement",
                    description: "Un nouveau chapitre à célébrer",
                    color: "from-blue-100 to-cyan-100"
                  },
                  {
                    emoji: "🌟",
                    title: "Juste comme ça",
                    description: "Parce que la vie est faite de petits bonheurs",
                    color: "from-purple-100 to-pink-100"
                  }
                ].map((moment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex-shrink-0 w-64 p-6 rounded-2xl bg-gradient-to-br ${moment.color} hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                  >
                    <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform">
                      {moment.emoji}
                    </div>
                    <h3 className="font-semibold text-textDark mb-2 text-center">
                      {moment.title}
                    </h3>
                    <p className="text-gray-600 text-sm text-center leading-relaxed">
                      {moment.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Navigation et Bouton */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => {
                    const carousel = document.getElementById('moments-carousel');
                    if (carousel) carousel.scrollBy({ left: -280, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Découvrir nos suggestions
                </motion.button>

                <button
                  onClick={() => {
                    const carousel = document.getElementById('moments-carousel');
                    if (carousel) carousel.scrollBy({ left: 280, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
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
