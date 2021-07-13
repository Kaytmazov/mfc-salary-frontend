import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './auth-context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient} >
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default AppProviders;
