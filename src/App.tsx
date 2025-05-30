import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import ExpenseDialog from './components/ExpenseDialog';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import { addExpense } from './db/expenseDB';

function App() {
  const [timeframe, setTimeframe] = useState({
    start: new Date(2024, 3, 1),
    end: new Date(2024, 3, 30),
  });
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['getAllExpenses'] });
    },
  });

  return (
    <div
      className="flex min-h-screen"
      style={{
        background: 'linear-gradient(135deg, rgb(255 255 255) 0%, rgb(230 230 230) 100%)',
      }}
    >
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <SearchBar />
        <Dashboard timeframe={timeframe} onTimeframeChange={setTimeframe} />
        <button
          className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-3xl"
          onClick={() => setOpen(true)}
        >
          +
        </button>
        <ExpenseDialog isOpen={open} onClose={() => setOpen(false)} onSave={mutate} />
      </main>
    </div>
  );
}

export default App;
