import {
  DeleteForever,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Avatar,
  Collapse,
  IconButton,
  Rating,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import {
//   approvedProductById,
//   hideProductById,
// } from '@api/operator/useGoodsAPI';
import { SparkLineChart } from '@mui/x-charts';
import AnalogTable from './analogTable';
import styles from './Table.module.scss';

const theme = createTheme({
  palette: {
    red: {
      main: '#e63946',
    },
  },
});

const Row = React.memo(function Row({ row }) {
  const navigate = useNavigate();
  const [rowStatus, setRowStatus] = useState(row.status);

  const [open, setOpen] = React.useState(false);
  const status = {
    CREATED: 'Создан',
    APPROVED: 'Подтвержден',
    DELETED: 'Удален',
  };

  const handleRowClick = useCallback(() => {
    navigate('/admin/prodinfo', { state: { data: row, sourse: 'wb' } });
  }, [navigate, row]);

  const handleOpenPanel = useCallback(
    (e) => {
      e.stopPropagation();
      setOpen(!open);
    },
    [open]
  );

  const approveHandler = useCallback((itemId) => {
    setRowStatus('APPROVED');
    // approvedProductById(itemId);
  }, []);

  const hideHandler = useCallback((itemId) => {
    setRowStatus('DELETED');
    // hideProductById(itemId);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow
          className={`${styles.anima} ${styles[rowStatus.toLowerCase()]}`}
          sx={{
            '& > *': {
              borderBottom: 'none',
            },
          }}
        >
          <Tooltip title="Посмотреть товар" placement="left-start">
            <TableCell
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'start',
                cursor: 'pointer',
              }}
              onClick={handleRowClick}
            >
              <Avatar
                alt="Avatar"
                src={row.thumb}
                variant="square"
                sx={{ mr: 1 }}
              />
              {row.name}
            </TableCell>
          </Tooltip>

          <TableCell align="center">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  color: '#147129',
                  backgroundColor: '#EAFDEE',
                  padding: '4px 10px',
                  borderRadius: '20px',
                }}
              >
                {row.revenue}
              </div>
            </div>
          </TableCell>
          <TableCell align="center">
            <Rating
              name="half-rating-read"
              defaultValue={row.rating}
              precision={0.5}
              readOnly
            />
          </TableCell>
          <TableCell align="center">{row.comments}</TableCell>
          <TableCell align="center">{row.sales}</TableCell>
          <TableCell align="center">{row.revenue}</TableCell>

          <TableCell>
            <SparkLineChart
              data={[
                30, 50, 60, 70, 90, 120.15, 180, 160, 190, 150, 120, 100, 70,
                40,
              ]}
              plotType="bar"
              height={40}
              width={150}
              colors={['#4d4aea']}
            />
          </TableCell>
          <TableCell>
            <div
              style={{
                color:
                  rowStatus === 'DELETED'
                    ? 'red'
                    : rowStatus === 'APPROVED'
                      ? 'green'
                      : 'black',
                backgroundColor: '#c4c4c4',
                borderRadius: '8px',
                padding: '5px 10px',
                textAlign: 'center',
              }}
            >
              {status[rowStatus]}
            </div>
          </TableCell>
          <TableCell align="center" sx={{ display: 'flex' }}>
            <Tooltip title="Товары с 1688">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={(e) => handleOpenPanel(e)}
              >
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Подтвердить">
              <IconButton onClick={() => approveHandler(row.id)}>
                <CheckCircleIcon color="success" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Не отображать">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => hideHandler(row.id)}
              >
                <DeleteForever color="red" />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
        <TableRow sx={{ '& > *': { borderBottom: 'none' } }}>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              border: 'none',
            }}
            colSpan={12}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <AnalogTable product={row.id} />
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </ThemeProvider>
  );
});

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    sales: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default Row;
