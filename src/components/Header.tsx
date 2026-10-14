import React from 'react';
import { EducationLevel } from '../types';
import { GraduationCap, Sparkles, Gamepad2, RotateCcw, ArrowLeft, Home } from 'lucide-react';

interface HeaderProps {
  level: EducationLevel | null;
  setLevel: (level: EducationLevel | null) => void;
  onOpenChaosGame: () => void;
  onOpenResetModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  level,
  setLevel,
  onOpenChaosGame,
  onOpenResetModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Logo & Title */}
          <div
            onClick={() => setLevel(null)}
            className="flex items-center gap-3 cursor-pointer group"
            title="첫 화면(모드 선택)으로 가기"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-600 text-white flex items-center justify-center shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
                <polygon points="12,2 22,20 2,20" fill="currentColor" fillOpacity="0.3" />
                <polygon points="12,2 17,11 7,11" fill="currentColor" />
                <polygon points="7,11 12,20 2,20" fill="currentColor" />
                <polygon points="17,11 22,20 12,20" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  시어핀스키 삼각형
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 hidden sm:inline">
                  프랙탈 탐구
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                자연 속 사물 관찰과 수학적 규칙의 발견
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* If a level is selected: show current level badge and switch button */}
            {level ? (
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black shadow-xs ${
                    level === 'elementary'
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  <span className="text-sm">{level === 'elementary' ? '🎒' : '🎓'}</span>
                  <span>{level === 'elementary' ? '초등학생 모드' : '중학생 모드'}</span>
                </div>

                {/* Switch to the other level quickly */}
                <button
                  type="button"
                  onClick={() => setLevel(level === 'elementary' ? 'middle' : 'elementary')}
                  className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors font-bold cursor-pointer"
                  title={level === 'elementary' ? '중학생 모드로 전환' : '초등학생 모드로 전환'}
                >
                  {level === 'elementary' ? '중등 모드로 변경' : '초등 모드로 변경'}
                </button>

                {/* Back to Home Mode Select */}
                <button
                  type="button"
                  onClick={() => setLevel(null)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg transition-colors cursor-pointer"
                  title="첫 모드 선택 화면으로 돌아가기"
                >
                  <Home className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-xs font-bold text-slate-500 hidden sm:flex items-center gap-1">
                <span>모드를 선택해주세요</span>
              </div>
            )}

            {/* Chaos Game Button */}
            <button
              id="btn-open-chaos-game"
              type="button"
              onClick={onOpenChaosGame}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-violet-50 to-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors shadow-2xs cursor-pointer"
              title="주사위를 굴려 점으로 시어핀스키 삼각형을 만드는 카오스 게임"
            >
              <Gamepad2 className="w-4 h-4 text-purple-600" />
              <span className="hidden sm:inline">카오스 게임</span>
            </button>

            {/* Reset Button (Protected by password 1022) */}
            <button
              id="btn-open-reset-modal"
              type="button"
              onClick={onOpenResetModal}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors shadow-2xs cursor-pointer"
              title="관리자 비밀번호 확인 후 전체 학습 진행 상황 초기화"
            >
              <RotateCcw className="w-4 h-4 text-rose-600" />
              <span>초기화</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
