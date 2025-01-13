'use client'

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);

  const gridSize = {
    columns: 40,
    rows: 24,
  };
  
  const tiles = Array.from({ length: gridSize.rows * gridSize.columns });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // アニメーション時間は2秒のまま

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed inset-0 z-50 bg-white" // 背景を白に変更
    >
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize.columns}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}>
        {tiles.map((_, index) => {
          const column = index % gridSize.columns;
          const row = Math.floor(index / gridSize.columns);
          
          // 波のような遅延を作成
          const waveDelay = column * 0.02 + Math.sin(row * 0.5) * 0.2;
          
          return (
            <motion.div
              key={index}
              initial={{ backgroundColor: '#ffffff', scale: 0.5 }} // 初期色を白に
              animate={{ backgroundColor: '#000000', scale: 1 }} // アニメーション後の色を黒に
              transition={{
                duration: 0.6,
                delay: waveDelay,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;

