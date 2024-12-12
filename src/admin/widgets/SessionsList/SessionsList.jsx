import { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { getHistorySessions } from './api';
import styles from './SessionsList.module.scss';
import { EmptySessions } from './ui/EmptySesssions';
import { PaginateSessions } from './ui/PaginateSessions';
import SessionsButton from './ui/SessionsButton/SessionsButton';
import SessionsHistory from './ui/SessionsHistory/SessionsHistory';

const SessionsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pagesTotal, setPagesTotal] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const clickRef = useRef(null);
  const [selectedSession, setSelectedSession] = useState('');

  const countPendingSessions = useSelector(
    (state) => state.sessionListeners.countListeners
  );

  useEffect(() => {
    async function createSessions() {
      const response = await getHistorySessions(10, 0);
      setSessions(response.sessions);
      setPagesTotal(Math.ceil(response.total / 10));
      setCurrentPage(1);
    }
    createSessions();
  }, [countPendingSessions]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (clickRef.current && !clickRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const selectSession = () => {
    setIsOpen(false);
  };

  const paginateHandler = async (page) => {
    setCurrentPage(page);
    const response = await getHistorySessions(10, page * 10 - 10);
    setSessions(response.sessions);
  };

  return (
    <div
      className={`${styles.history} ${isOpen ? styles.open : ''}`}
      ref={clickRef}
    >
      <div>
        <SessionsButton toogleComponent={toggleSidebar} />
        {isOpen && (
          <ul className={styles.content}>
            {sessions.length === 0 ? (
              <EmptySessions />
            ) : (
              <>
                <SessionsHistory
                  sessions={sessions}
                  selectSession={selectSession}
                  selectedSession={selectedSession}
                  setSelectedSession={setSelectedSession}
                />
                <PaginateSessions
                  currentPage={currentPage}
                  pagesTotal={pagesTotal}
                  paginateHandler={paginateHandler}
                />
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SessionsList;
