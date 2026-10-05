import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout.jsx';
import { AppRoutes } from './routes/index.js';
import { AuthProvider } from './context/AuthContext.jsx';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
