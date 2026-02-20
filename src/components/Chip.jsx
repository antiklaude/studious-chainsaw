import React from 'react';
import { motion } from 'framer-motion';

const Chip = ({ value, color, onClick, isSelected, scale = 1 }) => {
    return (
        <motion.div
            whileHover={{ y: -10, scale: scale * 1.1 }}
            whileTap={{ scale: scale * 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: scale }}
            onClick={onClick}
            className={`relative w-16 h-16 rounded-full cursor-pointer flex items-center justify-center border-4 border-dashed border-white/20 shadow-2xl transition-shadow ${isSelected ? 'shadow-[0_0_20px_rgba(255,255,255,0.4)] ring-4 ring-white/30' : ''}`}
            style={{
                backgroundColor: color,
                background: `radial-gradient(circle at center, ${color} 0%, rgba(0,0,0,0.3) 100%)`
            }}
        >
            <div className="absolute inset-2 border-2 border-white/10 rounded-full flex items-center justify-center">
                <span className="text-white font-black text-sm font-mono">${value}</span>
            </div>

            {/* Decorative Ridges */}
            {[0, 60, 120, 180, 240, 300].map(deg => (
                <div
                    key={deg}
                    className="absolute w-2 h-1 bg-white/40"
                    style={{ transform: `rotate(${deg}deg) translateY(-26px)` }}
                />
            ))}
        </motion.div>
    );
};

export default Chip;
