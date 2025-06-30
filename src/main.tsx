import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import App from './App';
import IndexedDbInit from './components/hoc/IndexedDbInit';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient(); // 생성

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <IndexedDbInit>
      <App />
    </IndexedDbInit>
  </QueryClientProvider>
  // </React.StrictMode>
);
