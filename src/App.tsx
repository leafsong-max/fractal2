/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EducationLevel } from './types';
import { Header } from './components/Header';
import { ModeSelectionScreen } from './components/ModeSelectionScreen';
import { FractalIntro } from './components/FractalIntro';
import { SierpinskiCanvas } from './components/SierpinskiCanvas';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { ChaosGameModal } from './components/ChaosGameModal';
import { ResetModal } from './components/ResetModal';
import { ArrowLeft, Sparkles, Layers, GraduationCap } from 'lucide-react';

export default function App() {
  // Mode selection state: null means first landing mode selection screen
  const [level, setLevel] = useState<EducationLevel | null>(null);
  const [depth, setDepth] = useState<number>(3);
  const [isChaosOpen, setIsChaosOpen] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Full reset handler after entering password "1022"
  const handleResetAll = () => {
    setLevel(null); // Return to first mode selection landing screen
    setDepth(3);
    setIsChaosOpen(false);
    setResetKey((prev) => prev + 1);
    setToastMessage('✅ 초기화 완료! 처음 화면으로 안전하게 재설정되었습니다.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Sticky Top Header */}
      <Header
        level={level}
        setLevel={setLevel}
        onOpenChaosGame={() => setIsChaosOpen(true)}
        onOpenResetModal={() => setIsResetModalOpen(true)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          aria-label="알림 메시지"
          className="fixed top-20 right-4 z-50 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-fadeIn"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white cursor-pointer"
            aria-label="알림 닫기"
          >
            ✕
          </button>
        </aside>
      )}

      {/* Main Content */}
      <main key={resetKey} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
        {level === null ? (
          /* Step 1: First Landing Screen - Choose between Elementary & Middle School */
          <ModeSelectionScreen
            onSelectLevel={(selected) => {
              setLevel(selected);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenChaosGame={() => setIsChaosOpen(true)}
          />
        ) : (
          /* Step 2: Simplified Exploration Page (Natural Fractals -> Big Canvas Studio -> Quiz & Roulette) */
          <div className="space-y-10 animate-fadeIn">
            {/* Top Navigation & Mode Indicator Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLevel(null)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="첫 화면(모드 선택)으로 돌아가기"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>모드 다시 선택</span>
                </button>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black shadow-2xs ${
                      level === 'elementary'
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {level === 'elementary' ? '🎒 초등학생 탐구 모드' : '🎓 중학생 수학 모드'}
                  </span>
                  <span className="text-xs text-slate-500 hidden md:inline">
                    {level === 'elementary'
                      ? '(거듭제곱 없는 직관적 수치와 3배 규칙)'
                      : '(거듭제곱 3ⁿ 수식과 거듭제곱 규칙성)'}
                  </span>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="flex items-center gap-2 text-xs font-bold">
                <a
                  href="#section-nature"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  1. 자연 속 프랙탈
                </a>
                <a
                  href="#section-studio"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  2. 인터랙티브 스튜디오
                </a>
                <a
                  href="#section-quiz"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  3. 도전 퀴즈 & 룰렛
                </a>
              </div>
            </div>

            {/* 1. Nature Fractals Section (3 Real Photos with Source Attribution and Core Properties) */}
            <section id="section-nature" className="scroll-mt-24">
              <FractalIntro level={level} />
            </section>

            {/* 2. Big Screen Interactive Sierpinski Studio (0 ~ 6 Depth, Count, Perimeter, Area Stats) */}
            <section id="section-studio" className="scroll-mt-24">
              <SierpinskiCanvas
                level={level}
                depth={depth}
                setDepth={setDepth}
              />
            </section>

            {/* 3. Challenge Quiz & Single-Spin Roulette Reward */}
            <section id="section-quiz" className="scroll-mt-24">
              <InteractiveQuiz
                level={level}
                onNavigateToStudio={() => {
                  const el = document.getElementById('section-studio');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            시어핀스키 삼각형과 프랙탈 기하학 인터랙티브 학습 스튜디오
          </p>
          <p className="text-[11px] text-slate-400">
            초등학생 모드(거듭제곱 없는 직관적 탐구) & 중학생 모드(거듭제곱 공식 탐구) | 바츠와프 시어핀스키 (1915)
          </p>
        </div>
      </footer>

      {/* Chaos Game Modal */}
      <ChaosGameModal
        isOpen={isChaosOpen}
        onClose={() => setIsChaosOpen(false)}
        level={level || 'elementary'}
      />

      {/* Admin Protected Reset Modal (Password: 1022) */}
      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onResetConfirm={handleResetAll}
      />
    </div>
  );
}
