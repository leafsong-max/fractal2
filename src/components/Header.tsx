import React from 'react';
import { EducationLevel } from '../types';
import { GraduationCap, Sparkles, BookOpen, Compass, Gamepad2, Layers, RotateCcw } from 'lucide-react';

interface HeaderProps {
  level: EducationLevel;
  setLevel: (level: EducationLevel) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onOpenChaosGame: () => void;
  onOpenResetModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  level,
  setLevel,
  activeSection,
  setActiveSection,
  onOpenChaosGame,
  onOpenResetModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-600 text-white flex items-center justify-center shadow-md shadow-indigo-100">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
                <polygon points="12,2 22,20 2,20" fill="currentColor" fillOpacity="0.3" />
                <polygon points="12,2 17,11 7,11" fill="currentColor" />
                <polygon points="7,11 12,20 2,20" fill="currentColor" />
                <polygon points="17,11 22,20 12,20" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  프랙탈의 아름다움
                </h1>
                <span className="hidden md:inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  시어핀스키 삼각형
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                신비한 자기닮음과 수학의 규칙을 직접 관찰하고 발견해요
              </p>
            </div>
          </div>

          {/* Level Switcher (초등학생 vs 중학생) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner" role="group" aria-label="교육 수준 선택">
              <button
                id="btn-elementary-level"
                type="button"
                onClick={() => setLevel('elementary')}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  level === 'elementary'
                    ? 'bg-amber-400 text-slate-900 shadow-xs font-bold ring-1 ring-amber-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span className="text-base leading-none">🎒</span>
                <span>초등학생 모드</span>
              </button>

              <button
                id="btn-middle-level"
                type="button"
                onClick={() => setLevel('middle')}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  level === 'middle'
                    ? 'bg-indigo-600 text-white shadow-xs font-bold ring-1 ring-indigo-700/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span className="text-base leading-none">📐</span>
                <span>중학생 모드</span>
              </button>
            </div>

            {/* Bonus: Chaos Game Button */}
            <button
              id="btn-open-chaos-game"
              type="button"
              onClick={onOpenChaosGame}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-gradient-to-r from-violet-50 to-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors shadow-2xs cursor-pointer"
              title="주사위를 굴려 점으로 시어핀스키 삼각형을 만드는 카오스 게임"
            >
              <Gamepad2 className="w-4 h-4 text-purple-600" />
              <span className="hidden sm:inline">카오스 게임</span>
            </button>

            {/* Reset Button (Password: 1022) */}
            <button
              id="btn-open-reset-modal"
              type="button"
              onClick={onOpenResetModal}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors shadow-2xs cursor-pointer"
              title="비밀번호(1022) 확인 후 전체 학습 진행 상황 초기화"
            >
              <RotateCcw className="w-4 h-4 text-rose-600" />
              <span>초기화</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-t border-slate-100 py-1.5 overflow-x-auto no-scrollbar text-xs sm:text-sm">
          <div className="flex items-center gap-1 sm:gap-2 min-w-max">
            <button
              id="nav-tab-explore"
              type="button"
              onClick={() => setActiveSection('explore')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeSection === 'explore'
                  ? 'bg-slate-900 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>직접 그리기 (체험)</span>
            </button>

            <button
              id="nav-tab-math-guide"
              type="button"
              onClick={() => setActiveSection('math-guide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeSection === 'math-guide'
                  ? 'bg-slate-900 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>
                {level === 'elementary' ? '원리 만화 가이드' : '거듭제곱 수학 원리'}
              </span>
            </button>

            <button
              id="nav-tab-nature"
              type="button"
              onClick={() => setActiveSection('nature')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeSection === 'nature'
                  ? 'bg-slate-900 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>자연 속 프랙탈</span>
            </button>

            <button
              id="nav-tab-quiz"
              type="button"
              onClick={() => setActiveSection('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeSection === 'quiz'
                  ? 'bg-slate-900 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>도전 퀴즈</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{level === 'elementary' ? '🌱 쉽게 이해하는 눈높이 설명' : '🔬 수식과 거듭제곱 공식 모드'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
