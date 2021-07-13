import ReactDOM from 'react-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import App from './components/App';
import AppProviders from './context'

import './index.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AppProviders>
      <App />
    </AppProviders>
  </QueryClientProvider>,
  document.getElementById('root')
);
