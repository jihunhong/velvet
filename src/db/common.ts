export const DB_NAME = 'velvet-db';
export const DB_VERSION = 1;

export function withErrorHandler<T extends (...args: any[]) => Promise<any>>(fn: T, name?: string): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (error) {
      const functionName = name || fn.name || 'anonymous';
      console.error(`Error in ${functionName}:`, error);
      throw error;
    }
  }) as T;
}
