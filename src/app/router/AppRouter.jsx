import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import NonAuthRoutes from './NonAuthRoutes';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<NonAuthRoutes />} />
        <Route path="/*" element={<AuthRoutes />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
