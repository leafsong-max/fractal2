import React, { useState, useEffect } from 'react';
import { EducationLevel } from '../types';
import { QUIZ_QUESTIONS } from '../data/fractalData';
import { MathView } from './MathView';
import { RouletteWheel } from './RouletteWheel';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface InteractiveQuizProps {
  level: EducationLevel;
  onNavigateToStudio?: () => void;
}

function renderMathText(text: string) {
  if (!text || !text.includes('$')) {
    return text;
  }
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          return <MathView key={index} math={math} />;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ level, onNavigateToStudio }) => {
  const questions = QUIZ_QUESTIONS.filter((q) => q.level === level);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [showHint, setShowHint] = useState<{ [qId: number]: boolean }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Reset quiz state when level changes
  useEffect(() => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowHint({});
    setIsCompleted(false);
  }, [level]);

  const currentQ = questions[currentIdx] || questions[0];
  const selectedAnswer = currentQ ? selectedAnswers[currentQ.id] : undefined;
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect = isAnswered && selectedAnswer === currentQ.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: idx,
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowHint({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  const handleRetryCurrent = () => {
    setSelectedAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentQ.id];
      return updated;
    });
  };

  // Score calculation
  const score = Object.entries(selectedAnswers).reduce((acc, [qId, ans]) => {
    const q = questions.find((item) => item.id === Number(qId));
    if (q && q.correctIndex === ans) return acc + 1;
    return acc;
  }, 0);

  const isAllCorrect = score === questions.length;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {level === 'elementary'
                ? '도전! 초등 프랙탈 & 시어핀스키 퀴즈'
                : '도전! 중학 프랙탈 & 시어핀스키 거듭제곱 퀴즈'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            프랙탈 1문제 + 시어핀스키 1문제를 풀고 만점을 받으면 <strong>행운의 회전 룰렛</strong>이 열립니다!
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>
              문제: {Math.min(currentIdx + 1, questions.length)} / {questions.length} (총 2문제)
            </span>
          </div>

          {(currentIdx > 0 || isAnswered) && (
            <button
              type="button"
              id="btn-quiz-restart"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              title="문제를 처음(1번)부터 다시 시작합니다"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
              <span>처음부터 재도전</span>
            </button>
          )}
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Question Card */}
          <div className="bg-slate-50/90 rounded-2xl p-5 sm:p-6 border border-slate-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white">
                  문제 {currentIdx + 1}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  {currentQ.category === 'fractal' ? '🌀 프랙탈 개념' : '🔺 시어핀스키 규칙'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isAnswered && (
                  <button
                    type="button"
                    id="btn-retry-top"
                    onClick={handleRetryCurrent}
                    className="text-xs bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                    title="현재 문제를 다시 풉니다"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
                    <span>이 문제 재도전</span>
                  </button>
                )}

                {/* Hint Toggle */}
                <button
                  type="button"
                  onClick={() =>
                    setShowHint((prev) => ({
                      ...prev,
                      [currentQ.id]: !prev[currentQ.id],
                    }))
                  }
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint[currentQ.id] ? '힌트 닫기' : '힌트 보기'}</span>
                </button>
              </div>
            </div>

            {/* Hint Box */}
            {showHint[currentQ.id] && (
              <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 animate-fadeIn">
                💡 <strong>힌트:</strong> {renderMathText(currentQ.hint)}
              </div>
            )}

            {/* Question Text */}
            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-6">
              {renderMathText(currentQ.question)}
            </h4>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isThisSelected = selectedAnswer === optIdx;
                const isThisCorrect = optIdx === currentQ.correctIndex;

                let btnStyle =
                  'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-100/60 text-slate-800';

                if (isAnswered) {
                  if (isThisCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isThisSelected) {
                    btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                  } else {
                    btnStyle = 'bg-white border-slate-200 opacity-50 text-slate-400';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between text-xs sm:text-sm cursor-pointer ${btnStyle}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0 text-slate-600">
                        {optIdx + 1}
                      </span>
                      <span className="inline-flex items-center flex-wrap gap-1">
                        {renderMathText(opt)}
                      </span>
                    </span>

                    {isAnswered && (
                      <span>
                        {isThisCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : isThisSelected ? (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        ) : null}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Answer Explanation & Next Button */}
          {isAnswered && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border animate-fadeIn flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isCorrect
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/80 border-amber-200 text-amber-950'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  {isCorrect ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      정답입니다! 완벽해요!
                    </span>
                  ) : (
                    <span className="text-rose-700 flex items-center gap-1">
                      아쉬워요! 다음 단계로 넘어가거나 설명을 확인해 보세요.
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {renderMathText(currentQ.explanation)}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto flex-wrap">
                <button
                  type="button"
                  id="btn-retry-bottom"
                  onClick={handleRetryCurrent}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer"
                  title="현재 문제를 다시 풉니다"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                  <span>재도전</span>
                </button>

                <button
                  type="button"
                  id="btn-next-question"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shrink-0 transition-colors shadow-xs cursor-pointer"
                >
                  <span>{currentIdx < questions.length - 1 ? '다음 문제' : '결과 확인 & 룰렛 🏆'}</span>
                  {currentIdx < questions.length - 1 && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Completed Result Section */
        <div className="space-y-6">
          <div className="p-6 sm:p-8 bg-gradient-to-br from-indigo-50 via-white to-amber-50 rounded-2xl border border-indigo-100 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8" />
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-slate-900">
              {isAllCorrect
                ? '축하합니다! 2문제를 모두 맞혔습니다! 🎓'
                : '아쉬워요! 2문제 중 1문제를 더 맞춰보세요! 🌟'}
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              총 {questions.length}문제 중{' '}
              <strong className="text-indigo-600 font-bold text-base">{score}문제</strong>를 맞혔습니다.
              {isAllCorrect ? (
                <span>
                  {' '}모든 문제를 완벽하게 맞혔으므로 아래 <strong>원형 회전 룰렛</strong>을 돌려
                  도움 카드(3장, 4장, 5장, 6장) 보상을 받을 수 있습니다!
                </span>
              ) : (
                <span>
                  {' '}룰렛을 돌리려면 2문제를 모두 맞혀야 합니다. 다시 풀기를 눌러 만점에 도전해보세요!
                </span>
              )}
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>퀴즈 다시 풀기</span>
              </button>

              {onNavigateToStudio && (
                <button
                  type="button"
                  onClick={onNavigateToStudio}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer"
                >
                  <span>직접 그리기 체험으로 이동</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Requirement 8: When all 2 questions are correct, reveal the interactive spinning roulette wheel! */}
          {isAllCorrect && (
            <div className="animate-fadeIn">
              <RouletteWheel level={level} />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

