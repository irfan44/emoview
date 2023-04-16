import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_APP_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
      // scope: 'read:current_user update:current_user_metadata',
      audience: `https://${import.meta.env.VITE_AUTH0_APP_DOMAIN}/api/v2/`,
    }}
    cacheLocation={'localstorage'}
  >
    <App />
  </Auth0Provider>
);
