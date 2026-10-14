import React from 'react';
import { EducationLevel } from '../types';
import { GraduationCap, Sparkles, BookOpen, Layers, Dices, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ModeSelectionScreenProps {
  onSelectLevel: (level: EducationLevel) => void;
  onOpenChaosGame: () => void;
}

export const ModeSelectionScreen: React.FC<ModeSelectionScreenProps> = ({
  onSelectLevel,
  onOpenChaosGame,
}) => {
  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-16 px-4 space-y-12 animate-fadeIn">
      {/* Title & Introduction */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-extrabold shadow-2xs">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span>신비한 수학 기하학 탐험</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          시어핀스키 삼각형과<br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            프랙탈 탐구 여행
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          학습자의 눈높이에 맞춘 탐구 모드를 선택해주세요.<br className="hidden sm:inline" />
          직관적인 자연 관찰부터 수학 공식 증명까지 쉽고 재미있게 탐험할 수 있습니다.
        </p>
      </div>

      {/* 2 Big Mode Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {/* Elementary School Card */}
        <div
          onClick={() => onSelectLevel('elementary')}
          className="group relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 hover:border-emerald-500 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden transform hover:-translate-y-1"
        >
          {/* Top highlight glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-100 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

          <div className="relative space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-2xl shadow-xs group-hover:scale-110 transition-transform">
                🎒
              </div>
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                초등학생 추천
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 group-hover:text-emerald-700 transition-colors">
                초등학생 모드
              </h2>
              <p className="text-xs sm:text-sm text-emerald-800 font-bold mt-1">
                거듭제곱 없이 쉬운 숫자와 그림으로 만나는 프랙탈!
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              복잡한 지수 수식($3^n$) 대신 <strong>"1개 ➔ 3개 ➔ 9개 ➔ 27개 (3배씩 늘어남)"</strong> 규칙과
              알기 쉬운 분수로 삼각형의 개수, 둘레, 넓이를 관찰합니다.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>자연 속 사물 3가지 실사 사진(출처) & 대표 성질</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>0~6단계 큰 화면 인터랙티브 스튜디오 (번호표 지원)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>거듭제곱 없는 개수·둘레·넓이 실시간 정보</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>초등 눈높이 도전 퀴즈 & 1회 한정 보상 룰렛</span>
              </div>
            </div>
          </div>

          <div className="relative pt-6">
            <button
              type="button"
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm sm:text-base shadow-md shadow-emerald-200 flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:gap-3"
            >
              <span>초등학생 모드로 탐험하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle School Card */}
        <div
          onClick={() => onSelectLevel('middle')}
          className="group relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-200 hover:border-indigo-500 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden transform hover:-translate-y-1"
        >
          {/* Top highlight glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-100 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

          <div className="relative space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-2xl shadow-xs group-hover:scale-110 transition-transform">
                🎓
              </div>
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                중·고등학생 추천
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 group-hover:text-indigo-700 transition-colors">
                중학생 모드
              </h2>
              <p className="text-xs sm:text-sm text-indigo-800 font-bold mt-1">
                거듭제곱(3의 n제곱) 수식으로 탐구하는 기하학!
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>거듭제곱 표현($3^n$, $(3/2)^n$, $(3/4)^n$)</strong>을 사용하여
              단계별 삼각형의 개수(3의 n제곱), 둘레와 넓이의 거듭제곱 변화 규칙을 수식으로 탐구합니다.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>자연 속 사물 3가지 실사 사진(출처) & 대표 성질</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>0~6단계 큰 화면 인터랙티브 스튜디오</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>거듭제곱 공식 적용 개수·둘레·넓이 정보</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>중학교 수학 도전 퀴즈 & 1회 한정 보상 룰렛</span>
              </div>
            </div>
          </div>

          <div className="relative pt-6">
            <button
              type="button"
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-sm sm:text-base shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:gap-3"
            >
              <span>중학생 모드로 탐험하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sub Bar: Chaos Game Direct Entry */}
      <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Dices className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              카오스 게임(주사위로 점 찍기)만 바로 해보고 싶다면?
            </h4>
            <p className="text-[11px] text-slate-500">
              주사위를 무작위로 굴려 중점을 찍다 보면 마법처럼 삼각형이 나타납니다.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenChaosGame}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shrink-0 transition-colors cursor-pointer"
        >
          카오스 게임 열기
        </button>
      </div>
    </div>
  );
};
