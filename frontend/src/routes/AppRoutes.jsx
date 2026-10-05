import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from './routeConfig.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx';
import { AdminRoute } from './AdminRoute.jsx';
import { RoutePlaceholder } from './RoutePlaceholder.jsx';

export const AppRoutes = () => {
  return (
    <Routes>
      {routeConfig.map((route) => {
        if (route.type === 'Protected') {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<ProtectedRoute>{route.element}</ProtectedRoute>}
            />
          );
        }

        if (route.type === 'Admin') {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<AdminRoute>{route.element}</AdminRoute>}
            />
          );
        }

        return (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        );
      })}

      {/* 404 Catch-All Route */}
      <Route
        path="*"
        element={<RoutePlaceholder title="Page Not Found (404)" path="*" type="Public" />}
      />
    </Routes>
  );
};
