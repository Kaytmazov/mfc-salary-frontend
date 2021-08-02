import ReactDOM from 'react-dom';

import App from './components/App';
import AppProviders from './context';

import './index.scss';

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root')
);
