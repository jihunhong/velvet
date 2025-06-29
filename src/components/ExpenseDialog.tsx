import { withTimestamps } from '@/common/utils/timestamp';
import { getBudgetMapByCategory } from '@/db/budgetDB';
import { Budget } from '@/types/budget';
import { Category } from '@/types/category';
import { ExpenseFormData } from '@/types/expense';
import { expenseFormSchema, ExpenseFormValues } from '@/zod/form/expenseForm.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Maximize2, X } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getCategoryMap } from '../db/categoryDB';
import CommonInput from './CommonInput';
import Logo from './Logo';

interface ExpenseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: ExpenseFormData) => void;
}

const ExpenseDialog = ({ isOpen, onClose, onSave }: ExpenseDialogProps) => {
  const { data: categoryMap } = useQuery<Record<number, Category>>({
    queryKey: ['getCategoryMap'],
    queryFn: getCategoryMap,
  });

  const { data: budgetMap } = useQuery<Map<number, Budget[]>>({
    queryKey: ['getBudgetMapByCategory'],
    queryFn: getBudgetMapByCategory,
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues & { budgets?: Budget[] }>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      description: '',
      amount: '',
      category: undefined as unknown as number,
      date: new Date().toISOString().split('T')[0],
      isHidden: false,
      budgets: [],
    },
  });

  const selectedCategoryId = watch('category');

  const availableBudgets = useMemo(() => {
    if (!budgetMap || !selectedCategoryId) return [];
    return budgetMap.get(Number(selectedCategoryId)) ?? [];
  }, [budgetMap, selectedCategoryId]);

  const descriptionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        descriptionRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const onSubmit = (data: ExpenseFormValues & { budgets?: Budget[] }) => {
    const amount = Number(data.amount.replace(/,/g, ''));
    const selectedCategory = categoryMap?.[data.category];
    if (!selectedCategory) {
      alert('카테고리를 선택해주세요');
      return;
    }
    const expense: ExpenseFormData = {
      amount,
      category: selectedCategory,
      description: data.description,
      isHidden: data.isHidden ?? false,
      createdAt: data.date,
      updatedAt: data.date,
      budgets: data.budgets || [],
    };
    onSave(withTimestamps(expense));
    reset();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden" onClick={onClose} />}
      {/* Chat Panel */}
      <div
        className={`fixed bottom-5 right-5 w-96 h-[600px] bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden flex flex-col z-50 transition-all duration-300 ${
          isOpen ? 'translate-y-0 scale-100 opacity-100 visible' : 'translate-y-full scale-90 opacity-0 invisible'
        } md:w-96 md:h-[600px] max-md:!bottom-0 max-md:!right-0 max-md:!left-0 max-md:!w-full max-md:!h-[70vh] max-md:!rounded-t-2xl max-md:!rounded-b-none max-md:translate-y-full max-md:scale-100`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <Logo size="md" />
            <span className="text-sm font-semibold text-gray-800">소비내역 추가</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" title="Continue in immersive">
              <Maximize2 size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              title="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          <form
            onSubmit={handleSubmit(onSubmit, (formErrors) => {
              const messages = Object.values(formErrors)
                .map((err: any) => err?.message)
                .filter(Boolean)
                .join('\n');
              if (messages) alert(messages);
            })}
            className="space-y-4"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  메모
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <CommonInput {...field} id="description" placeholder="지출에 대한 설명을 입력하세요" ref={descriptionRef} />
                  )}
                />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  금액
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-500 text-lg">₩</span>
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }: { field: any }) => (
                      <CommonInput {...field} type="text" id="amount" inputMode="numeric" autoComplete="off" className="pr-3 text-right" />
                    )}
                  />
                </div>
                {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  카테고리
                </label>
                <div className="relative mt-1">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }: { field: any }) => (
                      <select
                        {...field}
                        id="category"
                        required
                        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-900"
                      >
                        <option value="">카테고리 선택</option>
                        {Object.values(categoryMap ?? {}).map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">예산</label>
                <div className="relative mt-1 w-full">
                  <Controller
                    name="budgets"
                    control={control}
                    render={({ field }) =>
                      availableBudgets.length === 0 ? (
                        <div className="bg-gray-50 rounded-md px-2 py-3 text-sm w-full text-center">카테고리를 선택해주세요</div>
                      ) : (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {availableBudgets.map((budget) => {
                            const checked = (field.value ?? []).some((b: Budget) => b.id === budget.id);
                            return (
                              <li
                                key={budget.id}
                                onClick={() => {
                                  const current = field.value ?? [];
                                  if (checked) {
                                    field.onChange(current.filter((b: Budget) => b.id !== budget.id));
                                  } else {
                                    field.onChange([...current, budget]);
                                  }
                                }}
                                className={`
                                  group cursor-pointer rounded-md p-2 border
                                  transition-all duration-200
                                  ${checked ? 'border-accent-200 shadow-sm scale-101' : 'border-gray-200 hover:shadow-sm hover:scale-101'}
                                  flex flex-col gap-2 relative
                                `}
                                tabIndex={0}
                                aria-pressed={checked}
                              >
                                <span className="font-semibold text-sm">{budget.title}</span>
                                <span className="text-gray-500 text-xs line-clamp-1">{budget.description}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )
                    }
                  />
                </div>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  날짜
                </label>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input
                      {...field}
                      type="date"
                      id="date"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
                    />
                  )}
                />
                {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                onClick={onClose}
              >
                취소
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ExpenseDialog;
