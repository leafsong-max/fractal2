import React, { useState, useRef, useMemo } from 'react';
import { EducationLevel, RouletteOption, RouletteReward } from '../types';
import { ROULETTE_OPTIONS } from '../data/fractalData';
import { Sparkles, RotateCw, Trophy, Gift, ArrowDown, HelpCircle, CheckCircle } from 'lucide-react';

interface RouletteWheelProps {
  level: EducationLevel;
  onSpinComplete?: (reward: RouletteReward) => void;
}

export const RouletteWheel: React.FC<RouletteWheelProps> = ({ level, onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedReward, setSelectedReward] = useState<RouletteOption | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // 4 slices, 90 degrees each
  // Slice 0 (0° ~ 90°): 3장 도움 (center 45°)
  // Slice 1 (90° ~ 180°): 4장 도움 (center 135°)
  // Slice 2 (180° ~ 270°): 5장 도움 (center 225°)
  // Slice 3 (270° ~ 360°): 6장 도움 (center 315°)
  const slices = useMemo(() => {
    return ROULETTE_OPTIONS.map((opt, idx) => {
      const startAngle = idx * 90;
      const endAngle = (idx + 1) * 90;
      const midAngle = (startAngle + endAngle) / 2;
      return {
        ...opt,
        idx,
        startAngle,
        endAngle,
        midAngle,
      };
    });
  }, []);

  // Pick weighted winner based on level
  const pickWinner = (): typeof slices[0] => {
    const roll = Math.random(); // 0 to 1
    let cum = 0;
    for (const slice of slices) {
      const prob = level === 'elementary' ? slice.elementaryProb : slice.middleProb;
      cum += prob;
      if (roll <= cum || slice.idx === slices.length - 1) {
        return slice;
      }
    }
    return slices[0];
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowConfetti(false);
    setSelectedReward(null);

    const winner = pickWinner();

    // Top indicator is at 270° (top center, 12 o'clock in SVG coordinate where 0° is 3 o'clock)
    // To land on winner slice, angle at top must fall inside [winner.startAngle, winner.endAngle]
    // Margin of 15° to avoid line ambiguity
    const targetSliceAngle = winner.startAngle + 15 + Math.random() * 60; // center-ish

    // Wheel rotates clockwise. At rotation R, point at top (270°) was originally at (270 - R) mod 360
    // So (270 - R) = targetSliceAngle => R = 270 - targetSliceAngle (mod 360)
    let baseTarget = (270 - targetSliceAngle) % 360;
    if (baseTarget < 0) baseTarget += 360;

    // Current angle normalized
    const currentNorm = rotationAngle % 360;
    let diff = baseTarget - currentNorm;
    if (diff < 0) diff += 360;

    // Add 6 to 8 full spins
    const extraSpins = 360 * (6 + Math.floor(Math.random() * 2));
    const newTotalAngle = rotationAngle + extraSpins + diff;

    setRotationAngle(newTotalAngle);

    // Spin duration: 4.2 seconds
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedReward(winner);
      setHasSpun(true);
      setShowConfetti(true);
      if (onSpinComplete) {
        onSpinComplete(winner.id);
      }
    }, 4200);
  };

  // Wheel colors and SVGs
  const size = 320;
  const center = size / 2;
  const radius = center - 14;

  // Generate SVG path for a 90-degree sector
  const getSectorPath = (startDeg: number, endDeg: number) => {
    const startRad = (startDeg * Math.PI) / 180;
    const endRad = (endDeg * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/70 via-white to-amber-50/70 rounded-2xl border border-indigo-200/80 p-5 sm:p-7 space-y-6 shadow-sm">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">🎡</span>
            <h4 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              도전 퀴즈 만점 보상! 행운의 회전 룰렛
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            퀴즈 2문제를 모두 맞힌 여러분에게 특별한 <strong>'도움 카드'</strong>를 선물합니다!
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
          <span>{level === 'elementary' ? '🎒 초등학생 모드 룰렛' : '📐 중학생 모드 룰렛'}</span>
        </div>
      </div>

      {/* Main Roulette Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Center: Interactive Spinning Wheel (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative py-2">
          {/* Top Indicator Needle Pointer */}
          <div className="relative z-20 flex flex-col items-center -mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-md">
              <ArrowDown className="w-5 h-5 animate-pulse" />
            </div>
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[14px] border-t-amber-400 -mt-1 drop-shadow-md"></div>
          </div>

          {/* Rotating Wheel Container */}
          <div className="relative p-2 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 shadow-xl border-4 border-slate-800">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="rounded-full shadow-inner select-none"
              style={{
                transform: `rotate(${rotationAngle}deg)`,
                transition: isSpinning
                  ? 'transform 4.2s cubic-bezier(0.15, 0.9, 0.2, 1)'
                  : 'none',
              }}
            >
              <defs>
                {/* Gradient for sectors */}
                <radialGradient id="hubGrad">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </radialGradient>
              </defs>

              {/* 4 Quadrant Slices */}
              {slices.map((slice) => {
                const path = getSectorPath(slice.startAngle, slice.endAngle);
                const textAngle = slice.midAngle;
                const textRad = (textAngle * Math.PI) / 180;
                // Label position
                const textRadius = radius * 0.62;
                const tx = center + textRadius * Math.cos(textRad);
                const ty = center + textRadius * Math.sin(textRad);

                return (
                  <g key={slice.id}>
                    <path
                      d={path}
                      fill={slice.color}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="cursor-pointer hover:opacity-95"
                    />

                    {/* Slice Text with Rotation */}
                    <g transform={`translate(${tx}, ${ty}) rotate(${textAngle + 90})`}>
                      <text
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={slice.textColor}
                        fontSize="15"
                        fontWeight="900"
                        fontFamily="Noto Sans KR, sans-serif"
                        className="drop-shadow-sm"
                      >
                        {slice.label}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Center Decorative Hub */}
              <circle
                cx={center}
                cy={center}
                r="38"
                fill="url(#hubGrad)"
                stroke="#1e293b"
                strokeWidth="3.5"
                className="shadow-md"
              />
              <circle cx={center} cy={center} r="28" fill="#1e293b" />
              <text
                x={center}
                y={center - 3}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fbbf24"
                fontSize="12"
                fontWeight="900"
              >
                FRACTAL
              </text>
              <text
                x={center}
                y={center + 11}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
                fontSize="9"
                fontWeight="700"
              >
                CHANCE
              </text>
            </svg>
          </div>

          {/* Spin Trigger Button */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <button
              id="btn-spin-roulette"
              type="button"
              onClick={handleSpin}
              disabled={isSpinning}
              className={`px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-md flex items-center gap-2 transition-all cursor-pointer ${
                isSpinning
                  ? 'bg-slate-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white hover:scale-105 shadow-amber-200'
              }`}
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? '빙글빙글 회전 중...' : '룰렛 돌리기! (START)'}</span>
            </button>
            <span className="text-[11px] text-slate-500">
              {isSpinning
                ? '과연 어떤 도움 카드가 나올까요?'
                : hasSpun
                ? '다시 돌리기를 눌러 다른 도움 카드도 획득해보세요!'
                : '버튼을 눌러 룰렛을 힘차게 돌려보세요!'}
            </span>
          </div>
        </div>

        {/* Right: Reward Guide & Winning Result (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Result Card (Shown after spin) */}
          {selectedReward ? (
            <div className="p-5 rounded-2xl bg-white border-2 border-amber-400 shadow-md animate-fadeIn space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full bg-amber-400 text-slate-950">
                  <Trophy className="w-3.5 h-3.5" />
                  당첨 결과!
                </span>
                <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  ✨ 축하합니다!
                </span>
              </div>

              <div className="text-center py-2 space-y-1">
                <div className="text-3xl font-black text-slate-900 tracking-tight">
                  🎉 {selectedReward.label}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {selectedReward.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-xs text-amber-950">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  축하합니다! 시어핀스키 삼각형 탐구 활동에서 자유롭게 사용할 수 있는{' '}
                  <strong>{selectedReward.label}</strong> 보상이 지급되었습니다!
                </span>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200 shadow-2xs space-y-2 text-center">
              <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <h5 className="font-bold text-slate-900 text-sm">
                룰렛을 돌려 보상을 획득하세요!
              </h5>
              <p className="text-xs text-slate-500">
                룰렛을 힘차게 돌려 특별한 도움 카드 보상을 획득해보세요!
              </p>
            </div>
          )}

          {/* Reward Cards Guide */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>🎁</span>
                <span>획득 가능한 도움 카드 목록</span>
              </span>
              <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                총 4종류
              </span>
            </div>

            <div className="space-y-2.5">
              {slices.map((slice) => {
                const isSelected = selectedReward?.id === slice.id;

                return (
                  <div
                    key={slice.id}
                    className={`p-3 rounded-xl border transition-all flex flex-col gap-1 text-xs ${
                      isSelected
                        ? 'bg-amber-50 border-amber-400 font-bold text-amber-950 ring-2 ring-amber-400/40 shadow-xs'
                        : 'bg-slate-50 border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                          style={{ backgroundColor: slice.color }}
                        />
                        <span className="font-extrabold text-slate-900 text-sm">{slice.label}</span>
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                          현재 당첨!
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 pl-5.5 leading-relaxed">
                      {slice.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Explanatory note */}
            <div className="pt-2 text-[11px] text-slate-500 leading-normal flex items-start gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                룰렛을 돌리면 4가지 도움 카드 중 하나가 랜덤으로 당첨됩니다. 획득한 카드로 프랙탈 탐험을 즐겨보세요!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
