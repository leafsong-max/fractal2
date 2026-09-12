import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  display?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({
  math,
  display = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch {
      return math;
    }
  }, [math, display]);

  return (
    <span
      className={`inline-math ${display ? 'block text-center my-1' : 'inline-block align-middle'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
