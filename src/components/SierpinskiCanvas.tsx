import React, { useState, useEffect, useMemo, useRef } from 'react';
import { EducationLevel, Point } from '../types';
import { STEP_EXPLANATIONS } from '../data/fractalData';
import { MathView } from './MathView';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Info,
  Layers,
  Palette,
  Hash,
  Maximize2,
  TrendingUp,
  Ruler,
  Square
} from 'lucide-react';

interface SierpinskiCanvasProps {
  level: EducationLevel;
  depth: number;
  setDepth: (d: number) => void;
}

type ColorTheme = 'indigo' | 'emerald' | 'sunset' | 'violet';

interface TriangleNode {
  id: string;
  p1: Point;
  p2: Point;
  p3: Point;
  depth: number;
}

export const SierpinskiCanvas: React.FC<SierpinskiCanvasProps> = ({
  level,
  depth,
  setDepth,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [colorTheme, setColorTheme] = useState<ColorTheme>('indigo');
  const [viewMode, setViewMode] = useState<'solid' | 'holes' | 'outline'>('solid');
  const [zoom, setZoom] = useState(1);
  const [showNumbers, setShowNumbers] = useState(true); // Elementary triangle numbering toggle
  const [hoveredTriangle, setHoveredTriangle] = useState<TriangleNode | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const playTimerRef = useRef<number | null>(null);

  // Dimension setup for SVG coordinate system (Large Studio view)
  const width = 720;
  const height = 580;
  const padding = 24;

  // Root triangle vertices (Equilateral Triangle)
  const rootP1: Point = { x: width / 2, y: padding };
  const rootP2: Point = { x: padding, y: height - padding };
  const rootP3: Point = { x: width - padding, y: height - padding };

  // Midpoint helper
  const getMid = (a: Point, b: Point): Point => ({
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  });

  // Calculate remaining triangles and removed hole triangles recursively up to depth 6
  const { triangles, holes } = useMemo(() => {
    const triList: TriangleNode[] = [];
    const holeList: { id: string; p1: Point; p2: Point; p3: Point; depth: number }[] = [];

    const recurse = (
      p1: Point,
      p2: Point,
      p3: Point,
      currentDepth: number,
      maxDepth: number,
      path: string
    ) => {
      if (currentDepth === maxDepth) {
        triList.push({ id: path, p1, p2, p3, depth: currentDepth });
        return;
      }

      const m12 = getMid(p1, p2);
      const m23 = getMid(p2, p3);
      const m31 = getMid(p3, p1);

      // Center inverted hole
      holeList.push({
        id: `hole-${path}-${currentDepth}`,
        p1: m12,
        p2: m23,
        p3: m31,
        depth: currentDepth + 1,
      });

      // 3 corner triangles
      recurse(p1, m12, m31, currentDepth + 1, maxDepth, `${path}-0`);
      recurse(m12, p2, m23, currentDepth + 1, maxDepth, `${path}-1`);
      recurse(m31, m23, p3, currentDepth + 1, maxDepth, `${path}-2`);
    };

    recurse(rootP1, rootP2, rootP3, 0, depth, 'root');
    return { triangles: triList, holes: holeList };
  }, [depth]);

  // Handle auto-play stepping
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = window.setInterval(() => {
        setDepth((prev) => {
          if (prev >= 6) {
            setIsPlaying(false);
            return 6;
          }
          return prev + 1;
        });
      }, 1600);
    } else if (playTimerRef.current) {
      clearInterval(playTimerRef.current);
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, setDepth]);

  // Current explanation data
  const currentExplanation = STEP_EXPLANATIONS[Math.min(depth, 6)];

  // Color Theme definitions
  const themeColors = {
    indigo: {
      primary: '#4f46e5',
      primaryLight: '#818cf8',
      fill: '#6366f1',
      bgLight: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-700',
      badgeBg: 'bg-indigo-600',
    },
    emerald: {
      primary: '#059669',
      primaryLight: '#34d399',
      fill: '#10b981',
      bgLight: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      badgeBg: 'bg-emerald-600',
    },
    sunset: {
      primary: '#e11d48',
      primaryLight: '#fb7185',
      fill: '#f43f5e',
      bgLight: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-700',
      badgeBg: 'bg-rose-600',
    },
    violet: {
      primary: '#7c3aed',
      primaryLight: '#a78bfa',
      fill: '#8b5cf6',
      bgLight: 'bg-violet-50',
      border: 'border-violet-200',
      text: 'text-violet-700',
      badgeBg: 'bg-violet-600',
    },
  }[colorTheme];

  // Triangle numbering badge dimension helper for elementary mode
  const getBadgeStyle = (d: number) => {
    switch (d) {
      case 0:
        return { radius: 26, fontSize: 20, strokeW: 2.5 };
      case 1:
        return { radius: 20, fontSize: 16, strokeW: 2 };
      case 2:
        return { radius: 13, fontSize: 11, strokeW: 1.5 };
      case 3:
        return { radius: 8, fontSize: 7, strokeW: 1 };
      case 4:
        return { radius: 5, fontSize: 4.5, strokeW: 0.8 };
      default:
        return { radius: 3, fontSize: 3, strokeW: 0.5 };
    }
  };

  const badgeStyle = getBadgeStyle(depth);

  return (
    <section className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden space-y-0">
      {/* 1. Studio Top Banner: Step & Level Info */}
      <div className="p-5 sm:p-7 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-2xl">📐</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black text-white ${themeColors.badgeBg}`}>
                {level === 'elementary' ? currentExplanation.elementary.badge : `단계 n = ${depth} (0~6단계)`}
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                시어핀스키 삼각형 인터랙티브 스튜디오
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              {level === 'elementary'
                ? '가운데 역삼각형을 쏙 빼낼 때마다 일어나는 마법 같은 변화를 관찰해보세요!'
                : '거듭제곱(3의 n제곱)과 규칙성으로 탐구하는 시어핀스키 기하학 스튜디오'}
            </p>
          </div>

          {/* Quick step tag */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">현재 상태:</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs">
              {depth}단계 (0 ~ 6단계)
            </span>
          </div>
        </div>

        {/* 2. Key 3 Information Cards: Count, Perimeter, Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5">
          {/* Card 1: Triangle Count */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <span>삼각형의 개수</span>
              </span>
              <span className="text-[11px] font-semibold text-indigo-600 bg-white/80 px-2 py-0.5 rounded-md border border-indigo-100">
                {level === 'elementary' ? '매 단계 3배씩 증가' : '3의 n제곱'}
              </span>
            </div>

            <div className="pt-1">
              {level === 'elementary' ? (
                /* Elementary: NO exponents used! Explicit counts */
                <div>
                  <div className="text-2xl font-black text-indigo-950 font-mono tracking-tight">
                    {currentExplanation.elementary.triangleCountText}
                  </div>
                  <p className="text-xs text-indigo-800 mt-1">
                    남은 삼각형이 계속 <strong>3배씩</strong> 늘어나요!
                  </p>
                </div>
              ) : (
                /* Middle: Uses Powers / Exponents */
                <div>
                  <div className="text-xl sm:text-2xl font-black text-indigo-950 flex items-center gap-2">
                    <MathView math={currentExplanation.middle.triangleCountFormulaLatex || '3^n'} />
                    <span className="text-xs font-normal text-indigo-600 font-mono">
                      (= {Math.pow(3, depth)}개)
                    </span>
                  </div>
                  <p className="text-xs text-indigo-800 mt-1">
                    규칙: <span>n단계에서 삼각형의 개수는 </span>
                    <MathView math="3^n" />
                    <span> (3의 n제곱)</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Triangle Perimeter */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-amber-600" />
                <span>삼각형의 둘레</span>
              </span>
              <span className="text-[11px] font-semibold text-amber-700 bg-white/80 px-2 py-0.5 rounded-md border border-amber-100">
                {level === 'elementary' ? '테두리가 계속 길어짐' : '3 × (3/2)ⁿ 거듭제곱'}
              </span>
            </div>

            <div className="pt-1">
              {level === 'elementary' ? (
                /* Elementary: NO exponents used! Ratios & multiples */
                <div>
                  <div className="text-2xl font-black text-amber-950 font-mono tracking-tight">
                    {currentExplanation.elementary.perimeterText}
                  </div>
                  <p className="text-xs text-amber-800 mt-1">
                    가운데 구멍 테두리가 더해져 <strong>1.5배씩 길어져요!</strong>
                  </p>
                </div>
              ) : (
                /* Middle: Uses Powers / Exponents */
                <div>
                  <div className="text-lg sm:text-xl font-black text-amber-950 flex items-center gap-1.5">
                    <MathView math={currentExplanation.middle.perimeterFormulaLatex || '3 \\times \\left(\\frac{3}{2}\\right)^n'} />
                  </div>
                  <p className="text-xs text-amber-800 mt-1">
                    규칙: <span>n단계에서 삼각형의 둘레는 </span>
                    <MathView math="3 \times \left(\frac{3}{2}\right)^n" />
                    <span> (3 × 3/2의 n제곱)</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Triangle Area */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <Square className="w-4 h-4 text-emerald-600" />
                <span>삼각형의 넓이</span>
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-100">
                {level === 'elementary' ? '구멍이 뚫려 0에 가까워짐' : '(3/4)ⁿ 거듭제곱'}
              </span>
            </div>

            <div className="pt-1">
              {level === 'elementary' ? (
                /* Elementary: NO exponents used! Fractions & Percentages */
                <div>
                  <div className="text-2xl font-black text-emerald-950 font-mono tracking-tight">
                    {currentExplanation.elementary.areaText}
                  </div>
                  <p className="text-xs text-emerald-800 mt-1">
                    4조각 중 1조각을 빼내어 <strong>4분의 3씩 줄어들어요!</strong>
                  </p>
                </div>
              ) : (
                /* Middle: Uses Powers / Exponents */
                <div>
                  <div className="text-lg sm:text-xl font-black text-emerald-950 flex items-center gap-2">
                    <MathView math={currentExplanation.middle.areaFormulaLatex || '\\left(\\frac{3}{4}\\right)^n'} />
                    <span className="text-xs font-semibold text-emerald-700">
                      ({currentExplanation.middle.areaValPercent})
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 mt-1">
                    규칙: <span>n단계에서 삼각형의 넓이는 </span>
                    <MathView math="\left(\frac{3}{4}\right)^n" />
                    <span> (3/4의 n제곱)</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Studio Grid: Large Canvas (8 cols) + Controls (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Large Canvas Viewport */}
        <div
          ref={containerRef}
          className="lg:col-span-8 p-4 sm:p-8 flex flex-col items-center justify-center bg-slate-900 relative min-h-[480px] sm:min-h-[560px] select-none overflow-hidden"
        >
          {/* Floating Canvas Controls */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
            {/* View Mode Buttons */}
            <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-1 border border-slate-700 flex items-center gap-1 shadow-md">
              <button
                type="button"
                id="btn-mode-solid"
                onClick={() => setViewMode('solid')}
                className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-colors cursor-pointer ${
                  viewMode === 'solid'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="남은 정삼각형 채우기"
              >
                도형 채우기
              </button>
              <button
                type="button"
                id="btn-mode-holes"
                onClick={() => setViewMode('holes')}
                className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-colors cursor-pointer ${
                  viewMode === 'holes'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="잘라낸 구멍 강조"
              >
                잘라낸 구멍 보기
              </button>
              <button
                type="button"
                id="btn-mode-outline"
                onClick={() => setViewMode('outline')}
                className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-colors cursor-pointer ${
                  viewMode === 'outline'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="외곽선만 보기"
              >
                외곽선
              </button>
            </div>

            {/* Elementary Number Toggle */}
            {level === 'elementary' && depth <= 4 && (
              <button
                type="button"
                id="btn-toggle-numbers"
                onClick={() => setShowNumbers(!showNumbers)}
                className={`px-3 py-1.5 text-xs rounded-xl font-bold border transition-colors flex items-center gap-1.5 shadow-md cursor-pointer ${
                  showNumbers
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title="남은 삼각형에 번호표(1, 2, 3...) 붙이기"
              >
                <Hash className="w-3.5 h-3.5" />
                <span>번호표 {showNumbers ? 'ON' : 'OFF'}</span>
              </button>
            )}
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-slate-800/90 backdrop-blur-md rounded-xl p-1 border border-slate-700 shadow-md">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.8, Number((z - 0.2).toFixed(1))))}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              title="축소"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-slate-300 px-1 font-bold">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2.0, Number((z + 0.2).toFixed(1))))}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              title="확대"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoom !== 1 && (
              <button
                type="button"
                onClick={() => setZoom(1)}
                className="text-[10px] text-amber-400 hover:underline px-1"
              >
                초기화
              </button>
            )}
          </div>

          {/* SVG Canvas Element */}
          <div
            className="w-full flex items-center justify-center transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoom})` }}
          >
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full max-w-[620px] max-h-[520px] drop-shadow-2xl"
            >
              <defs>
                <filter id="canvas-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Inverted Holes Layer */}
              {viewMode === 'holes' &&
                holes.map((hole) => (
                  <polygon
                    key={hole.id}
                    points={`${hole.p1.x},${hole.p1.y} ${hole.p2.x},${hole.p2.y} ${hole.p3.x},${hole.p3.y}`}
                    fill="rgba(244, 63, 94, 0.45)"
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                ))}

              {/* Main Sierpinski Triangles */}
              {triangles.map((tri, index) => {
                const points = `${tri.p1.x},${tri.p1.y} ${tri.p2.x},${tri.p2.y} ${tri.p3.x},${tri.p3.y}`;
                const centroid = {
                  x: (tri.p1.x + tri.p2.x + tri.p3.x) / 3,
                  y: (tri.p1.y + tri.p2.y + tri.p3.y) / 3,
                };
                const isHovered = hoveredTriangle?.id === tri.id;

                return (
                  <g
                    key={tri.id}
                    onMouseEnter={() => setHoveredTriangle(tri)}
                    onMouseLeave={() => setHoveredTriangle(null)}
                    className="cursor-pointer group"
                  >
                    <polygon
                      points={points}
                      fill={
                        viewMode === 'outline'
                          ? 'none'
                          : isHovered
                          ? themeColors.primaryLight
                          : themeColors.fill
                      }
                      stroke={
                        viewMode === 'outline'
                          ? themeColors.primaryLight
                          : '#0f172a'
                      }
                      strokeWidth={
                        depth >= 5 ? 0.4 : depth >= 3 ? 0.8 : 1.5
                      }
                      className="transition-colors duration-200"
                    />

                    {/* Elementary Mode: Triangle Number Badge */}
                    {level === 'elementary' && showNumbers && depth <= 4 && (
                      <g>
                        <circle
                          cx={centroid.x}
                          cy={centroid.y}
                          r={badgeStyle.radius}
                          fill="#fef08a"
                          stroke="#854d0e"
                          strokeWidth={badgeStyle.strokeW}
                        />
                        <text
                          x={centroid.x}
                          y={centroid.y + badgeStyle.fontSize * 0.35}
                          textAnchor="middle"
                          fontSize={badgeStyle.fontSize}
                          fontWeight="900"
                          fill="#713f12"
                          fontFamily="sans-serif"
                        >
                          {index + 1}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom helper text inside canvas */}
          <div className="absolute bottom-3 text-center text-xs text-slate-400">
            {level === 'elementary' ? (
              <span className="text-amber-300 font-medium">
                {showNumbers && depth <= 4
                  ? `남은 삼각형 번호표(총 ${Math.pow(3, depth)}개)를 하나씩 확인해보세요!`
                  : `현재 ${depth}단계: 총 ${Math.pow(3, depth)}개의 예쁜 삼각형이 남아있어요.`}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <span>프랙탈 차원 <MathView math="D = \frac{\ln 3}{\ln 2} \approx 1.585" /></span>
                <span>|</span>
                <span>남은 개수 <MathView math={`3^{${depth}} = ${Math.pow(3, depth)}`} />개</span>
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Step Controls & Educational Guide */}
        <div className="lg:col-span-4 p-5 sm:p-7 bg-slate-50/70 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 space-y-6">
          <div className="space-y-6">
            {/* Step Slider (0 ~ 6) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="depth-slider"
                  className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>단계 조절 (0단계 ~ 6단계)</span>
                </label>
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-indigo-600 text-white shadow-2xs">
                  {depth} 단계
                </span>
              </div>

              {/* Slider */}
              <input
                id="depth-slider"
                type="range"
                min="0"
                max="6"
                step="1"
                value={depth}
                onChange={(e) => {
                  setDepth(Number(e.target.value));
                  setIsPlaying(false);
                }}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />

              {/* Quick Step Buttons (0 ~ 6) */}
              <div className="grid grid-cols-7 gap-1 mt-2.5">
                {[0, 1, 2, 3, 4, 5, 6].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setDepth(st);
                      setIsPlaying(false);
                    }}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      depth === st
                        ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-400/40'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Playback Controls (Play / Prev / Next / Reset) */}
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                id="btn-step-prev"
                onClick={() => {
                  setDepth(Math.max(0, depth - 1));
                  setIsPlaying(false);
                }}
                disabled={depth <= 0}
                className="py-2.5 px-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                title="이전 단계"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>이전</span>
              </button>

              <button
                type="button"
                id="btn-play-pause"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`py-2.5 px-2 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
                title={isPlaying ? '일시 정지' : '자동 생성 재생'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>정지</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>재생</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="btn-step-next"
                onClick={() => {
                  setDepth(Math.min(6, depth + 1));
                  setIsPlaying(false);
                }}
                disabled={depth >= 6}
                className="py-2.5 px-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                title="다음 단계"
              >
                <span>다음</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                id="btn-step-reset"
                onClick={() => {
                  setDepth(0);
                  setIsPlaying(false);
                }}
                className="py-2.5 px-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                title="0단계로 돌아가기"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>리셋</span>
              </button>
            </div>

            {/* Color Theme Selector */}
            <div className="pb-4 border-b border-slate-200">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-slate-500" />
                <span>테마 색상 변경</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'indigo', label: '인디고', bg: 'bg-indigo-600' },
                  { id: 'emerald', label: '에메랄드', bg: 'bg-emerald-600' },
                  { id: 'sunset', label: '선셋', bg: 'bg-rose-500' },
                  { id: 'violet', label: '바이올렛', bg: 'bg-violet-600' },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setColorTheme(th.id as ColorTheme)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      colorTheme === th.id
                        ? 'border-slate-800 bg-white text-slate-900 shadow-xs ring-2 ring-slate-800/10'
                        : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${th.bg}`} />
                    <span>{th.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Educational Discovery Note */}
            <div>
              {level === 'elementary' ? (
                /* Elementary Mode: Pure friendly analogy, NO exponents! */
                <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 border border-amber-200 text-amber-950 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-800">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>초등학생 눈높이 발견 노트 ({depth}단계)</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
                    {currentExplanation.elementary.description}
                  </p>
                  <div className="pt-2 border-t border-amber-200 text-xs font-semibold text-amber-800 flex items-center justify-between">
                    <span>💡 발견한 규칙:</span>
                    <span className="font-bold">이전 개수 × 3배! (1 ➔ 3 ➔ 9 ➔ 27...)</span>
                  </div>
                </div>
              ) : (
                /* Middle School Mode: Mathematical Formulas & Insights */
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-black text-indigo-700">
                    <span className="flex items-center gap-1">
                      <Info className="w-4 h-4" />
                      <span>중학생 수학 공식 분석 ({depth}단계)</span>
                    </span>
                    <span className="font-mono bg-indigo-50 px-2 py-0.5 rounded text-indigo-800">
                      지수 n = {depth}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentExplanation.middle.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <span className="font-bold text-slate-900 block">수학적 원리 Insight:</span>
                    <span className="text-slate-600 leading-relaxed block text-[11px]">
                      {currentExplanation.middle.mathInsight}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>바츠와프 시어핀스키 (1915)</span>
            <span className="text-indigo-600 font-semibold">0단계 ~ 6단계 탐구</span>
          </div>
        </div>
      </div>
    </section>
  );
};
