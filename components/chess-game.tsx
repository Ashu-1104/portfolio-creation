'use client';

// Easter egg: type `chess` in the terminal to play a quick game against the
// Stockfish engine (the same engine my CheckMate Arena project uses). The engine
// is a web worker that only loads when the board opens.
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Chess, type Square } from 'chess.js';
import { RotateCcw, X } from 'lucide-react';
import { play } from '@/lib/sound';
import { useOverlay } from '@/lib/overlay';

const GLYPH: Record<string, string> = { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚' };
const FILES = 'abcdefgh';

export function ChessGame() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener('open-chess', show);
    return () => window.removeEventListener('open-chess', show);
  }, []);
  return <AnimatePresence>{open && <Board onClose={() => setOpen(false)} />}</AnimatePresence>;
}

function Board({ onClose }: { onClose: () => void }) {
  const game = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(game.fen());
  const [selected, setSelected] = useState<Square | null>(null);
  const [last, setLast] = useState<[string, string] | null>(null);
  const [thinking, setThinking] = useState(false);
  const engine = useRef<Worker | null>(null);
  // bumps on every new game, so a late engine reply from the old game is ignored
  const generation = useRef(0);
  const asked = useRef(0);
  useOverlay('chess', true, onClose);

  useEffect(() => {
    const w = new Worker('/stockfish/stockfish.wasm.js');
    w.postMessage('uci');
    w.postMessage('setoption name Skill Level value 4');
    w.postMessage('isready');
    w.onmessage = (e: MessageEvent<string>) => {
      const m = /^bestmove (\w{4,5})/.exec(e.data);
      if (!m || asked.current !== generation.current) return;
      const mv = m[1];
      try {
        game.move({ from: mv.slice(0, 2), to: mv.slice(2, 4), promotion: mv[4] || 'q' });
        setLast([mv.slice(0, 2), mv.slice(2, 4)]);
        setFen(game.fen());
        play('key');
      } catch {}
      setThinking(false);
    };
    engine.current = w;
    return () => { w.terminate(); };
  }, [game]);

  const targets = useMemo(
    () => new Set(selected ? game.moves({ square: selected, verbose: true }).map((m) => m.to) : []),
    [selected, fen, game], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const click = (sq: Square) => {
    if (thinking || game.isGameOver() || game.turn() !== 'w') return;
    const piece = game.get(sq);
    if (selected && targets.has(sq)) {
      game.move({ from: selected, to: sq, promotion: 'q' });
      setLast([selected, sq]);
      setSelected(null);
      setFen(game.fen());
      play('key');
      if (!game.isGameOver()) {
        setThinking(true);
        asked.current = generation.current;
        engine.current?.postMessage(`position fen ${game.fen()}`);
        engine.current?.postMessage('go movetime 700');
      }
      return;
    }
    setSelected(piece && piece.color === 'w' ? sq : null);
  };

  const reset = () => {
    generation.current += 1;
    engine.current?.postMessage('stop');
    engine.current?.postMessage('ucinewgame');
    game.reset(); setFen(game.fen()); setLast(null); setSelected(null); setThinking(false);
  };

  const status = game.isCheckmate()
    ? game.turn() === 'w' ? 'Checkmate. Stockfish wins this time.' : 'Checkmate! You beat Stockfish 🎉'
    : game.isDraw() ? 'Draw.'
    : thinking ? 'Stockfish is thinking…'
    : game.inCheck() ? 'Check! Your move.' : 'Your move (white).';

  const board = game.board(); // rows from rank 8 to 1
  return (
    <motion.div
      className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-[460px] rounded-2xl border border-zinc-800 bg-[var(--panel)] p-5 shadow-2xl"
        initial={{ rotateX: 35, y: 40, scale: 0.9 }} animate={{ rotateX: 0, y: 0, scale: 1 }} exit={{ rotateX: -20, y: 30, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }} style={{ transformPerspective: 1000 }}
        onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Chess against Stockfish"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest">easter egg unlocked</p>
            <h4 className="text-lg font-bold text-zinc-100">You vs Stockfish</h4>
          </div>
          <div className="flex gap-2">
            <button onClick={reset} aria-label="New game" className="w-8 h-8 rounded-md border border-zinc-800 text-zinc-400 hover:text-emerald-500 flex items-center justify-center"><RotateCcw size={15} /></button>
            <button onClick={onClose} aria-label="Close" className="w-8 h-8 rounded-md border border-zinc-800 text-zinc-400 hover:text-emerald-500 flex items-center justify-center"><X size={15} /></button>
          </div>
        </div>
        <div className="grid grid-cols-8 rounded-lg overflow-hidden border border-zinc-800 select-none aspect-square">
          {board.map((row, r) =>
            row.map((cell, f) => {
              const sq = `${FILES[f]}${8 - r}` as Square;
              const dark = (r + f) % 2 === 1;
              const isLast = last && (last[0] === sq || last[1] === sq);
              return (
                <button
                  key={sq}
                  onClick={() => click(sq)}
                  aria-label={sq}
                  className={`relative flex items-center justify-center text-[min(9vw,40px)] leading-none ${dark ? 'bg-emerald-900/70' : 'bg-emerald-100/90'} ${selected === sq ? 'ring-2 ring-inset ring-yellow-400' : ''} ${isLast ? 'after:absolute after:inset-0 after:bg-yellow-300/30' : ''}`}
                >
                  {cell && <span className={cell.color === 'w' ? 'text-white [text-shadow:0_0_2px_#000,0_1px_2px_#000]' : 'text-[#09090b]'}>{GLYPH[cell.type]}</span>}
                  {targets.has(sq) && <span className="absolute w-3 h-3 rounded-full bg-emerald-500/80" />}
                </button>
              );
            }),
          )}
        </div>
        <p className="mt-3 text-sm text-zinc-300 font-mono" aria-live="polite">{status}</p>
      </motion.div>
    </motion.div>
  );
}
