import type { Budget } from '../../types/budget';
import type { Expense } from '../../types/expense';
import { budgetSystemPrompt } from '../constants/prompts/budgetPrompt';
import { expenseSystemPrompt } from '../constants/prompts/expensePrompt';
import { budgetSchema } from '../constants/schema/budgetSchema';

// LanguageModel API의 타입 정의 (window 객체에 추가)
declare global {
  interface Window {
    LanguageModel: {
      params: () => Promise<{
        available: 'no' | 'after-download' | 'readily';
        defaultTemperature: number;
        defaultTopK: number;
        maxTopK: number;
      }>;
      create: (options?: {
        initialPrompts?: { role: 'system' | 'user' | 'assistant'; content: string }[];
        temperature?: number;
        topK?: number;
        monitor?: (m: { addEventListener: (event: string, callback: (e: any) => void) => void }) => void;
      }) => Promise<{
        promptStreaming: (prompt: string) => AsyncIterable<string>;
        destroy: () => void;
      }>;
    };
  }
}

const createStreamingSession = async (systemPrompt: string) => {
  if (!window.LanguageModel) {
    throw new Error('내장 AI를 현재 브라우저에서 사용할 수 없습니다.');
  }
  const { available } = await window.LanguageModel.params();
  if (available === 'no') {
    throw new Error('AI 모델을 사용할 수 없습니다.');
  }
  if (available === 'after-download') {
    // TODO: 모델 다운로드 UI 처리
    console.log('AI 모델을 다운로드해야 사용 가능합니다.');
  }
  return window.LanguageModel.create({
    initialPrompts: [{ role: 'system', content: systemPrompt }],
  });
};

const executePrompt = async (
  session: any, // session 타입이 복잡하여 any로 처리
  promptData: object,
  onChunk: (chunk: string) => void,
  onComplete: (fullText: string) => void,
  schema: Record<string, any>
) => {
  const prompt = `
    Here is the data for analysis:
    - Currency: KRW (₩)
    - Today's Date: ${new Date().toISOString().split('T')[0]}
    - Data:
    \`\`\`json
    ${JSON.stringify(promptData, null, 2)}
    \`\`\`
  `;

  let fullText = '';
  const stream = session.promptStreaming(prompt, {
    responseConstraint: {
      schema,
    },
  });
  for await (const chunk of stream) {
    fullText += chunk;
    onChunk(chunk);
  }
  onComplete(fullText);
  session.destroy();
};

export const generateBudgetInsightsStream = async (
  expenses: Expense[],
  budgets: Budget[],
  onChunk: (chunk: string) => void,
  onComplete: (fullText: string) => void,
  onError: (error: Error) => void
) => {
  try {
    const session = await createStreamingSession(budgetSystemPrompt);
    const data = {
      budgets: budgets.map((b) => ({ category: b.category, amount: b.budget })),
      expenses: expenses.map((e) => ({
        category: e.category,
        amount: e.amount,
        date: e.date,
        description: e.description,
      })),
    };
    await executePrompt(session, data, onChunk, onComplete, budgetSchema);
  } catch (error: any) {
    console.error('AI 예산 인사이트 스트리밍 중 오류 발생:', error);
    onError(new Error('AI로부터 예산 인사이트를 생성하는 데 실패했습니다.'));
  }
};

export const generateExpenseInsightsStream = async (
  expenses: Expense[],
  onChunk: (chunk: string) => void,
  onComplete: (fullText: string) => void,
  onError: (error: Error) => void
) => {
  try {
    const session = await createStreamingSession(expenseSystemPrompt);
    const data = {
      expenses: expenses.map((e) => ({
        category: e.category,
        amount: e.amount,
        date: e.date,
        description: e.description,
      })),
    };
    await executePrompt(session, data, onChunk, onComplete, {});
  } catch (error: any) {
    console.error('AI 소비 인사이트 스트리밍 중 오류 발생:', error);
    onError(new Error('AI로부터 소비 인사이트를 생성하는 데 실패했습니다.'));
  }
};
