import React from 'react';
import { EducationLevel } from '../types';
import { Sparkles, Dices, ArrowRight, CheckCircle2, Calculator, Layers, Hash } from 'lucide-react';
import { MathView } from './MathView';

interface ModeSelectionScreenProps {
  onSelectLevel: (level: EducationLevel) => void;
  onOpenChaosGame: () => void;
}

export const ModeSelectionScreen: React.FC<ModeSelectionScreenProps> = ({
  onSelectLevel,
  onOpenChaosGame,
}) => {
  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-14 px-4 space-y-10 animate-fadeIn">
      {/* Title & Introduction */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
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
          단계(<MathView math="n" />)가 진행될 때 나타나는 삼각형의 개수, 둘레, 넓이의 변화를 명쾌한 수식과 함께 탐구합니다.
        </p>
      </div>

      {/* 2 Big Mode Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
        {/* Elementary School Card */}
        <div
          onClick={() => onSelectLevel('elementary')}
          className="group relative bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-200 hover:border-emerald-500 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden transform hover:-translate-y-1"
        >
          {/* Top highlight glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-100 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-13 h-13 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-2xl shadow-xs group-hover:scale-110 transition-transform">
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
                거듭제곱 없이 쉬운 숫자와 배수 규칙으로 만나는 기하학!
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              복잡한 지수 수식 없이, 가운데 역삼각형을 뺄 때 생기는 <strong>3배·1.5배·3/4배 규칙</strong>과 알기 쉬운 분수로 도형의 변화를 탐구합니다.
            </p>

            {/* Structured Formula/Pattern Box for Elementary */}
            <div className="bg-emerald-50/90 rounded-2xl p-3.5 border border-emerald-200/90 space-y-2">
              <div className="text-[11px] font-extrabold text-emerald-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-emerald-600" />
                  단계별 수치 변화 규칙 (0단계 ~ 3단계)
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-md">
                  직관적 규칙
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-emerald-100/80 shadow-2xs">
                  <span className="text-slate-600 font-semibold">삼각형 개수</span>
                  <div className="text-right">
                    <span className="font-bold text-emerald-800 font-mono">1 → 3 → 9 → 27개</span>
                    <span className="text-[11px] text-emerald-600 ml-1.5 font-bold">(매 단계 3배씩)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-emerald-100/80 shadow-2xs">
                  <span className="text-slate-600 font-semibold">삼각형 둘레</span>
                  <div className="text-right">
                    <span className="font-bold text-emerald-800 font-mono">3 → 4.5 → 6.75</span>
                    <span className="text-[11px] text-emerald-600 ml-1.5 font-bold">(매 단계 1.5배씩)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-emerald-100/80 shadow-2xs">
                  <span className="text-slate-600 font-semibold">삼각형 넓이</span>
                  <div className="text-right">
                    <span className="font-bold text-emerald-800 font-mono">1 → 3/4 → 9/16</span>
                    <span className="text-[11px] text-emerald-600 ml-1.5 font-bold">(3/4씩 남음)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700 font-medium">
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
                <span>초등 눈높이 도전 퀴즈 & 1회 한정 도움 룰렛</span>
              </div>
            </div>
          </div>

          <div className="relative pt-5">
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
          className="group relative bg-white rounded-3xl p-6 sm:p-7 border-2 border-indigo-200 hover:border-indigo-500 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden transform hover:-translate-y-1"
        >
          {/* Top highlight glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-100 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-13 h-13 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-2xl shadow-xs group-hover:scale-110 transition-transform">
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
                거듭제곱 수식(3의 n제곱)으로 명쾌하게 정리하는 기하학!
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              단계(<MathView math="n" />)가 진행될 때의 규칙을 <strong>거듭제곱 수식</strong>으로 표현하여,
              도형의 개수, 둘레, 넓이의 변화를 수학적으로 깔끔하게 탐구합니다.
            </p>

            {/* Structured Formula Box for Middle School */}
            <div className="bg-indigo-50/90 rounded-2xl p-3.5 border border-indigo-200/90 space-y-2">
              <div className="text-[11px] font-extrabold text-indigo-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-indigo-600" />
                  n단계 핵심 거듭제곱 수식
                </span>
                <span className="text-[10px] text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded-md">
                  수식 정리
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-indigo-100/80 shadow-2xs">
                  <span className="text-slate-600 font-semibold">삼각형 개수</span>
                  <div className="text-right flex items-center gap-1.5">
                    <span className="font-bold text-indigo-900">
                      <MathView math="N_n = 3^n" />
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">(3의 n제곱)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-indigo-100/80 shadow-2xs">
                  <span className="text-slate-600 font-semibold">삼각형 둘레</span>
                  <div className="text-right flex items-center gap-1.5">
                    <span className="font-bold text-indigo-900">
                      <MathView math="L_n = 3 \times \left(\frac{3}{2}\right)^n" />
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">(1.5배씩)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-indigo-100/80 shadow-2xs">
                  <span className="text-slate-600 font-semibold">삼각형 넓이</span>
                  <div className="text-right flex items-center gap-1.5">
                    <span className="font-bold text-indigo-900">
                      <MathView math="S_n = 1 \times \left(\frac{3}{4}\right)^n" />
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">(0.75배씩)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700 font-medium">
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
                <span>중학교 수학 도전 퀴즈(재도전 지원) & 1회 도움 룰렛</span>
              </div>
            </div>
          </div>

          <div className="relative pt-5">
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

      {/* Math Formula Comparison Summary Table */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                수식으로 한눈에 정리하는 시어핀스키 삼각형 규칙
              </h3>
              <p className="text-xs text-slate-500">
                초등 직관 규칙과 중등 거듭제곱 수식의 명확한 대응표
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full self-start sm:self-auto">
            단계별 (<MathView math="n = 0, 1, 2, \dots" />) 수식 비교
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[580px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50/80">
                <th className="py-2.5 px-3">구분</th>
                <th className="py-2.5 px-3">초기값 (<MathView math="n=0" />)</th>
                <th className="py-2.5 px-3">중학생 거듭제곱 수식 (<MathView math="n" />단계)</th>
                <th className="py-2.5 px-3">단계별 변화 규칙</th>
                <th className="py-2.5 px-3">초등학생 직관 표현</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  삼각형 개수 (<MathView math="N_n" />)
                </td>
                <td className="py-3 px-3 font-semibold text-slate-600">1개</td>
                <td className="py-3 px-3 font-bold text-indigo-700">
                  <MathView math="N_n = 3^n" />
                  <span className="text-[11px] text-slate-500 font-normal ml-1.5">(3의 n제곱)</span>
                </td>
                <td className="py-3 px-3 text-emerald-700 font-medium">매 단계 3배씩 증가 (<MathView math="\times 3" />)</td>
                <td className="py-3 px-3 font-mono text-slate-600">1 → 3 → 9 → 27개</td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  삼각형 둘레 (<MathView math="L_n" />)
                </td>
                <td className="py-3 px-3 font-semibold text-slate-600">3 (한 변 1 × 3)</td>
                <td className="py-3 px-3 font-bold text-indigo-700">
                  <MathView math="L_n = 3 \times \left(\frac{3}{2}\right)^n" />
                </td>
                <td className="py-3 px-3 text-emerald-700 font-medium">매 단계 1.5배씩 증가 (<MathView math="\times \frac{3}{2}" />)</td>
                <td className="py-3 px-3 font-mono text-slate-600">3 → 4.5 → 6.75 → …</td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  삼각형 넓이 (<MathView math="S_n" />)
                </td>
                <td className="py-3 px-3 font-semibold text-slate-600">1 (기준 넓이)</td>
                <td className="py-3 px-3 font-bold text-indigo-700">
                  <MathView math="S_n = 1 \times \left(\frac{3}{4}\right)^n" />
                </td>
                <td className="py-3 px-3 text-amber-700 font-medium">매 단계 0.75배로 감소 (<MathView math="\times \frac{3}{4}" />)</td>
                <td className="py-3 px-3 font-mono text-slate-600">1 → 3/4 → 9/16 → …</td>
              </tr>
            </tbody>
          </table>
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

