// import { ErrorResponseException } from './exceptions';
// import { useSession } from '@shared/utils/session';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// export function responseDecorator(apiFunc) {
//   return async function (payload) {
//     try {
//       return await apiFunc(payload);
//     } catch (error) {
//       const errorMessage = new ErrorResponseException(error);
//       errorMessage.show();
//     }
//   };
// }

// export function authRequest() {
//   const token = jwtDecode(useSession().getToken());

// }

// async refresh() {
//   const token = jwtDecode(useSession().getToken());

//   if (token.payload.user_status === null) {
//     this.setHeader(
//       'Authorization',
//       `Bearer ${useSession().getRefreshToken()}`
//     );
//     const response = await this.#axiosInstance.post(
//       '/token/admin/refresh',
//       null
//     );

//     useSession().setToken(response.data.result.access_token);
//     useSession().setRefreshToken(response.data.result.refresh_token);

//     if (token.payload.user_status === 'ACTIVE') {
//       this.setHeader(
//         'Authorization',
//         `Bearer ${useSession().getRefreshToken()}`
//       );
//       const response = await this.#axiosInstance.post(
//         '/token/user/refresh',
//         null
//       );
//       useSession().setToken(response.data.result.access_token);
//       useSession().setRefreshToken(response.data.result.refresh_token);
//     }
//   }
// }

// async authGet(url, payload) {
//   this.setHeader('Authorization', `Bearer ${useSession().getToken()}`);
//   const response = await this.#axiosInstance.get(url, payload);

//   if (response.status === 3001) {
//     this.refresh();
//   }

//   return response;
// }
