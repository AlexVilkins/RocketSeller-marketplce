import { Navigate, Route, Routes } from 'react-router-dom';

import { useSession } from '@shared/utils/session';
import CONFIG from './config';

import ROLES from '@shared/utils/session/userRoles';
import Undefined from '../pages/Undefined';
import AdminRouter from './AdminRouter';
import UserRouter from './UserRouter';

const AuthRoutes = () => {
  const { getToken, getUserRole } = useSession();

  const roleIsUser = getUserRole() === ROLES.USER;
  const roleIsAdmin = getUserRole() === ROLES.ADMIN;

  const commonElement = roleIsUser ? (
    <UserRouter />
  ) : roleIsAdmin ? (
    <AdminRouter />
  ) : (
    <Navigate to={CONFIG.NOT_FOUND} />
  );

  if (!getToken()) {
    return <Navigate to={`${CONFIG.AUTH}`} />;
  }

  if (getUserRole() == null) {
    return <Navigate to={`${CONFIG.AUTH}`} />;
  }

  return (
    <Routes>
      <Route path="/admin/*" element={commonElement} />
      <Route path="/user/*" element={commonElement} />
      <Route path="/" element={commonElement} />
      <Route path={CONFIG.NOT_FOUND} element={<Undefined />} />
      <Route path="/*" element={<Navigate to={CONFIG.NOT_FOUND} />} />
    </Routes>
  );
};

export default AuthRoutes;
