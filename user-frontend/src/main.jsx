import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store'; // Import the store and persistor
import App from './App.jsx';
import './index.css';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Create the React root and render the application
createRoot(rootElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
