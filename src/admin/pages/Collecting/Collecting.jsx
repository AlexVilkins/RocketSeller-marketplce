// import { useCallback, useEffect, useState } from 'react';

// import {
//   createSession,
//   getSessionStatus,
//   getWbProducts,
//   startSession,
// } from '@api/operator/useCollectGoodsAPI';
// import { CircularProgress, Pagination } from '@mui/material';
// import { useSnackbar } from 'notistack';

// import emptyState from '@assets/table/emptyState.svg';

// import styles from './Collecting.module.scss';
// import CollectingHeader from './components/CollectingHeader/CollectingHeader';
// import CollectingTable from './components/CollectingTable/CollectingTable';
// import SessionsList from './components/SessionsList/SessionsList';
// import TagsComponent from './components/TagsComponent';

// const Collecting = () => {
//   const { enqueueSnackbar } = useSnackbar();

//   const [articles, setArticles] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [currentSession, setCurrentSession] = useState('');
//   const [progressSession, setProgressSession] = useState(false);
//   const [paginationCount, setPaginationCount] = useState(0);

//   // useEffect(() => {
//   //   if (localStorage.getItem('sessionId')) {
//   //     setProgressSession(true);
//   //     setCurrentSession(localStorage.getItem('sessionId'));
//   //   }
//   // }, []);

//   useEffect(() => {
//     let intervalId = null;

//     if (progressSession) {
//       intervalId = setInterval(longPoolTimer, 1000);
//     }

//     return () => {
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, [progressSession]);

//   const longPoolTimer = useCallback(async () => {
//     const sessionId = localStorage.getItem('sessionId');

//     if (!sessionId) return;

//     try {
//       const data = await getSessionStatus(sessionId);

//       if (data.status === 'successed') {
//         setProgressSession(false);

//         if (currentSession === sessionId) {
//           await getSessionProducts(sessionId);
//         }

//         localStorage.removeItem('sessionId');
//       } else {
//         console.warn(`Unexpected status: ${data.status}`);
//       }
//     } catch (error) {
//       enqueueSnackbar('Ошибка при получении статуса сессии', {
//         variant: 'error',
//       });
//       console.error('Ошибка:', error);
//     }
//   }, [currentSession, enqueueSnackbar]);

//   const startCollectGoods = async () => {
//     setProducts([]);
//     if (!articles.length) {
//       enqueueSnackbar('Артикулы не найдены', {
//         variant: 'error',
//         anchorOrigin: { vertical: 'top', horizontal: 'right' },
//       });
//     } else {
//       const sessionID = await createSession();
//       localStorage.setItem('sessionId', sessionID);
//       setCurrentSession(sessionID);
//       setProgressSession(true);

//       startSession(articles);
//     }
//   };

//   const getSessionProducts = async (sessionId) => {
//     const status = await getSessionStatus(sessionId);
//     const products = await getWbProducts(20, 0, sessionId);
//     setPaginationCount(Math.ceil(status.total / 20));
//     setProducts(products);
//   };

//   const enterAnotherSession = (sessionId) => {
//     setCurrentSession(sessionId);
//     getSessionProducts(sessionId);
//   };

//   const paginateHandler = async (page) => {
//     const response = await getWbProducts(20, page * 20 - 20, currentSession);
//     setProducts(response);
//   };

//   return (
//     <div className={styles.container}>
//       <CollectingHeader
//         progressSession={progressSession}
//         setArticles={(articles) => setArticles(articles)}
//         startCollectGoods={startCollectGoods}
//         currentSession={currentSession}
//       />

//       <TagsComponent articles={articles} />

//       <SessionsList
//         enterAnotherSession={(sessionId) => enterAnotherSession(sessionId)}
//       />

//       {/* Отображать таблицу в 2 случаях:
//       1. Если были получены данные запущенной сессии progressSession == false и products.length > 0
//       2. Если данные запущенной сессии не получены но выбрана другая сессия
//       progressSession == true, currentSession != localStorage.getItem() и products.length > 0 */}
//       {((progressSession == false && products.length > 0) ||
//         (progressSession == true &&
//           currentSession != localStorage.getItem('sessionId') &&
//           products.length > 0)) && (
//         <>
//           <CollectingTable sessionId={currentSession} products={products} />
//           <Pagination
//             count={paginationCount}
//             variant="outlined"
//             shape="rounded"
//             color="primary"
//             boundaryCount={0}
//             onChange={(_, value) => {
//               paginateHandler(value);
//             }}
//             sx={{
//               marginTop: '20px',
//               display: 'flex',
//               justifyContent: 'center',
//             }}
//           />
//         </>
//       )}

//       {progressSession == false && products.length == 0 && (
//         <div className={styles.emptyState}>
//           <img src={emptyState} alt="Empty State" />
//           <p className={styles.title}>Таблица товаров пустая</p>
//           <p className={styles.text}>
//             Начните поиск товаров по артикулам или выберете сессию
//           </p>
//         </div>
//       )}

//       {progressSession == true &&
//         products.length == 0 &&
//         currentSession == localStorage.getItem('sessionId') && (
//           <CircularProgress className={styles.progress} />
//         )}

//       {/* Сделай скелетон */}
//       {progressSession == true &&
//         currentSession != localStorage.getItem('sessionId') &&
//         products.length == 0 && <div>Идет загрузка данных из БД</div>}
//     </div>
//   );
// };

// export default Collecting;

// новое ниже

// import { useEffect, useState } from 'react';

// import {
//   getSessionStatus,
//   getWbProducts,
// } from '@api/operator/useCollectGoodsAPI';
// import { CircularProgress, Pagination } from '@mui/material';
// import { useSnackbar } from 'notistack';

// import emptyState from '@assets/table/emptyState.svg';

// import SessionsList from '@admin/widgets/SessionsList/SessionsList';
// import styles from './Collecting.module.scss';
// import CollectingHeader from './components/CollectingHeader/CollectingHeader';
// import CollectingTable from './components/CollectingTable/CollectingTable';

// const Collecting = () => {
//   const { enqueueSnackbar } = useSnackbar();

//   const [products, setProducts] = useState([]);
//   const [currentSession, setCurrentSession] = useState('');

//   const [progressSession, setProgressSession] = useState(false);
//   const [paginationCount, setPaginationCount] = useState(0);

//   const [poolListeners, setPoolListeners] = useState([]);

//   useEffect(() => {});

//   const longPoolTimer = async (sessionId, intervalId) => {
//     console.log('pooling: ' + intervalId + ' : ' + sessionId);
//     try {
//       const data = await getSessionStatus(sessionId);

//       if (data.status === 'successed') {
//         setProgressSession(false);
//         setPoolListeners(
//           [...poolListeners].filter((el) => el[sessionId] != intervalId)
//         );

//         if (currentSession === sessionId) {
//           await getSessionProducts(sessionId);
//         }
//       }
//     } catch (error) {
//       enqueueSnackbar('Ошибка при получении статуса сессии', {
//         variant: 'error',
//       });
//       console.error('Ошибка:', error);
//     }
//   };

//   const startCollectGoods = async (sessionID) => {
//     setProducts([]);
//     setCurrentSession(sessionID);
//     setProgressSession(true);
//   };

//   const enterAnotherSession = (sessionId, statusSession) => {
//     setCurrentSession(sessionId);
//     console.log(statusSession);
//     if (statusSession !== 'successed') {
//       setProgressSession(true);
//       setStatusParse(sessionId);
//       setProducts([]);
//     } else {
//       setProgressSession(false);
//       getSessionProducts(sessionId);
//     }
//   };

//   const setStatusParse = (sessionId) => {
//     let intervalId = setInterval(
//       () => longPoolTimer(sessionId, intervalId),
//       1000
//     );
//     console.log(longPoolTimer);
//     setPoolListeners([...poolListeners, { [sessionId]: intervalId }]);
//   };

//   const getSessionProducts = async (sessionId) => {
//     const status = await getSessionStatus(sessionId);
//     const products = await getWbProducts(20, 0, sessionId);
//     setPaginationCount(Math.ceil(status.total / 20));
//     setProducts(products);
//   };

//   const paginateHandler = async (page) => {
//     const response = await getWbProducts(20, page * 20 - 20, currentSession);
//     setProducts(response);
//   };

//   return (
//     <div className={styles.container}>
//       <CollectingHeader startCollectGoods={startCollectGoods} />
//       <SessionsList enterAnotherSession={enterAnotherSession} />
//       {progressSession == false &&
//         products.length == 0 &&
//         currentSession == '' && (
//           <div className={styles.emptyState}>
//             <img src={emptyState} alt="Empty State" />
//             <p className={styles.title}>Таблица товаров пустая</p>
//             <p className={styles.text}>
//               Начните поиск товаров по артикулам или выберете сессию
//             </p>
//           </div>
//         )}
//       {products.length > 0 && currentSession != '' && (
//         <>
//           <CollectingTable sessionId={currentSession} products={products} />
//           <Pagination
//             count={paginationCount}
//             variant="outlined"
//             shape="rounded"
//             color="primary"
//             boundaryCount={0}
//             onChange={(_, value) => {
//               paginateHandler(value);
//             }}
//             sx={{
//               marginTop: '20px',
//               display: 'flex',
//               justifyContent: 'center',
//             }}
//           />
//         </>
//       )}

//       {progressSession == true && products.length == 0 && (
//         <div className={styles.progress}>
//           <div>Данные загружаются</div>
//           <CircularProgress />
//         </div>
//       )}
//       {/* {progressSession == true && products.length == 0 && (
//         <div>Данные грузятся из БД</div>
//       )} */}
//     </div>
//   );
// };

// export default Collecting;
