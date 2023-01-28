import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="592926824087-g9pipfhs18i7t7s2mlrg8am253opesk0.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
