import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import store from '@redux/store';
import AppRouter from './router/AppRouter';
import './scss/app.scss';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        {/* <Snack /> */}
        <AppRouter />;
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
