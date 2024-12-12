import {
  deleteSessionListener,
  setSessionListener,
} from '@redux/sessionListeners/slice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getSessionInfo } from '@redux/sessionSlice/asyncAction';
import CollectingModalButton from '../../../pages/Collecting/components/CollectingModal/CollectingModal';
import TagsComponent from '../../../pages/Collecting/components/TagsComponent';
import { createNamedSession, getSessionInfoStatus, startSession } from '../api';
import styles from './CollectingHeader.module.scss';
import TextareaHeader from './TextareaHeader';

const CollectingHeader = () => {
  const [articles, setArticles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const sendHandler = async (sessionName) => {
    if (!articles.length) {
      enqueueSnackbar('Артикулы не найдены', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    } else {
      const sessionID = await createNamedSession(sessionName);
      const startMessage = await startSession(sessionID, articles);

      dispatch(await getSessionInfo(sessionID));

      dispatch(
        setSessionListener({
          sessionId: sessionID,
          listener: poolListener,
        })
      );
      setArticles([]);
    }
  };

  const delInputs = () => {
    setArticles([]);
  };

  const poolListener = async (sessionID) => {
    const status = await getSessionInfoStatus(sessionID);

    if (status == 'successed') {
      dispatch(deleteSessionListener(sessionID));
    }
  };

  return (
    <>
      <div className={styles.panel}>
        <TextareaHeader articles={articles} setArticles={setArticles} />
        <CollectingModalButton
          handleSessionName={sendHandler}
          delInputs={delInputs}
        />
      </div>
      <TagsComponent articles={articles} setArticles={setArticles} />
    </>
  );
};

CollectingHeader.propTypes = {
  startCollectGoods: PropTypes.func,
};

export default CollectingHeader;
