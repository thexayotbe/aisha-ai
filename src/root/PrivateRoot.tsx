// src/components/PrivateRoute.tsx
import React from "react";
import { Route, Navigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
const PrivateRoute: React.FC<{ path: string; element: React.ReactNode }> = ({
  path,
  element,
}) => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default PrivateRoute;
