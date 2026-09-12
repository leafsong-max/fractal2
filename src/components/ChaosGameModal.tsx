import React, { useState, useEffect, useRef } from 'react';
import { Point, EducationLevel } from '../types';
import { Play, Pause, RotateCcw, X, Dices, Sparkles, FastForward } from 'lucide-react';

interface ChaosGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: EducationLevel;
}

export const ChaosGameModal: React.FC<ChaosGameModalProps> = ({
  isOpen,
  onClose,
  level,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [dotCount, setDotCount] = useState(0);
  const [lastDice, setLastDice] = useState<number | null>(null);

  const stateRef = useRef<{
    currentPoint: Point;
    vertices: Point[];
    count: number;
    animFrameId: number | null;
  }>({
    currentPoint: { x: 200, y: 180 },
    vertices: [
      { x: 200, y: 30 },   // Vertex 1: Top
      { x: 30, y: 320 },   // Vertex 2: Bottom-Left
      { x: 370, y: 320 },  // Vertex 3: Bottom-Right
    ],
    count: 0,
    animFrameId: null,
  });

  // Initialize canvas
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0f172a'; // dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw 3 main vertices
    const colors = ['#ef4444', '#10b981', '#3b82f6'];
    const labels = ['A (위)', 'B (왼쪽)', 'C (오른쪽)'];

    stateRef.current.vertices.forEach((v, i) => {
      ctx.beginPath();
      ctx.arc(v.x, v.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = colors[i];
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label text
      ctx.fillStyle = '#f8fafc';
      ctx.font = '11px sans-serif';
      ctx.fillText(labels[i], v.x - 18, v.y + (i === 0 ? -12 : 20));
    });

    stateRef.current.currentPoint = {
      x: 200,
      y: 180,
    };
    stateRef.current.count = 0;
    setDotCount(0);
    setLastDice(null);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(initCanvas, 50);
    }
  }, [isOpen]);

  // Step function (batch step for smooth rendering)
  const step = (batchSize = 20) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let { currentPoint, vertices } = stateRef.current;

    for (let i = 0; i < batchSize; i++) {
      // Pick random vertex (0, 1, or 2)
      const r = Math.floor(Math.random() * 3);
      const target = vertices[r];

      // Halfway move
      currentPoint = {
        x: (currentPoint.x + target.x) / 2,
        y: (currentPoint.y + target.y) / 2,
      };

      // Draw dot
      ctx.fillStyle = r === 0 ? '#818cf8' : r === 1 ? '#34d399' : '#f472b6';
      ctx.fillRect(currentPoint.x, currentPoint.y, 1.4, 1.4);

      stateRef.current.count += 1;
      if (i === batchSize - 1) {
        setLastDice(r + 1);
      }
    }

    stateRef.current.currentPoint = currentPoint;
    setDotCount(stateRef.current.count);
  };

  // Animation Loop
  useEffect(() => {
    let animId: number;

    const loop = () => {
      if (isRunning) {
        step(25); // 25 dots per animation frame
        animId = requestAnimationFrame(loop);
      }
    };

    if (isRunning) {
      animId = requestAnimationFrame(loop);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isRunning]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50 via-white to-indigo-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center">
              <Dices className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>신기한 카오스 게임 (Chaos Game)</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">
                  확률의 기적
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                {level === 'elementary'
                  ? '주사위를 아무렇게나 굴려 점을 찍었는데 시어핀스키 삼각형이 나타나요!'
                  : '무작위성(Randomness)과 반복적 축소 사상(IFS)이 만들어내는 자기닮음의 극한'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsRunning(false);
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="flex flex-col items-center">
            {/* Canvas */}
            <div className="relative rounded-xl overflow-hidden border-2 border-slate-800 shadow-lg bg-slate-900">
              <canvas
                ref={canvasRef}
                width={400}
                height={350}
                className="w-full max-w-[400px] h-auto block"
              />

              {/* Live Dot Counter Overlay */}
              <div className="absolute top-3 left-3 bg-slate-800/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-xs font-mono text-white flex items-center gap-1.5">
                <span className="text-slate-400">찍은 점:</span>
                <span className="font-bold text-amber-400">{dotCount.toLocaleString()}개</span>
              </div>

              {lastDice && (
                <div className="absolute top-3 right-3 bg-purple-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-purple-600 text-xs font-bold text-purple-200 flex items-center gap-1">
                  <span>선택된 꼭짓점: {lastDice === 1 ? 'A (위)' : lastDice === 2 ? 'B (왼쪽)' : 'C (오른쪽)'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => step(1)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Dices className="w-4 h-4 text-purple-600" />
              <span>주사위 1번 굴리기</span>
            </button>

            <button
              type="button"
              onClick={() => step(100)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <FastForward className="w-4 h-4 text-indigo-600" />
              <span>100개 점 찍기</span>
            </button>

            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>일시정지</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>연속 자동 생성</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                initCanvas();
              }}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>다시하기</span>
            </button>
          </div>

          {/* Explanation Box */}
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 text-xs sm:text-sm text-purple-950 leading-relaxed">
            <h4 className="font-bold flex items-center gap-1.5 text-purple-900 mb-1">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>규칙은 오직 2가지!</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-700">
              <li>1. 세 꼭짓점 A, B, C 중 하나를 무작위(랜덤)로 고릅니다.</li>
              <li>2. 현재 위치에서 방금 고른 꼭짓점까지의 <strong>정가운데(1/2 지점)</strong>에 점을 찍습니다.</li>
            </ol>
            <p className="mt-2 text-slate-600">
              놀랍게도 주사위를 완전히 무작위로 굴렸는데도, 점들이 스스로 질서를 찾아 <strong>시어핀스키 삼각형 구멍</strong> 안에는 단 하나의 점도 찍히지 않아요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
