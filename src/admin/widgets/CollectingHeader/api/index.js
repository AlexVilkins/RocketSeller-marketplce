import { HttpClient } from '@app/api/httpClient';

const httpClient = new HttpClient();

export const createNamedSession = async (name) => {
  const response = await httpClient.authPost(`/serviceSession`, { name });
  return response.data.result.serviceId;
};

export const startSession = async (sessionID, articles) => {
  const response = await httpClient.authPost(
    `/serviceSession/${sessionID}/start`,
    {
      wildberriesIds: articles,
    }
  );
  return response.data.result;
};

export const getSessionInfoStatus = async (sessionID) => {
  const response = await httpClient.authGet(`/serviceSession/${sessionID}`);
  return response.data.result.status;
};
