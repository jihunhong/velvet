import { useEffect, useState } from 'react';

import { generateExpenseInsightsStream } from '../common/services/ai';
import type { Expense } from '../types/expense';

interface ExpenseInsightProps {
  expenses: Expense[];
}

export default function ExpenseInsight({ expenses }: ExpenseInsightProps) {
  const [insight, setInsight] = useState('');
  const [charQueue, setCharQueue] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [streamComplete, setStreamComplete] = useState(false);

  useEffect(() => {
    if (!expenses || expenses.length === 0) {
      setInsight('이번 달 소비 내역이 없습니다.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setInsight('');
    setCharQueue([]);
    setStreamComplete(false);

    generateExpenseInsightsStream(
      expenses,
      (chunk) => {
        setCharQueue((prev) => [...prev, ...chunk.split('')]);
      },
      () => {
        // onComplete
        setStreamComplete(true);
      },
      (err) => {
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      }
    );
  }, [expenses]);

  // 문자를 타이핑 효과로 보여주는 useEffect
  useEffect(() => {
    if (charQueue.length === 0) {
      if (streamComplete) {
        setIsLoading(false);
      }
      return;
    }

    const typingSpeed = 30; // ms
    const timer = setTimeout(() => {
      setInsight((prev) => prev + charQueue[0]);
      setCharQueue((prev) => prev.slice(1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charQueue, streamComplete]);

  if (isLoading && !insight) {
    return <span className="text-gray-500 text-sm font-medium animate-pulse">AI가 소비 내역을 분석 중입니다...</span>;
  }

  if (isError) {
    return <span className="text-red-500 text-sm font-medium">인사이트 생성 중 오류 발생</span>;
  }

  const highlightKeywords = (text: string) => {
    // 숫자가 포함된 구문을 더 넓게 매칭
    const regex = /(전월 대비 \d+% 증가|₩[\d,]+(?:에서 ₩[\d,]+로)?|평균 ₩[\d,]+|전체의 \d+%|증가|감소|가장|많은|적은|초과)/g;

    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="text-blue-700 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return <span className="text-gray-500 text-md line-clamp-2">{insight ? highlightKeywords(insight) : ''}</span>;
}
