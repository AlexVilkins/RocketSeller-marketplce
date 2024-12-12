import Collecting from '@admin/pages/Collecting';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageWrapper from '../pages/PageWrapper';

export const ADMIN_CONFIG = {
  COLLECTING: '/collecting',
};

const AdminRouter = () => {
  return (
    <Routes>
      <Route
        path={ADMIN_CONFIG.COLLECTING}
        element={
          <PageWrapper>
            <Collecting />
          </PageWrapper>
        }
      />
      <Route path="/*" element={<Navigate to="/admin/collecting" />} />
    </Routes>
  );
};

export default AdminRouter;
