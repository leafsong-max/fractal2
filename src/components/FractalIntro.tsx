import React, { useState } from 'react';
import { EducationLevel } from '../types';
import { NATURE_FRACTALS } from '../data/fractalData';
import { Sparkles, Snowflake, Leaf, CheckCircle2, ExternalLink, ZoomIn } from 'lucide-react';

interface FractalIntroProps {
  level: EducationLevel;
}

export const FractalIntro: React.FC<FractalIntroProps> = ({ level }) => {
  const [activeId, setActiveId] = useState<string>(NATURE_FRACTALS[0].id);
  const [modalImage, setModalImage] = useState<{ url: string; title: string; source: string } | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-500" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-teal-500" />;
      case 'Snowflake':
        return <Snowflake className="w-5 h-5 text-sky-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <section className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 sm:p-8 space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              자연 속 프랙탈(Fractal) 탐구실
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {level === 'elementary'
              ? '자연 속 3가지 신비한 사물 사진을 보며 프랙탈의 대표적인 성질을 찾아보아요!'
              : '자연계에 존재하는 3가지 프랙탈 구조의 실사 사진과 기하학적 대표 성질 분석'}
          </p>
        </div>

        <span className="self-start sm:self-auto text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>자연의 3가지 대표 예시</span>
        </span>
      </div>

      {/* 3 Natural Fractal Cards with Real Photos & Sources & Properties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {NATURE_FRACTALS.slice(0, 3).map((item) => {
          const isActive = activeId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`rounded-2xl border overflow-hidden transition-all flex flex-col bg-slate-50/50 cursor-pointer ${
                isActive
                  ? 'border-emerald-500 ring-2 ring-emerald-400/30 shadow-md bg-white'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Photo Area with Source Attribution */}
              <div className="relative aspect-4/3 w-full bg-slate-800 overflow-hidden group">
                <img
                  src={item.imageUrl}
                  alt={item.koreanName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Magnify Preview Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalImage({ url: item.imageUrl, title: item.koreanName, source: item.imageSource });
                  }}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-xs transition-colors cursor-pointer"
                  title="사진 크게 보기"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* Badge on Photo */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded-md bg-white/20 backdrop-blur-xs">
                      {getIcon(item.iconName)}
                    </span>
                    <span className="font-extrabold text-sm sm:text-base drop-shadow-xs">
                      {item.koreanName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Source Tag below photo */}
              <div className="px-3.5 py-1.5 bg-slate-100/90 border-b border-slate-200/80 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                <span>{item.imageSource}</span>
                <span className="text-[10px] text-emerald-600 font-sans font-semibold">실사 사진</span>
              </div>

              {/* Content Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                {/* Core Property Card */}
                <div className="rounded-xl bg-emerald-50/80 border border-emerald-200/80 p-3 text-xs">
                  <div className="font-black text-emerald-900 flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item.propertyTitle}</span>
                  </div>
                  <p className="text-emerald-950 text-[11px] leading-relaxed">
                    {item.propertyDesc}
                  </p>
                </div>

                {/* Level-specific description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {level === 'elementary' ? item.descriptionElementary : item.descriptionMiddle}
                </p>

                {/* Discovery Fact Footer */}
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-start gap-1">
                  <span className="font-bold text-slate-700 shrink-0">💡 꿀팁:</span>
                  <span>{item.fact}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3 Core Properties Summary Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-emerald-50/70 border border-slate-200 p-4 sm:p-5">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>프랙탈이 가진 3가지 대표적인 성질 한눈에 정리</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white rounded-xl p-3 border border-slate-200/70 shadow-2xs">
            <span className="font-extrabold text-indigo-700 block mb-0.5">1. 자기닮음 (Self-Similarity)</span>
            <p className="text-slate-600 text-[11px]">작은 조각을 아무리 확대해도 전체 모습과 똑같이 생겼어요.</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-200/70 shadow-2xs">
            <span className="font-extrabold text-teal-700 block mb-0.5">2. 규칙의 반복 (Recursion)</span>
            <p className="text-slate-600 text-[11px]">단순한 나눔 규칙 하나를 끝없이 되풀이하여 만듭니다.</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-200/70 shadow-2xs">
            <span className="font-extrabold text-sky-700 block mb-0.5">3. 자연의 최적화 (Efficiency)</span>
            <p className="text-slate-600 text-[11px]">작은 부피 안에 최대의 둘레와 표면적을 확보하여 생명을 지켜요.</p>
          </div>
        </div>
      </div>

      {/* Modal for full photo viewing */}
      {modalImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn cursor-pointer"
          onClick={() => setModalImage(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-700 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-4/3 w-full bg-black">
              <img
                src={modalImage.url}
                alt={modalImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 sm:p-5 flex items-center justify-between bg-slate-900 text-white">
              <div>
                <h5 className="font-bold text-base">{modalImage.title}</h5>
                <p className="text-xs text-slate-400 mt-0.5">{modalImage.source}</p>
              </div>
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
