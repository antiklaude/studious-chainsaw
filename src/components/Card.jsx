import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ suit, value, isFaceUp = true, className = "", style = {} }) => {
  const isRed = suit === '♥' || suit === '♦';
  const suitColor = isRed ? 'text-red-600' : 'text-black';

  return (
    <motion.div
      layout
      initial={{ rotateY: 180, scale: 0.8, opacity: 0 }}
      animate={{
        rotateY: isFaceUp ? 0 : 180,
        scale: 1,
        opacity: 1
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative w-24 h-36 rounded-lg shadow-2xl preserve-3d ${className}`}
      style={{ ...style, transformStyle: 'preserve-3d' }}
    >
      {/* Front Face */}
      <div
        className="absolute inset-0 w-full h-full backface-hidden card-paper rounded-lg border-2 border-slate-200 flex flex-col items-start p-2.5 overflow-hidden"
        style={{ backfaceVisibility: 'hidden' }}
      >
        {/* Subtle Paper Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>

        {/* Top-Left Index (Ultra-Minimalist) */}
        <div className={`flex flex-col items-center leading-none mb-1 ${suitColor}`}>
          <span className="text-xl font-bold tracking-tighter">{value}</span>
          <span className="text-sm mt-1">{suit}</span>
        </div>

        {/* Prominent Center Suit */}
        <div className="flex-1 w-full flex items-center justify-center">
          <div className={`text-4xl md:text-6xl ${suitColor} opacity-90 drop-shadow-sm transition-all`}>
            {suit}
          </div>
        </div>

        {/* Bottom Corner Removed for Ultra-Minimalist Aesthetic */}
      </div>

      {/* Back Face */}
      <div
        className="absolute inset-0 w-full h-full backface-hidden card-back-pattern rounded-lg border-[6px] border-white card-border-classic flex items-center justify-center overflow-hidden"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
        {/* Centered Circular Motif */}
        <div className="w-14 h-14 rounded-full border-4 border-indigo-900/20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-indigo-900/30 animate-spin-slow"></div>
        </div>
      </div>
    </motion.div>
  );
};


export default Card;
