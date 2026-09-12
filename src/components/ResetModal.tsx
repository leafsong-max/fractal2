import React, { useState, useEffect, useRef } from 'react';
import { Lock, RotateCcw, X, ShieldAlert, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetConfirm: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onResetConfirm,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setErrorMessage('');
      setIsSuccess(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setErrorMessage('비밀번호 4자리를 입력해주세요.');
      inputRef.current?.focus();
      return;
    }

    if (password === '1022') {
      setIsSuccess(true);
      setErrorMessage('');
      setTimeout(() => {
        onResetConfirm();
        onClose();
      }, 700);
    } else {
      setErrorMessage('비밀번호가 올바르지 않습니다. 다시 입력해주세요.');
      setPassword('');
      inputRef.current?.focus();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden relative animate-scaleUp">
        {/* Top Accent Line */}
        <div className="h-2 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-7 space-y-5">
          {/* Header Icon & Title */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0 shadow-xs">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-rose-600 tracking-wider uppercase">
                관리자 인증 필요
              </span>
              <h3 id="reset-modal-title" className="text-xl font-black text-slate-900 mt-0.5">
                애플리케이션 전체 초기화
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                퀴즈 진행 상황, 룰렛 보상, 시뮬레이션 설정이 모두 처음 상태로 돌아갑니다.
              </p>
            </div>
          </div>

          {/* Warning Notice Box */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">함부로 초기화되는 것을 방지합니다.</p>
              <p className="text-amber-800 text-[11px] mt-0.5">
                지정된 관리자 비밀번호를 입력하셔야 초기화가 실행됩니다.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password-input"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                비밀번호 입력
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  ref={inputRef}
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  inputMode="numeric"
                  maxLength={10}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="관리자 비밀번호 입력"
                  disabled={isSuccess}
                  className={`w-full pl-10 pr-10 py-3 text-sm rounded-xl border transition-all font-mono tracking-widest ${
                    errorMessage
                      ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/50 text-rose-900'
                      : isSuccess
                      ? 'border-emerald-500 ring-2 ring-emerald-200 bg-emerald-50/50 text-emerald-900'
                      : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center gap-1 animate-fadeIn">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errorMessage}
                </p>
              )}

              {/* Success Message */}
              {isSuccess && (
                <p className="text-xs text-emerald-600 font-bold mt-1.5 flex items-center gap-1 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  비밀번호가 확인되었습니다. 초기화 중...
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSuccess}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSuccess}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-200 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4" />
                <span>초기화 실행</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
