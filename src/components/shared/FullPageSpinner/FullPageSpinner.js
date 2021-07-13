import LoadingIndicator from '../LoadingIndicator';

const FullPageSpinner = () => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <LoadingIndicator />
  </div>
);

export default FullPageSpinner;
