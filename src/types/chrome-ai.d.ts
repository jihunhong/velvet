declare global {
  interface Window {
    ai?: {
      canCreateGenericSession(): Promise<'readily' | 'after-download' | 'no'>;
      createGenericSession(): Promise<AIGenericSession>;
    };
  }

  interface AIGenericSession {
    prompt(prompt: string): Promise<string>;
    promptStreaming(prompt: string): Promise<ReadableStream<string>>;
    destroy(): void;
  }
}

// 이 파일이 모듈로 인식되도록 빈 export를 추가합니다.
export {};
