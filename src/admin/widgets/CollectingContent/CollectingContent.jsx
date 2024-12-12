import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getSessionInfo,
  getSessionProducts,
} from '@redux/sessionSlice/asyncAction';
import { ProgressComponent } from '@shared/ui';
import { useDispatch, useSelector } from 'react-redux';
import CollectingTable from '../../pages/Collecting/components/CollectingTable/CollectingTable';
import Empty from '@widgets/Empty';
import PaginationTable from './ui/PaginationTable';
import tableEmpty from '@widgets/assets/emptyIcons/tableEmpty.svg';

const CollectingContent = () => {
  const currentSession = useSelector((state) => state.session);
  const countPendingSessions = useSelector(
    (state) => state.sessionListeners.countListeners
  );
  const listeners = useSelector((state) => state.sessionListeners.listeners);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    async function getCurrentsession() {
      if (
        !Object.keys(listeners).includes(currentSession.sessionId) &&
        currentSession.sessionId != ''
      ) {
        dispatch(await getSessionInfo(currentSession.sessionId));
        dispatch(
          await getSessionProducts({
            limit: 20,
            offset: 0,
            sessionId: currentSession.sessionId,
          })
        );
      }
    }
    getCurrentsession();
  }, [countPendingSessions]);

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>{currentSession.name}</h3>
      {currentSession.sessionId == '' && (
        <Empty
          icon={tableEmpty}
          title="По текущим артикулам ничего не найдено"
          text="Измените список артикулов для сбора данных."
        />
      )}
      {currentSession.total > 0 && (
        <>
          <CollectingTable sessionId={currentSession.sessionId} />

          {currentSession.products.length > 0 && currentSession.total > 20 && (
            <PaginationTable
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}

      {currentSession.isPendingSession && (
        <ProgressComponent title="Сессия запущена. Идет сбор..." />
      )}

      {currentSession.isLoadData && (
        <ProgressComponent title="Получение данных" />
      )}
    </>
  );
};

export default CollectingContent;
