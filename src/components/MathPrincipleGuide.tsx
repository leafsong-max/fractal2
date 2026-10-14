import React, { useState } from 'react';
import { EducationLevel } from '../types';
import { MathView } from './MathView';
import {
  Scissors,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Infinity as InfinityIcon,
  Maximize2,
  Calculator,
  Search,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface MathPrincipleGuideProps {
  level: EducationLevel;
  currentDepth: number;
  setDepth: (d: number) => void;
}

export const MathPrincipleGuide: React.FC<MathPrincipleGuideProps> = ({
  level,
  currentDepth,
  setDepth,
}) => {
  // Elementary animation step (0 to 3)
  const [animStep, setAnimStep] = useState<number>(1);
  const [zoomStage, setZoomStage] = useState<'normal' | 'zoomed'>('normal');

  // Middle school interactive power calculator value
  const [calcN, setCalcN] = useState<number>(3);

  // Elementary animation stages
  const elementarySteps = [
    {
      step: 0,
      title: '1. 색종이 정삼각형 한 장',
      desc: '자르지 않은 온전한 삼각형이에요. 구멍이 하나도 없고, 넓이는 100%예요.',
      emoji: '📐',
      rule: '삼각형 1개 (구멍 0개)'
    },
    {
      step: 1,
      title: '2. 가운데 삼각형 싹둑 빼내기!',
      desc: '세 변의 정가운데를 이어서 가운데 생긴 역삼각형 1개를 쏙 빼내요. 주변에 작은 삼각형 3개가 남아요!',
      emoji: '✂️',
      rule: '가운데 구멍 1개 뚫림 → 3개 남음'
    },
    {
      step: 2,
      title: '3. 남은 3개에서 또 가운데 쏙쏙!',
      desc: '남아있는 3개의 삼각형마다 똑같이 가운데를 오려내요. 3개마다 3개씩 남으니까 3 × 3 = 9개가 돼요!',
      emoji: '✨',
      rule: '3개 × 3 = 9개로 3배씩 늘어나요!'
    },
    {
      step: 3,
      title: '4. 끝없이 반복되는 신비한 무늬!',
      desc: '계속 자르고 잘라도, 아무리 돋보기로 들여다보아도 처음과 똑같은 삼각형이 계속 나타나요. 이것이 바로 "자기닮음"이에요!',
      emoji: '🔍',
      rule: '영원히 반복되는 나만의 프랙탈!'
    }
  ];

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-8 space-y-8">
      {/* Title & Perspective Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">
              {level === 'elementary' ? '🎨' : '📐'}
            </span>
            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {level === 'elementary'
                ? '재미있는 애니메이션으로 보는 원리 가이드'
                : '거듭제곱과 지수로 완벽 이해하는 수학적 원리'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {level === 'elementary'
              ? '가운데 구멍을 뚫을 때마다 어떤 놀라운 규칙이 생기는지 함께 관찰해 볼까요?'
              : '거듭제곱(3의 n제곱) 수식과 규칙성, 그리고 프랙탈 차원의 비밀을 분석합니다.'}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 self-start sm:self-auto">
          <span>현재 적용된 관점:</span>
          <strong className="text-indigo-600">
            {level === 'elementary' ? '초등학교 (직관/애니메이션)' : '중학교 (거듭제곱/지수법칙)'}
          </strong>
        </div>
      </div>

      {/* ELEMENTARY SCHOOL VIEW */}
      {level === 'elementary' ? (
        <div className="space-y-8">
          {/* Animated Step Simulator */}
          <div className="bg-amber-50/50 rounded-2xl p-4 sm:p-6 border border-amber-200/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm shadow-xs">
                  애니메이션 실험실
                </span>
                <span className="text-sm font-bold text-slate-800">
                  단계 버튼을 눌러 구멍이 뚫리는 과정을 보세요!
                </span>
              </div>

              {/* Step Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {elementarySteps.map((s, idx) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => {
                      setAnimStep(idx);
                      setDepth(idx);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      animStep === idx
                        ? 'bg-amber-500 text-slate-950 shadow-xs ring-2 ring-amber-400/50'
                        : 'bg-white text-slate-600 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    {idx === 0 ? '시작' : `${idx}단계`}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive SVG Animation Display */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 flex flex-col items-center justify-center bg-white rounded-xl p-4 sm:p-6 border border-amber-200/80 shadow-inner min-h-[280px]">
                <svg viewBox="0 0 300 260" className="w-full max-w-[280px] h-auto">
                  {/* Outer Triangle */}
                  <polygon
                    points="150,15 25,235 275,235"
                    fill={animStep === 0 ? '#f59e0b' : '#3b82f6'}
                    stroke="#1e3a8a"
                    strokeWidth="2"
                  />

                  {/* Level 1 Cutout Hole */}
                  {animStep >= 1 && (
                    <polygon
                      points="87.5,125 212.5,125 150,235"
                      fill="#ffffff"
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      className="animate-pulse"
                    />
                  )}

                  {/* Level 2 Cutouts */}
                  {animStep >= 2 && (
                    <>
                      {/* Top sub-triangle hole */}
                      <polygon
                        points="118.75,70 181.25,70 150,125"
                        fill="#ffffff"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                      />
                      {/* Left sub-triangle hole */}
                      <polygon
                        points="56.25,180 118.75,180 87.5,235"
                        fill="#ffffff"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                      />
                      {/* Right sub-triangle hole */}
                      <polygon
                        points="181.25,180 243.75,180 212.5,235"
                        fill="#ffffff"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                      />
                    </>
                  )}

                  {/* Level 3 Micro Hint */}
                  {animStep >= 3 && (
                    <g opacity="0.9">
                      {/* 9 micro holes dotted */}
                      <circle cx="150" cy="50" r="3" fill="#ef4444" />
                      <circle cx="134" cy="95" r="3" fill="#ef4444" />
                      <circle cx="166" cy="95" r="3" fill="#ef4444" />
                      <circle cx="87" cy="160" r="3" fill="#ef4444" />
                      <circle cx="72" cy="205" r="3" fill="#ef4444" />
                      <circle cx="103" cy="205" r="3" fill="#ef4444" />
                      <circle cx="213" cy="160" r="3" fill="#ef4444" />
                      <circle cx="197" cy="205" r="3" fill="#ef4444" />
                      <circle cx="228" cy="205" r="3" fill="#ef4444" />
                    </g>
                  )}
                </svg>

                <div className="mt-3 text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    <span>{elementarySteps[animStep].emoji}</span>
                    <span>{elementarySteps[animStep].rule}</span>
                  </span>
                </div>
              </div>

              {/* Explanatory Dialogue Box */}
              <div className="md:col-span-6 space-y-4">
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-amber-200/80 shadow-2xs">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <span>{elementarySteps[animStep].title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {elementarySteps[animStep].desc}
                  </p>
                </div>

                <div className="bg-white/80 rounded-xl p-4 border border-amber-200/60 space-y-2 text-xs sm:text-sm">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Scissors className="w-4 h-4 text-amber-600" />
                    <span>왜 3배씩 늘어날까요?</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    가운데 삼각형 1개를 쏙 빼내면 항상 <strong>위쪽, 왼쪽 아래, 오른쪽 아래</strong>에 3개의 삼각형이 남게 돼요! 그래서 매번 <strong>3을 곱하기(× 3)</strong> 해주면 다음 단계 삼각형 수가 나와요!
                  </p>
                  <div className="bg-amber-100/60 p-2 rounded text-amber-900 font-bold font-mono text-center">
                    1개 ➔ 3개 ➔ 9개 ➔ 27개 ➔ 81개 ➔ 243개!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Self-Similarity Magnifier Toy */}
          <div className="bg-sky-50/60 rounded-2xl p-5 border border-sky-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-sky-600" />
                <h4 className="text-base font-bold text-slate-900">
                  신기한 돋보기 실험실: ‘자기닮음’이 뭐예요?
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setZoomStage(zoomStage === 'normal' ? 'zoomed' : 'normal')}
                className="px-3 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{zoomStage === 'normal' ? '돋보기로 한 구석 10배 확대하기!' : '원래 크기로 돌아오기'}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              프랙탈의 가장 신기한 특징은 <strong>‘자기닮음(스스로를 꼭 닮음)’</strong>이에요.
              아무리 작고 구석진 삼각형 조각을 돋보기로 크게 확대해도, 처음 전체 모습과 완벽하게 똑같답니다!
            </p>

            <div className="p-4 bg-white rounded-xl border border-sky-200 text-center">
              {zoomStage === 'normal' ? (
                <div className="flex flex-col items-center">
                  <div className="text-xs text-slate-500 mb-2">전체 시어핀스키 삼각형 모습</div>
                  <div className="w-24 h-20 bg-indigo-600 clip-triangle flex items-center justify-center text-white text-[10px] font-bold">
                    전체 모양
                  </div>
                  <div className="text-xs text-sky-700 mt-2 font-medium">
                    🔍 위 버튼을 눌러 왼쪽 아래 구석 모퉁이를 10배 확대해보세요!
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center animate-fadeIn">
                  <div className="text-xs font-bold text-sky-700 mb-2">
                    🎉 10배 확대한 구석 조각: 놀랍게도 전체 모양과 100% 똑같아요!
                  </div>
                  <div className="w-36 h-28 bg-indigo-600 clip-triangle flex items-center justify-center text-white text-xs font-bold border-2 border-amber-400">
                    확대해도 똑같음!
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    "부분이 전체를 닮고, 전체가 부분을 품고 있는 마법의 도형!"
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* MIDDLE SCHOOL MATHEMATICAL & POWER VIEW */
        <div className="space-y-8">
          {/* Power of 3 (거듭제곱 지수 법칙) Core Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. 삼각형 개수의 거듭제곱 (3^n) */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  개수의 거듭제곱
                </span>
                <span className="text-base text-indigo-700">
                  <MathView math="N_n = 3^n" />
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                남은 정삼각형 개수는 3의 n제곱
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                매 단계마다 1개의 정삼각형이 3개의 작은 삼각형으로 쪼개집니다. 따라서 n단계에서의 삼각형 개수는 3을 n번 곱한 <MathView math="3^n" />이 됩니다.
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-700">
                <div className="flex items-center gap-2"><MathView math="n = 0 \implies 3^0 = 1" /><span>(1개)</span></div>
                <div className="flex items-center gap-2"><MathView math="n = 1 \implies 3^1 = 3" /><span>(3개)</span></div>
                <div className="flex items-center gap-2"><MathView math="n = 2 \implies 3^2 = 9" /><span>(9개)</span></div>
                <div className="flex items-center gap-2"><MathView math="n = 3 \implies 3^3 = 27" /><span>(27개)</span></div>
                <div className="flex items-center gap-2"><MathView math="n = 4 \implies 3^4 = 81" /><span>(81개)</span></div>
              </div>
            </div>

            {/* 2. 한 변의 길이 거듭제곱 ((1/2)^n) */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:border-sky-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                  길이의 거듭제곱
                </span>
                <span className="text-base text-sky-700">
                  <MathView math="L_n = \left(\frac{1}{2}\right)^n" />
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                한 변의 길이는 중점 연결로 매번 1/2로 축소
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                정삼각형 각 변의 <strong>중점(중간 지점)</strong>을 잇기 때문에, 삼각형 한 변의 길이는 매 단계마다 정확히 <MathView math="\frac{1}{2}" />로 줄어듭니다.
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-700">
                <div className="flex items-center gap-2"><MathView math="n = 0 \implies \left(\frac{1}{2}\right)^0 = 1" /></div>
                <div className="flex items-center gap-2"><MathView math="n = 1 \implies \left(\frac{1}{2}\right)^1 = \frac{1}{2} = 0.5" /></div>
                <div className="flex items-center gap-2"><MathView math="n = 2 \implies \left(\frac{1}{2}\right)^2 = \frac{1}{4} = 0.25" /></div>
                <div className="flex items-center gap-2"><MathView math="n = 3 \implies \left(\frac{1}{2}\right)^3 = \frac{1}{8} = 0.125" /></div>
                <div className="flex items-center gap-2"><MathView math="n = 4 \implies \left(\frac{1}{2}\right)^4 = \frac{1}{16} = 0.0625" /></div>
              </div>
            </div>

            {/* 3. 면적의 거듭제곱: (3/4)^n -> 0 */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  면적의 거듭제곱
                </span>
                <span className="text-base text-emerald-700">
                  <MathView math="A_n = \left(\frac{3}{4}\right)^n" />
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                면적은 매번 1/4씩 빠져나가 점점 0에 가까워짐!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                합동인 4개의 삼각형 중 가운데 1개를 버리므로 남은 면적 비율은 <MathView math="\frac{3}{4}" />입니다.
                밑인 <MathView math="\frac{3}{4} < 1" />이므로 단계를 거듭할수록 남은 넓이는 <strong>0에 가까워집니다</strong>!
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-medium text-emerald-700">
                  n단계 넓이: <MathView math="\left(\frac{3}{4}\right)^n" />
                </div>
                <div className="text-slate-600">
                  "단계를 계속 반복할수록 전체 넓이가 점점 0에 가까워집니다."
                </div>
              </div>
            </div>

            {/* 4. 둘레의 거듭제곱: 3 * (3/2)^n */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:border-amber-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  둘레의 거듭제곱
                </span>
                <span className="text-base text-amber-700">
                  <MathView math="P_n = 3 \times \left(\frac{3}{2}\right)^n" />
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                안쪽 구멍 테두리가 생기며 둘레는 끝없이 길어짐!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                둘레는 (개수 <MathView math="3^n" />) × (길이 <MathView math="\left(\frac{1}{2}\right)^n" />) × 3 = <MathView math="3 \times \left(\frac{3}{2}\right)^n" /> 입니다.
                밑인 <MathView math="\frac{3}{2} = 1.5 > 1" />이므로 n이 커질수록 <strong>끝없이</strong> 길어집니다!
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-medium text-amber-700">
                  n단계 둘레: <MathView math="3 \times \left(\frac{3}{2}\right)^n" />
                </div>
                <div className="text-slate-600">
                  "넓이는 0에 가까워지는데 둘레는 끝없이 길어지는 프랙탈의 신비!"
                </div>
              </div>
            </div>
          </div>

          {/* Fractal Dimension (하우스도르프 차원) Deep Dive Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 sm:p-7 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-indigo-700/50">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  차원의 신비 (Fractal Dimension)
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold mt-1">
                  시어핀스키 삼각형은 몇 차원일까요?
                </h4>
              </div>
              <div className="bg-indigo-600/60 border border-indigo-400/40 px-4 py-2 rounded-xl text-center">
                <div className="text-[11px] text-indigo-200">하우스도르프 차원 D</div>
                <div className="text-lg sm:text-xl font-extrabold text-amber-300 mt-0.5">
                  <MathView math="D \approx 1.585" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 text-xs sm:text-sm">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <div className="text-indigo-400 font-bold mb-1">1차원 (선)</div>
                <p className="text-slate-300">
                  길이를 1/2로 줄이면 2개의 닮은 선분이 생깁니다: <br />
                  <span className="inline-block mt-1 text-indigo-300"><MathView math="2^1 = 2 \implies D = 1" /></span>
                </p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <div className="text-indigo-400 font-bold mb-1">2차원 (면)</div>
                <p className="text-slate-300">
                  정사각형 변을 1/2로 줄이면 4개의 작은 정사각형이 생깁니다: <br />
                  <span className="inline-block mt-1 text-indigo-300"><MathView math="2^2 = 4 \implies D = 2" /></span>
                </p>
              </div>

              <div className="bg-indigo-950 p-4 rounded-xl border border-amber-400/50 ring-1 ring-amber-400/30">
                <div className="text-amber-400 font-bold mb-1">시어핀스키 삼각형</div>
                <p className="text-slate-200">
                  길이를 1/2로 줄였더니 <strong>3개의 작은 삼각형</strong>이 생깁니다! <br />
                  <span className="inline-block mt-1 text-amber-300"><MathView math="2^D = 3 \implies D = \log_2 3 \approx 1.585" /></span>
                </p>
              </div>
            </div>

            <p className="text-xs text-indigo-200 mt-4 leading-relaxed">
              💡 선(1차원)보다는 복잡해서 둘레가 끝없이 길어지지만, 면(2차원)보다는 구멍이 많아서 넓이가 점점 0에 가까워집니다. 그래서 1과 2 사이의 분수(소수) 차원인 <strong>1.585차원</strong>을 가집니다!
            </p>
          </div>

          {/* Interactive Exponent Calculator for Middle School Students */}
          <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-600" />
                <h4 className="text-base font-bold text-slate-900">
                  지수(n) 직접 입력 계산기
                </h4>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-600">단계 n 선택 (0 ~ 10):</span>
                <select
                  value={calcN}
                  onChange={(e) => setCalcN(parseInt(e.target.value, 10))}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 font-mono font-bold text-indigo-700 cursor-pointer"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      n = {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calculated Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-600 font-semibold bg-slate-100/70">
                    <th className="py-2.5 px-3">항목</th>
                    <th className="py-2.5 px-3">수학 공식</th>
                    <th className="py-2.5 px-3">n = {calcN} 대입 값</th>
                    <th className="py-2.5 px-3">단계가 커질 때의 규칙</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-800">삼각형 개수</td>
                    <td className="py-2.5 px-3 text-indigo-600"><MathView math="3^n" /></td>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">
                      <MathView math={`3^{${calcN}} = ${Math.pow(3, calcN).toLocaleString()}`} /> 개
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">3의 n제곱으로 급증</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-800">한 변의 길이</td>
                    <td className="py-2.5 px-3 text-sky-600"><MathView math="\left(\frac{1}{2}\right)^n" /></td>
                    <td className="py-2.5 px-3 font-bold text-sky-700">
                      <MathView math={`\\frac{1}{${Math.pow(2, calcN).toLocaleString()}}`} /> ({(Math.pow(0.5, calcN)).toFixed(5)})
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">점점 0에 가까워짐</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-800">전체 면적 비율</td>
                    <td className="py-2.5 px-3 text-emerald-600"><MathView math="\left(\frac{3}{4}\right)^n" /></td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700">
                      {(Math.pow(0.75, calcN) * 100).toFixed(2)}%
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">점점 0에 가까워짐</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-800">전체 둘레 길이</td>
                    <td className="py-2.5 px-3 text-amber-600"><MathView math="3 \\times \\left(\\frac{3}{2}\\right)^n" /></td>
                    <td className="py-2.5 px-3 font-bold text-amber-700">
                      {(3 * Math.pow(1.5, calcN)).toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">끝없이 계속 길어짐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
