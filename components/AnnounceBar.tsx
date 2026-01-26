"use client";

import { motion } from "framer-motion";
import { Truck, Gift } from "lucide-react";

export default function AnnounceBar() {
  const messages = [
    { icon: Truck, text: "Livraison offerte dès 50€ d'achat" },
    { icon: Gift, text: "Emballage cadeau Saint-Valentin offert !" },
  ];

  const fullMessage = messages
    .map((msg) => {
      const Icon = msg.icon;
      return `${msg.text}`;
    })
    .join(" | ");

  return (
    <div className="bg-textDark text-white py-2 overflow-hidden relative">
      <div className="flex items-center gap-2 whitespace-nowrap">
        <motion.div
          className="flex items-center gap-8"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              {messages.map((msg, idx) => {
                const Icon = msg.icon;
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{msg.text}</span>
                    {idx < messages.length - 1 && (
                      <span className="mx-2">|</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
