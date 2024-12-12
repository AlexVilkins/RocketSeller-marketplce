import { HttpClient } from '@app/api/httpClient';

const httpClient = new HttpClient();

export const confirmOTP = async (otpCode) => {
  try {
    const response = await httpClient.authPost('/accounts/confirm', {
      otpCode: otpCode,
    });
    // console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    // console.log(error);
    return { type: 'error', message: error.response.data.message };
  }
};

export const refreshOTP = async () => {
  try {
    const response = await httpClient.authPost('accounts/refreshOTP', null);
    console.log('what');
    return response.data.result;
  } catch (error) {
    // console.log(error);
    return { type: 'error', message: error.response.data.message };
  }
};
