import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Card from './components/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Play, RotateCcw, Award, AlertCircle, PlusCircle, MinusCircle } from 'lucide-react';
import { useMangatha } from './hooks/useMangatha';
import Chip from './components/Chip';
import confetti from 'canvas-confetti';
import { playChipClick, playWinJingle } from './utils/sounds';



function App() {
  const {
    joker, andarCards, baharCards, winner,
    phase, isDealing, pickJoker, startDealing, resetGame
  } = useMangatha();

  const [wallet, setWallet] = useState(() => {
    const saved = localStorage.getItem('casino_wallet');
    return saved !== null ? parseInt(saved) : 1000;
  });

  useEffect(() => {
    localStorage.setItem('casino_wallet', wallet.toString());
  }, [wallet]);

  const [bet, setBet] = useState(100);
  const [side, setSide] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (phase === 'joker') {
      const timer = setTimeout(() => {
        startDealing();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, startDealing]);

  // Effect to handle result overlay visibility
  useEffect(() => {
    console.log("Game Phase Change:", phase);
    if (phase === 'result') {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [phase]);

  // Effect to handle win/loss logic (wallet, sounds, confetti)
  useEffect(() => {
    if (winner && phase === 'result') {
      console.log("Game Ended. Winner:", winner, "Side:", side);
      if (winner === side) {
        setWallet(prev => {
          const newBalance = prev + bet * 2;
          console.log("User WON! New balance:", newBalance);
          return newBalance;
        });
        playWinJingle();
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#ffffff']
        });
      } else {
        console.log("User LOST. Bet was:", bet);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    }
  }, [winner, phase, side, bet]);

  const handleStart = () => {
    if (wallet < bet || !side) {
      console.warn("Cannot start game: check wallet and side selection", { wallet, bet, side });
      return;
    }
    console.log("Starting game with bet:", bet, "on side:", side);
    setWallet(prev => prev - bet);
    setShowResult(false);
    pickJoker();
  };

  const resetBettingState = () => {
    console.log("Resetting game to betting phase");
    setShowResult(false);
    resetGame();
    setSide(null);
  };

  return (
    <div className={isShaking ? 'shake-effect' : ''}>
      <Table>
        <header className="w-full flex flex-col md:flex-row justify-between items-center md:items-start mb-2 px-4 md:px-8 py-2 md:py-4 gap-4">
          <div className="glass-panel px-6 py-2 flex items-center gap-3">
            <Coins className="text-amber-500" />
            <span className="text-2xl font-bold font-mono text-white">${wallet}</span>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl gold-text uppercase tracking-[0.2em] md:tracking-[0.4em] mb-1 font-black text-center">Mangatha Royale</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>
          <div className="hidden md:block w-32"></div>
        </header>

        <main className="flex-1 w-full max-w-7xl flex flex-col items-center justify-center relative px-4">

          {/* Game Arena - Responsive Layout */}
          {/* Game Arena - Responsive Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-none md:flex md:flex-row gap-4 md:gap-12 w-full justify-between items-center relative py-2 md:py-12">

            {/* Andar Section (Top Left on Mobile) */}
            <div className="col-span-1 md:w-auto md:flex-1 flex flex-col items-center gap-12 order-1 md:order-none">
              <motion.div
                whileHover={phase === 'betting' ? { scale: 1.05 } : {}}
                onClick={() => phase === 'betting' && setSide('andar')}
                className={`relative w-full max-w-[220px] glass-panel p-4 md:p-8 flex flex-col items-center gap-2 md:gap-4 cursor-pointer transition-all border-2 ${side === 'andar' ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)] bg-amber-500/10' : 'border-white/10 hover:border-white/30'} ${phase !== 'betting' && side !== 'andar' ? 'opacity-40 grayscale pointer-events-none' : ''}`}
              >
                <span className={`text-xs uppercase tracking-[0.3em] font-bold ${side === 'andar' ? 'text-amber-400' : 'text-slate-400'}`}>Ullae (Inside)</span>
                <div className="text-4xl font-black text-white">2x</div>

                {/* Chip Visuals on Bet */}
                {side === 'andar' && (
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2"
                  >
                    <Chip value={bet} color="#f59e0b" scale={0.8} />
                  </motion.div>
                )}
              </motion.div>

              <div className="relative w-full h-80 flex justify-center items-center perspective-1000">
                <AnimatePresence>
                  {andarCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ x: 200, y: -200, rotate: 180, opacity: 0, scale: 0.5 }}
                      animate={{
                        x: (index % 5) * 15 - 30,
                        y: Math.floor(index / 5) * 12,
                        rotate: (index % 3) * 4 - 2,
                        opacity: 1,
                        scale: 1
                      }}
                      className="absolute"
                      style={{ zIndex: index }}
                    >
                      <Card suit={card.suit} value={card.value} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Dealer Central Deck Area (Bottom on Mobile) */}
            <div className="col-span-2 md:w-auto flex flex-col items-center gap-4 md:gap-12 px-4 md:px-12 z-10 order-3 md:order-none">
              {/* Joker Container */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.5em]">The Joker</span>
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {joker ? (
                      <motion.div
                        key="joker-card"
                        initial={{ rotateY: 180, scale: 0.8, opacity: 0 }}
                        animate={{ rotateY: 0, scale: 1.1, opacity: 1 }}
                        className="shadow-[0_0_50px_rgba(245,158,11,0.3)] rounded-xl"
                      >
                        <Card suit={joker.suit} value={joker.value} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        className="w-24 h-36 border-2 border-dashed border-amber-500/20 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-md"
                      >
                        <div className="w-12 h-12 rounded-full border border-amber-500/10 flex items-center justify-center">
                          <span className="text-amber-500/20 text-[10px] font-black">?</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {joker && <div className="absolute -inset-6 border-2 border-amber-500/30 rounded-2xl animate-pulse pointer-events-none"></div>}
                </div>
              </div>

              {/* Visual Deck */}
              <div className="w-24 h-36 bg-slate-900 rounded-xl border-2 border-slate-700 shadow-2xl gold-foil card-back-pattern flex items-center justify-center relative">
                <div className="w-12 h-12 rounded-full border-2 border-amber-500/10 flex items-center justify-center opacity-30">
                  <div className="w-8 h-8 rounded-full bg-amber-500/5 animate-ping"></div>
                </div>

                {/* Circular Play Button Over Deck */}
                {phase === 'betting' && side && (
                  <motion.button
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleStart}
                    className="absolute inset-0 m-auto w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.6)] border-4 border-amber-400 z-50 text-white"
                  >
                    <Play fill="currentColor" size={32} className="ml-1" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Bahar Section (Top Right on Mobile) */}
            <div className="col-span-1 md:w-auto md:flex-1 flex flex-col items-center gap-12 order-2 md:order-none">
              <motion.div
                whileHover={phase === 'betting' ? { scale: 1.05 } : {}}
                onClick={() => phase === 'betting' && setSide('bahar')}
                className={`relative w-full max-w-[220px] glass-panel p-4 md:p-8 flex flex-col items-center gap-2 md:gap-4 cursor-pointer transition-all border-2 ${side === 'bahar' ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)] bg-amber-500/10' : 'border-white/10 hover:border-white/30'} ${phase !== 'betting' && side !== 'bahar' ? 'opacity-40 grayscale pointer-events-none' : ''}`}
              >
                <span className={`text-xs uppercase tracking-[0.3em] font-bold ${side === 'bahar' ? 'text-amber-400' : 'text-slate-400'}`}>Veliyae (Outside)</span>
                <div className="text-4xl font-black text-white">2x</div>

                {/* Chip Visuals on Bet */}
                {side === 'bahar' && (
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2"
                  >
                    <Chip value={bet} color="#f59e0b" scale={0.8} />
                  </motion.div>
                )}
              </motion.div>

              <div className="relative w-full h-80 flex justify-center items-center perspective-1000">
                <AnimatePresence>
                  {baharCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ x: -200, y: -200, rotate: -180, opacity: 0, scale: 0.5 }}
                      animate={{
                        x: (index % 5) * 15 - 30,
                        y: Math.floor(index / 5) * 12,
                        rotate: (index % 3) * 4 - 2,
                        opacity: 1,
                        scale: 1
                      }}
                      className="absolute"
                      style={{ zIndex: index }}
                    >
                      <Card suit={card.suit} value={card.value} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Action / Betting Bar */}
          <div className="mt-4 md:mt-8 flex flex-col items-center gap-4 md:gap-8 w-full">
            {phase === 'betting' ? (
              <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 p-4 md:p-6 glass-panel rounded-2xl md:rounded-full bg-black/20 border-white/5 shadow-2xl">
                  {[50, 100, 500, 1000].map(val => (
                    <Chip
                      key={val}
                      value={val}
                      color={val === 50 ? '#ef4444' : val === 100 ? '#3b82f6' : val === 500 ? '#10b981' : '#6366f1'}
                      isSelected={bet === val}
                      onClick={() => {
                        playChipClick();
                        setBet(val);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : phase === 'dealing' ? (
              <div className="text-amber-500 font-black text-2xl uppercase tracking-[1em] animate-pulse">
                Dealing...
              </div>
            ) : null}
          </div>

        </main>
      </Table>

      {/* Result Overlay with direct inline styles for absolute reliability */}
      {showResult && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            pointerEvents: 'auto'
          }}
        >
          <div
            className="glass-panel"
            style={{
              position: 'relative',
              padding: 'clamp(1rem, 5vw, 3.5rem) clamp(1rem, 8vw, 5rem)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              backgroundColor: '#0f172a',
              border: '2px solid #f59e0b',
              boxShadow: '0 0 150px rgba(245, 158, 11, 0.5)',
              maxWidth: '90vw',
              width: '100%',
              borderRadius: '1.5rem',
              textAlign: 'center'
            }}
          >
            <div className="absolute inset-0 opacity-10 card-back-pattern -z-10"></div>
            {winner === side ? (
              <>
                <Award className="w-24 h-24 text-amber-500" />
                <h2 className="text-6xl gold-text tracking-tighter uppercase font-black">Royale Win</h2>
                <p className="text-amber-500 font-black text-4xl font-mono tracking-widest">+${bet * 2}</p>
              </>
            ) : (
              <>
                <AlertCircle className="w-24 h-24 text-red-600" />
                <h2 className="text-6xl text-red-600 font-black uppercase tracking-tighter">House Wins</h2>
                <p className="text-slate-400 text-xl uppercase tracking-[0.3em] font-bold">Lose: ${bet}</p>
              </>
            )}
            <button
              id="continue-button"
              onClick={() => {
                console.log("CONTINUE button clicked");
                resetBettingState();
              }}
              style={{
                marginTop: '2rem',
                padding: '1rem 4rem',
                backgroundColor: '#d97706',
                borderRadius: '9999px',
                fontSize: '1.25rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: 'white',
                cursor: 'pointer',
                border: 'none',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                zIndex: 10000,
                pointerEvents: 'auto'
              }}
              className="hover:bg-amber-500 hover:scale-105 active:scale-95 transition-all"
            >
              CONTINUE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
