import React, { useState } from 'react';
import { EducationLevel } from '../types';
import { NATURE_FRACTALS } from '../data/fractalData';
import { Sparkles, Snowflake, Leaf, Zap, HelpCircle, Check, Info } from 'lucide-react';

interface FractalIntroProps {
  level: EducationLevel;
}

export const FractalIntro: React.FC<FractalIntroProps> = ({ level }) => {
  const [selectedFractal, setSelectedFractal] = useState(NATURE_FRACTALS[0]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-500" />;
      case 'Snowflake':
        return <Snowflake className="w-5 h-5 text-sky-500" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-teal-500" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-8 space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              프랙탈(Fractal)이란 무엇일까요?
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {level === 'elementary'
              ? '자연과 수학 속에 숨어있는 신비한 반복 무늬를 찾아보아요!'
              : '자기닮음(Self-Similarity)과 반복적 순환 구조로 정의되는 기하학의 세계'}
          </p>
        </div>
      </div>

      {/* Core Definition Cards according to Level */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">
            1
          </div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
            {level === 'elementary' ? '스스로를 닮은 "자기닮음"' : '자기닮음성 (Self-Similarity)'}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {level === 'elementary'
              ? '작은 조각을 돋보기로 들여다보아도 전체 모양과 똑같이 생겼어요. 거울 속에 거울이 끝없이 비치는 것과 같아요.'
              : '어떤 도형의 일부분을 확대했을 때 전체 도형과 통계적 또는 기하학적으로 합동이거나 닮음인 성질을 의미합니다.'}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm mb-3">
            2
          </div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
            {level === 'elementary' ? '단순한 규칙의 끝없는 반복' : '재귀적 생성 규칙 (Recursion)'}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {level === 'elementary'
              ? '"가운데 1개를 뺀다"라는 아주 단순한 규칙 하나를 계속 되풀이했을 뿐인데, 마법처럼 정교한 예술 작품이 탄생해요!'
              : '단순한 함수나 분할 알고리즘을 무한히 반복(Iteration)함으로써 복잡한 비선형적 패턴이 형성됩니다.'}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
            3
          </div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
            {level === 'elementary' ? '자연이 선택한 가장 똑똑한 모양' : '자연계의 최적화 구조'}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {level === 'elementary'
              ? '우리 몸속 혈관, 허파의 숨길, 나뭇가지, 눈꽃 등 자연의 모든 것은 가장 튼튼하고 효율적인 프랙탈로 만들어져 있어요!'
              : '적은 부피(면적) 안에 최대의 표면적과 둘레를 확보하여 물질과 에너지를 효율적으로 교환하기 위한 자연의 최적화입니다.'}
          </p>
        </div>
      </div>

      {/* Nature Fractals Interactive Selector */}
      <div className="pt-2">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>자연 속에서 만나는 프랙탈 친구들 (클릭해서 확인해보세요!)</span>
        </h4>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
          {NATURE_FRACTALS.map((frac) => (
            <button
              key={frac.id}
              type="button"
              onClick={() => setSelectedFractal(frac)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedFractal.id === frac.id
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                {getIcon(frac.iconName)}
                {selectedFractal.id === frac.id && (
                  <Check className="w-4 h-4 text-indigo-600" />
                )}
              </div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                {frac.koreanName}
              </div>
              <div className="text-[11px] text-slate-600 font-mono">
                {frac.name.split(' ')[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Fractal Detail View */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 flex flex-col md:flex-row gap-5 items-center">
          {/* Visual Badge Graphic */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 flex flex-col items-center justify-center text-white shrink-0 shadow-sm p-2 text-center">
            {getIcon(selectedFractal.iconName)}
            <span className="text-xs font-bold mt-2 text-indigo-200">
              {selectedFractal.koreanName.split(' ')[0]}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">자연의 프랙탈</span>
          </div>

          {/* Description */}
          <div className="space-y-2 flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h5 className="text-base sm:text-lg font-bold text-slate-900">
                {selectedFractal.koreanName}
              </h5>
              <span className="text-xs font-mono text-slate-600 hidden sm:inline">
                ({selectedFractal.name})
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {level === 'elementary'
                ? selectedFractal.descriptionElementary
                : selectedFractal.descriptionMiddle}
            </p>

            <div className="inline-flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50/80 px-3 py-1 rounded-lg border border-indigo-100 font-medium">
              <span>💡 발견 포인트:</span>
              <span>{selectedFractal.fact}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
