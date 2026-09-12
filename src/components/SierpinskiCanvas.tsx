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
  Eye
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

  // Dimension setup for SVG coordinate system
  const width = 600;
  const height = 520;
  const padding = 20;

  // Root triangle vertices (Equilateral Triangle)
  const rootP1: Point = { x: width / 2, y: padding };
  const rootP2: Point = { x: padding, y: height - padding };
  const rootP3: Point = { x: width - padding, y: height - padding };

  // Midpoint helper
  const getMid = (a: Point, b: Point): Point => ({
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  });

  // Calculate remaining triangles and removed hole triangles recursively
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
      }, 1500);
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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
      {/* Top Banner with current step overview */}
      <div className="p-4 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold text-white ${themeColors.badgeBg}`}
              >
                {level === 'elementary' ? currentExplanation.elementary.badge : `깊이 n = ${depth}`}
              </span>
              <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {level === 'elementary'
                  ? currentExplanation.elementary.title
                  : currentExplanation.middle.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              {level === 'elementary'
                ? currentExplanation.elementary.subTitle
                : currentExplanation.middle.subTitle}
            </p>
          </div>

          {/* Quick Stats Pills with LaTeX representation */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">남은 삼각형:</span>
              {level === 'elementary' ? (
                <span className="font-bold text-slate-900 font-mono text-sm">
                  {Math.pow(3, depth)}개
                </span>
              ) : (
                <span className="font-bold text-slate-900 inline-flex items-center">
                  <MathView math={currentExplanation.middle.triangleCountFormulaLatex || '3^n'} />
                  <span className="ml-1 text-slate-500 font-normal">
                    (= {Math.pow(3, depth)}개)
                  </span>
                </span>
              )}
            </div>

            {level === 'middle' ? (
              <>
                <div className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 flex items-center gap-1.5">
                  <span className="text-indigo-600 font-medium">남은 면적:</span>
                  <MathView math={currentExplanation.middle.areaFormulaLatex || '\\left(\\frac{3}{4}\\right)^n'} />
                  <span className="text-[11px] text-indigo-500 font-normal">
                    ({currentExplanation.middle.areaValPercent})
                  </span>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-1.5">
                  <span className="text-amber-700 font-medium">전체 둘레:</span>
                  <MathView math={currentExplanation.middle.perimeterFormulaLatex || '3 \\times \\left(\\frac{3}{2}\\right)^n'} />
                </div>
              </>
            ) : (
              <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-medium flex items-center gap-1">
                <span>{currentExplanation.elementary.analogy}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Canvas & Controls Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Side: Interactive SVG Canvas (8 cols on lg) */}
        <div
          ref={containerRef}
          className="lg:col-span-8 p-4 sm:p-6 flex flex-col items-center justify-center bg-slate-900 relative min-h-[440px] sm:min-h-[520px] select-none overflow-hidden"
        >
          {/* Canvas Floating Tools: Modes & Elementary Numbering */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
            {/* View Mode */}
            <div className="bg-slate-800/90 backdrop-blur-md rounded-lg p-1 border border-slate-700 flex items-center gap-1">
              <button
                type="button"
                id="btn-mode-solid"
                onClick={() => setViewMode('solid')}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
                  viewMode === 'solid'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="채우기 모드"
              >
                도형 채우기
              </button>
              <button
                type="button"
                id="btn-mode-holes"
                onClick={() => setViewMode('holes')}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
                  viewMode === 'holes'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="잘라낸 구멍 강조 모드"
              >
                잘라낸 구멍 보기
              </button>
              <button
                type="button"
                id="btn-mode-outline"
                onClick={() => setViewMode('outline')}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
                  viewMode === 'outline'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="외곽선 모드"
              >
                외곽선
              </button>
            </div>

            {/* Elementary Triangle Numbering Toggle (User Requirement 6) */}
            {level === 'elementary' && (
              <button
                type="button"
                id="btn-toggle-numbers"
                onClick={() => setShowNumbers(!showNumbers)}
                className={`px-2.5 py-1 text-xs rounded-lg font-bold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showNumbers
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                    : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title="남아있는 삼각형에 1, 2, 3... 번호를 표시하여 쉽게 개수를 셀 수 있어요"
              >
                <Hash className="w-3.5 h-3.5" />
                <span>{showNumbers ? '숫자 번호표 켜짐 (1, 2, 3...)' : '삼각형 번호표 보기'}</span>
              </button>
            )}
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-slate-800/90 backdrop-blur-md rounded-lg p-1 border border-slate-700 text-slate-200">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))}
              className="p-1.5 rounded hover:bg-slate-700 transition-colors cursor-pointer"
              title="축소"
              aria-label="축소"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono px-1 font-medium text-slate-300">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2.2, z + 0.15))}
              className="p-1.5 rounded hover:bg-slate-700 transition-colors cursor-pointer"
              title="확대"
              aria-label="확대"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(1)}
              className="text-[10px] px-1.5 py-0.5 rounded hover:bg-slate-700 text-slate-400 cursor-pointer"
              title="기본 크기로 리셋"
            >
              리셋
            </button>
          </div>

          {/* SVG Canvas */}
          <div
            className="w-full flex items-center justify-center transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          >
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full max-w-[500px] h-auto drop-shadow-2xl overflow-visible"
              style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))' }}
            >
              <defs>
                <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={themeColors.primaryLight} />
                  <stop offset="100%" stopColor={themeColors.primary} />
                </linearGradient>

                <linearGradient id="holeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f87171" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Background Base Triangle (Dark Guide) */}
              <polygon
                points={`${rootP1.x},${rootP1.y} ${rootP2.x},${rootP2.y} ${rootP3.x},${rootP3.y}`}
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2"
              />

              {/* Rendered Remaining Triangles */}
              <g id="sierpinski-triangles">
                {triangles.map((tri, triIdx) => {
                  const isHovered = hoveredTriangle?.id === tri.id;

                  // Centroid calculation for elementary numbering
                  const cx = (tri.p1.x + tri.p2.x + tri.p3.x) / 3;
                  const cy = (tri.p1.y + tri.p2.y + tri.p3.y) / 3;

                  return (
                    <g key={tri.id}>
                      <polygon
                        id={`tri-${tri.id}`}
                        points={`${tri.p1.x},${tri.p1.y} ${tri.p2.x},${tri.p2.y} ${tri.p3.x},${tri.p3.y}`}
                        fill={viewMode === 'outline' ? 'transparent' : 'url(#triGrad)'}
                        stroke={
                          isHovered
                            ? '#fbbf24'
                            : viewMode === 'outline'
                            ? themeColors.primaryLight
                            : '#0f172a'
                        }
                        strokeWidth={
                          viewMode === 'outline'
                            ? depth > 4
                              ? 0.75
                              : 1.5
                            : depth > 4
                            ? 0.2
                            : 0.6
                        }
                        className="transition-all duration-300"
                        onMouseEnter={() => setHoveredTriangle(tri)}
                        onMouseLeave={() => setHoveredTriangle(null)}
                      />

                      {/* Requirement 6: Elementary Triangle Numbering in Center */}
                      {level === 'elementary' && showNumbers && depth <= 4 && (
                        <g className="pointer-events-none select-none">
                          <circle
                            cx={cx}
                            cy={cy}
                            r={badgeStyle.radius}
                            fill="#ffffff"
                            stroke="#0f172a"
                            strokeWidth={badgeStyle.strokeW}
                            opacity={0.92}
                          />
                          <text
                            x={cx}
                            y={cy}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#0f172a"
                            fontSize={badgeStyle.fontSize}
                            fontWeight="900"
                            fontFamily="Noto Sans KR, sans-serif"
                          >
                            {triIdx + 1}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Removed Hole Highlight Mode */}
              {viewMode === 'holes' && (
                <g id="removed-holes" className="animate-fadeIn">
                  {holes.map((hole) => (
                    <polygon
                      key={hole.id}
                      points={`${hole.p1.x},${hole.p1.y} ${hole.p2.x},${hole.p2.y} ${hole.p3.x},${hole.p3.y}`}
                      fill="url(#holeGrad)"
                      stroke="#fecaca"
                      strokeWidth={depth > 4 ? 0.3 : 1}
                      fillOpacity={0.85}
                    />
                  ))}
                </g>
              )}
            </svg>
          </div>

          {/* Bottom Canvas Overlay Message */}
          <div className="absolute bottom-3 text-center text-xs text-slate-400">
            {level === 'elementary' ? (
              <span className="text-amber-300 font-medium">
                {showNumbers && depth <= 4
                  ? `남은 삼각형 중앙의 번호(총 ${Math.pow(3, depth)}개)를 세어보세요!`
                  : '작은 삼각형들이 끝없이 3배씩 늘어나는 자기닮음의 마법'}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <span>프랙탈 차원 <MathView math="D = \frac{\ln 3}{\ln 2} \approx 1.585" /></span>
                <span>|</span>
                <span>남은 개수 <MathView math={`3^{${depth}} = ${Math.pow(3, depth)}`} /></span>
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Step Controls & Math Inspector (4 cols on lg) */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-slate-50/70 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200">
          <div>
            {/* Depth Slider & Step Controllers */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="depth-slider"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span>도형 깊이 (단계: {depth})</span>
                </label>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
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
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />

              {/* Step indicator marks */}
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold px-0.5 mt-1.5">
                {[0, 1, 2, 3, 4, 5, 6].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setDepth(st);
                      setIsPlaying(false);
                    }}
                    className={`hover:text-indigo-600 transition-colors cursor-pointer ${
                      depth === st ? 'text-indigo-600 font-bold' : ''
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Playback Controls (Play / Step Back / Step Forward / Reset) */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              <button
                type="button"
                id="btn-step-prev"
                onClick={() => {
                  setDepth(Math.max(0, depth - 1));
                  setIsPlaying(false);
                }}
                disabled={depth <= 0}
                className="py-2.5 px-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                title="이전 단계"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>이전</span>
              </button>

              <button
                type="button"
                id="btn-play-pause"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`py-2.5 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer ${
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
                className="py-2.5 px-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
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
                className="py-2.5 px-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-100 flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                title="처음으로 리셋"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>리셋</span>
              </button>
            </div>

            {/* Color Theme Selector */}
            <div className="mb-6 pb-6 border-b border-slate-200">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-slate-500" />
                <span>테마 색상</span>
              </label>
              <div className="flex items-center gap-2">
                {[
                  { id: 'indigo', label: '인디고', bg: 'bg-indigo-600' },
                  { id: 'emerald', label: '에메랄드', bg: 'bg-emerald-600' },
                  { id: 'sunset', label: '선셋 코랄', bg: 'bg-rose-500' },
                  { id: 'violet', label: '바이올렛', bg: 'bg-violet-600' },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setColorTheme(th.id as ColorTheme)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      colorTheme === th.id
                        ? 'border-slate-800 bg-white text-slate-900 shadow-xs ring-2 ring-slate-800/10'
                        : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${th.bg}`} />
                    <span className="hidden sm:inline">{th.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Educational Breakdown according to Level */}
            <div className="space-y-3">
              {level === 'elementary' ? (
                <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-200/80 text-amber-950">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>초등학생 눈높이 발견 노트</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
                    {currentExplanation.elementary.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-amber-200 text-xs font-medium text-amber-800 flex items-center justify-between">
                    <span>💡 규칙:</span>
                    <span className="font-bold">언제나 이전 삼각형 수 × 3배!</span>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-700">
                    <span className="flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>중학생 수학 공식 분석 ({depth}단계)</span>
                    </span>
                    <span className="font-mono bg-indigo-50 px-2 py-0.5 rounded text-indigo-800">
                      지수 n = {depth}
                    </span>
                  </div>

                  {/* Requirement 2: Fractions and Formulas represented in textbook LaTeX */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-slate-500 font-medium text-[11px] mb-1">삼각형 개수</div>
                      <div className="font-bold text-indigo-700 flex items-center">
                        <MathView math={currentExplanation.middle.triangleCountFormulaLatex || '3^n'} />
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-slate-500 font-medium text-[11px] mb-1">한 변의 길이</div>
                      <div className="font-bold text-slate-800 flex items-center">
                        <MathView math={currentExplanation.middle.sideLengthFormulaLatex || '\\left(\\frac{1}{2}\\right)^n'} />
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-slate-500 font-medium text-[11px] mb-1">남은 면적 비율</div>
                      <div className="font-bold text-emerald-700 flex items-center">
                        <MathView math={currentExplanation.middle.areaFormulaLatex || '\\left(\\frac{3}{4}\\right)^n'} />
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-slate-500 font-medium text-[11px] mb-1">전체 둘레 길이</div>
                      <div className="font-bold text-amber-800 flex items-center">
                        <MathView math={currentExplanation.middle.perimeterFormulaLatex || '3 \\times \\left(\\frac{3}{2}\\right)^n'} />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100 leading-relaxed">
                    <strong>수학적 원리:</strong> {currentExplanation.middle.mathInsight}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Tip Footer */}
          <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-600 flex items-center justify-between">
            <span>폴란드 수학자 바츠와프 시어핀스키(1915년)</span>
            <span className="text-indigo-600 font-medium">Sierpiński Triangle</span>
          </div>
        </div>
      </div>
    </div>
  );
};
