/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EducationLevel } from './types';
import { Header } from './components/Header';
import { SierpinskiCanvas } from './components/SierpinskiCanvas';
import { MathPrincipleGuide } from './components/MathPrincipleGuide';
import { FractalIntro } from './components/FractalIntro';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { ChaosGameModal } from './components/ChaosGameModal';
import { ResetModal } from './components/ResetModal';
import { MathView } from './components/MathView';
import {
  Sparkles,
  Dices,
  BookOpen,
  Layers,
  GraduationCap,
  ChevronUp,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Compass,
  Palette,
  RotateCcw
} from 'lucide-react';

export default function App() {
  const [level, setLevel] = useState<EducationLevel>('elementary');
  const [depth, setDepth] = useState<number>(3);
  const [activeSection, setActiveSection] = useState<string>('explore');
  const [isChaosOpen, setIsChaosOpen] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [viewModeTab, setViewModeTab] = useState<'all' | 'single'>('single');

  // Full reset handler after entering password "1022"
  const handleResetAll = () => {
    setLevel('elementary');
    setDepth(3);
    setActiveSection('explore');
    setIsChaosOpen(false);
    setResetKey((prev) => prev + 1);
    setToastMessage('✅ 초기화 완료! 모든 학습 진행 상황이 처음 상태로 안전하게 재설정되었습니다.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Navigation handler
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    if (viewModeTab === 'all') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const mainMenus = [
    {
      id: 'explore',
      title: '체험',
      subTitle: '시어핀스키 직접 그리기',
      desc: level === 'elementary'
        ? '깊이 0~6단계 조절, 삼각형 번호표(1, 2, 3...), 재생 애니메이션'
        : '깊이별 3ⁿ 개수, 분수 면적·둘레 공식, 다양한 뷰 모드',
      icon: Layers,
      color: 'from-indigo-500 to-indigo-600',
      tag: '인터랙티브 스튜디오',
      bgLight: 'hover:bg-indigo-50/50',
      borderActive: 'border-indigo-500 ring-2 ring-indigo-500/20',
    },
    {
      id: 'math-guide',
      title: '수학원리',
      subTitle: '단계별 애니메이션 & 공식',
      desc: level === 'elementary'
        ? '가운데 1개 빼내기 비유, 돋보기 10배 확대 자기닮음 실험실'
        : '밑이 3인 등비수열, 분수 극한 lim (3/4)ⁿ=0, 1.585차원 계산기',
      icon: BookOpen,
      color: 'from-sky-500 to-sky-600',
      tag: '원리 가이드',
      bgLight: 'hover:bg-sky-50/50',
      borderActive: 'border-sky-500 ring-2 ring-sky-500/20',
    },
    {
      id: 'nature',
      title: '자연속 프랙탈',
      subTitle: '생명과 자연 속 반복 무늬',
      desc: '로마네스코 브로콜리, 눈송이, 고사리, 번개에 숨은 자기닮음 갤러리',
      icon: Sparkles,
      color: 'from-emerald-500 to-emerald-600',
      tag: '자연 탐구',
      bgLight: 'hover:bg-emerald-50/50',
      borderActive: 'border-emerald-500 ring-2 ring-emerald-500/20',
    },
    {
      id: 'quiz',
      title: '퀴즈',
      subTitle: '도전 퀴즈 & 행운의 룰렛',
      desc: '프랙탈 1문제 + 시어핀스키 1문제 풀고 만점 시 회전 룰렛(3~6장 도움) 당첨!',
      icon: GraduationCap,
      color: 'from-amber-500 to-amber-600',
      tag: '도전 & 룰렛 보상',
      bgLight: 'hover:bg-amber-50/50',
      borderActive: 'border-amber-500 ring-2 ring-amber-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <Header
        level={level}
        setLevel={setLevel}
        activeSection={activeSection}
        setActiveSection={handleNavClick}
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
            className="ml-2 text-slate-400 hover:text-white"
            aria-label="알림 닫기"
          >
            ✕
          </button>
        </aside>
      )}

      {/* Main Container */}
      <main key={resetKey} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Requirement 3: Main Screen Education Level Selector (초등학생 vs 중학생) */}
        <section className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                맞춤형 학습 수준 설정
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                누구와 함께 프랙탈을 탐구하나요?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                원하는 학년을 선택하면 시각적 애니메이션과 교과서 수학 공식이 맞춤형으로 제공됩니다.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                id="btn-chaos-top"
                onClick={() => setIsChaosOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="점과 주사위 확률로 프랙탈이 만들어지는 신비한 카오스 게임"
              >
                <Dices className="w-4 h-4 text-purple-600" />
                <span>카오스 게임</span>
              </button>

              <button
                type="button"
                id="btn-reset-top"
                onClick={() => setIsResetModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="비밀번호(1022) 확인 후 전체 학습 진행 상황 초기화"
              >
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <span>초기화</span>
              </button>
            </div>
          </div>

          {/* Level Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Elementary School */}
            <button
              type="button"
              id="card-level-elementary"
              onClick={() => setLevel('elementary')}
              className={`text-left p-5 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                level === 'elementary'
                  ? 'bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl p-2 rounded-xl bg-white border border-amber-200/80 shadow-2xs">
                    🎒
                  </span>
                  <div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                      초등학교 눈높이
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-0.5">
                      초등학생 모드
                    </h3>
                  </div>
                </div>

                {level === 'elementary' && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 shadow-2xs">
                    <CheckCircle className="w-3.5 h-3.5" />
                    선택됨
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                색종이 접기와 가운데 삼각형 빼내기 비유, <strong>남아있는 삼각형 번호표(1, 2, 3...)</strong>를 직접 세어보며 자기닮음의 신비로움을 재미있게 체험해요!
              </p>

              <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-amber-900 font-semibold">
                <span>🎯 주요 특징: 직관적 애니메이션, 삼각형 번호표, 행운의 룰렛 도움 카드</span>
              </div>
            </button>

            {/* Card 2: Middle School */}
            <button
              type="button"
              id="card-level-middle"
              onClick={() => setLevel('middle')}
              className={`text-left p-5 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                level === 'middle'
                  ? 'bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/60 border-indigo-500 shadow-md ring-2 ring-indigo-500/30'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl p-2 rounded-xl bg-white border border-indigo-200/80 shadow-2xs">
                    📐
                  </span>
                  <div>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md">
                      중학교 수학교과서 연계
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-0.5">
                      중학생 모드
                    </h3>
                  </div>
                </div>

                {level === 'middle' && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-600 text-white shadow-2xs">
                    <CheckCircle className="w-3.5 h-3.5" />
                    선택됨
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                밑이 3인 등비수열 <MathView math="3^n" />, 한 변의 길이 <MathView math="\left(\frac{1}{2}\right)^n" />, 남은 면적 <MathView math="81 \times \left(\frac{3}{4}\right)^n" />, 그리고 1.585차원의 하우스도르프 차원을 수학교과서 LaTeX 공식으로 탐구해요!
              </p>

              <div className="mt-4 pt-3 border-t border-indigo-200/60 flex items-center justify-between text-xs text-indigo-900 font-semibold">
                <span>🔬 주요 특징: 거듭제곱 공식, 단계별 넓이비 계산, 1.585차원 계산기, 행운의 룰렛</span>
              </div>
            </button>
          </div>
        </section>

        {/* Requirement 4: 4 Core Main Menus (체험, 수학원리, 자연속 프랙탈, 퀴즈) */}
        <section className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🧭</span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  프랙탈 탐험 메인 메뉴
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                아래 메뉴 단추를 누르면 해당 학습 창이 즉시 열립니다.
              </p>
            </div>

            {/* View Mode Switcher (단독 창 보기 vs 전체 스크롤 보기) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setViewModeTab('single')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewModeTab === 'single'
                    ? 'bg-white text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                창 전환 보기
              </button>
              <button
                type="button"
                onClick={() => setViewModeTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewModeTab === 'all'
                    ? 'bg-white text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                전체 스크롤 보기
              </button>
            </div>
          </div>

          {/* 4 Menu Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {mainMenus.map((menu) => {
              const Icon = menu.icon;
              const isActive = activeSection === menu.id;

              return (
                <button
                  key={menu.id}
                  id={`btn-menu-${menu.id}`}
                  type="button"
                  onClick={() => handleNavClick(menu.id)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-full relative group ${
                    isActive
                      ? `bg-slate-900 text-white shadow-md ${menu.borderActive}`
                      : `bg-slate-50/70 border-slate-200 text-slate-800 ${menu.bgLight} hover:border-slate-300 hover:shadow-xs`
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-white text-slate-800 border border-slate-200'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-white/20 text-indigo-100'
                            : 'bg-white border border-slate-200 text-slate-600'
                        }`}
                      >
                        {menu.tag}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4
                        className={`text-base sm:text-lg font-black tracking-tight ${
                          isActive ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {menu.title}
                      </h4>
                      <div
                        className={`text-xs font-semibold ${
                          isActive ? 'text-indigo-200' : 'text-indigo-600'
                        }`}
                      >
                        {menu.subTitle}
                      </div>
                    </div>

                    <p
                      className={`text-xs mt-2 leading-relaxed line-clamp-2 ${
                        isActive ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {menu.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 flex items-center justify-between text-xs font-bold">
                    <span className={isActive ? 'text-amber-300' : 'text-slate-600 group-hover:text-slate-900'}>
                      {isActive ? '● 현재 열린 창' : '창 열기'}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        isActive ? 'text-amber-300' : 'text-slate-400'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Render Sections according to View Mode */}
        {viewModeTab === 'single' ? (
          /* SINGLE WINDOW MODE: Opens the selected menu window */
          <div className="space-y-8 animate-fadeIn">
            {activeSection === 'explore' && (
              <section id="explore">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      [체험] 시어핀스키 삼각형 인터랙티브 스튜디오
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    {level === 'elementary' ? '남은 삼각형 번호표를 켜고 세어보세요' : '깊이별 수식을 확인해보세요'}
                  </span>
                </div>

                <SierpinskiCanvas
                  level={level}
                  depth={depth}
                  setDepth={setDepth}
                />
              </section>
            )}

            {activeSection === 'math-guide' && (
              <section id="math-guide">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      [수학원리] {level === 'elementary' ? '애니메이션 원리 가이드' : '거듭제곱과 지수 법칙 분석'}
                    </h2>
                  </div>
                </div>

                <MathPrincipleGuide
                  level={level}
                  currentDepth={depth}
                  setDepth={setDepth}
                />
              </section>
            )}

            {activeSection === 'nature' && (
              <section id="nature">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      [자연속 프랙탈] 생명과 자연 속 반복 무늬 갤러리
                    </h2>
                  </div>
                </div>

                <FractalIntro level={level} />
              </section>
            )}

            {activeSection === 'quiz' && (
              <section id="quiz">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      [퀴즈] {level === 'elementary' ? '도전! 초등 프랙탈 퀴즈 & 룰렛' : '도전! 중학 거듭제곱 퀴즈 & 룰렛'}
                    </h2>
                  </div>
                </div>

                <InteractiveQuiz
                  level={level}
                  onNavigateToStudio={() => handleNavClick('explore')}
                />
              </section>
            )}
          </div>
        ) : (
          /* ALL SCROLL VIEW MODE: Shows all sections in sequence */
          <div className="space-y-12">
            {/* Section 1: Interactive Sierpinski Studio (체험) */}
            <section id="explore" className="scroll-mt-28">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    [체험] 시어핀스키 삼각형 인터랙티브 스튜디오
                  </h2>
                </div>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  {level === 'elementary' ? '남은 삼각형 번호표를 켜고 세어보세요' : '깊이별 수식을 확인해보세요'}
                </span>
              </div>

              <SierpinskiCanvas
                level={level}
                depth={depth}
                setDepth={setDepth}
              />
            </section>

            {/* Section 2: Animated Math Principle Guide (수학원리) */}
            <section id="math-guide" className="scroll-mt-28">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    [수학원리] {level === 'elementary' ? '애니메이션 원리 가이드' : '거듭제곱과 지수 법칙 분석'}
                  </h2>
                </div>
              </div>

              <MathPrincipleGuide
                level={level}
                currentDepth={depth}
                setDepth={setDepth}
              />
            </section>

            {/* Section 3: Nature Fractals (자연속 프랙탈) */}
            <section id="nature" className="scroll-mt-28">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    [자연속 프랙탈] 생명과 자연 속 반복 무늬 갤러리
                  </h2>
                </div>
              </div>

              <FractalIntro level={level} />
            </section>

            {/* Section 4: Interactive Quiz (퀴즈) */}
            <section id="quiz" className="scroll-mt-28">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    [퀴즈] {level === 'elementary' ? '도전! 초등 프랙탈 퀴즈 & 룰렛' : '도전! 중학 거듭제곱 퀴즈 & 룰렛'}
                  </h2>
                </div>
              </div>

              <InteractiveQuiz
                level={level}
                onNavigateToStudio={() => handleNavClick('explore')}
              />
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 space-y-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">프랙탈의 아름다움</span>
            <span className="text-slate-300">|</span>
            <span>초·중등 수학 교육용 인터랙티브 웹앱</span>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <span>체험</span>
            <span>•</span>
            <span>수학원리</span>
            <span>•</span>
            <span>자연속 프랙탈</span>
            <span>•</span>
            <span>도전 퀴즈 & 룰렛</span>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
          >
            <span>맨 위로</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* Chaos Game Modal */}
      <ChaosGameModal
        isOpen={isChaosOpen}
        onClose={() => setIsChaosOpen(false)}
        level={level}
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
