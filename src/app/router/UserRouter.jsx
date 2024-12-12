import { useSession } from '@shared/utils/session';
import BuyWindow from '@user/pages/BuyWindow';
import Main from '@user/pages/Main';

import { Navigate, Route, Routes } from 'react-router-dom';
import OtpWindow from '../../widgets/OtpWindow';
import PageWrapper from '../pages/PageWrapper';
import CONFIG from './config';

const USER_CONFIG = {
  MAIN: '/main',
  BUYWINDOW: '/buy',
  CONFIRM: '/confirm',
};

const UserRouter = () => {
  const { getUserStatus } = useSession();

  const userStatus = getUserStatus() === 'REGISTERED';

  return (
    <Routes>
      <Route
        path={USER_CONFIG.MAIN}
        element={
          <PageWrapper>
            <Main />
          </PageWrapper>
        }
      />
      <Route
        path={USER_CONFIG.BUYWINDOW}
        element={
          <PageWrapper>
            <BuyWindow />
          </PageWrapper>
        }
      />
      <Route path={USER_CONFIG.CONFIRM} element={<OtpWindow />} />
      <Route
        path="/"
        element={<Navigate to={userStatus ? '/user/confirm' : '/user/main'} />}
      />
      <Route path="/*" element={<Navigate to={CONFIG.NOT_FOUND} />} />
    </Routes>
  );
};

export default UserRouter;
