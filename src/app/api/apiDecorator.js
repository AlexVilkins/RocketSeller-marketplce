import { setException } from '@redux/exceptions/slice';
import { ErrorResponseException } from './exceptions';
const exception = new ErrorResponseException();

const apiDecorator = async (requestFn) => {
  try {
    const response = await requestFn();
    return response;
  } catch (error) {
    console.log(error);
    exception.setErrorResponse(error);
    setException(error);
  }
};

export default apiDecorator;
