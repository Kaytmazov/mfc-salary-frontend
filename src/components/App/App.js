import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FullPageSpinner from '../shared/FullPageSpinner';

import { useAuth } from '../../context/auth-context';
import '../../utils/validations';

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './AuthenticatedApp'),
);
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

toast.configure({
  pauseOnHover: true,
});

const App = () => {
  const { user } = useAuth();

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App;
