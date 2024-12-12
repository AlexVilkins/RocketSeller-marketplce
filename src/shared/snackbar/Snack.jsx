import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

const Snack = ({ text, type, isVisible }) => {
  const { enqueueSnackbar } = useSnackbar();

  const exception = useSelector((state) => state.exceptions.exception);

  console.log(exception);
  return enqueueSnackbar(exception, {
    variant: 'error',
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
  });
};

export default Snack;
