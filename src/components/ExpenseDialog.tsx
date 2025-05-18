import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { categoryList } from '../common/consants/categoryName';
import { ExpenseFormData } from '../types/expense';
import CommonInput from './CommonInput';

interface ExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (expense: ExpenseFormData) => void;
}

export default function ExpenseDialog({ open, onClose, onSave }: ExpenseDialogProps) {
  if (!open) return null;

  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amountStr = String(formData.get('amount')).replace(/,/g, '');
    const expense: ExpenseFormData = {
      amount: Number(amountStr),
      category: String(formData.get('category')),
      description: String(formData.get('description')),
      date: String(formData.get('date')),
    };
    console.log(expense);

    onSave(expense);
    onClose();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg transform rounded-lg bg-white p-6 shadow-xl transition-all">
          <button type="button" className="absolute right-4 top-4 rounded-md text-gray-400 hover:text-gray-500" onClick={onClose}>
            <X className="h-6 w-6" />
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">새로운 지출 추가</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  설명
                </label>
                <CommonInput name="description" id="description" placeholder="지출에 대한 설명을 입력하세요" />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  금액
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">₩</span>
                  <CommonInput
                    type="text"
                    name="amount"
                    id="amount"
                    required
                    value={amount}
                    onChange={handleAmountChange}
                    inputMode="numeric"
                    autoComplete="off"
                    className="pr-3 text-right"
                    placeholder="예: 12,000"
                    style={{ paddingLeft: '2.25rem' }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  카테고리
                </label>
                <div className="relative mt-1">
                  <select
                    name="category"
                    id="category"
                    required
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none transition-colors duration-200"
                  >
                    <option value="">카테고리 선택</option>
                    {categoryList.map((cat: { value: string; label: string }) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  날짜
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors duration-200"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={onClose}
              >
                취소
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
