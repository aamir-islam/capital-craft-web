import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

// This function now properly matches the signature expected by `createApi`
export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string }): BaseQueryFn<{
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    headers?: AxiosRequestConfig['headers'];
    params?: AxiosRequestConfig['params'];
},
unknown,
unknown> => async (
  { url, method = 'GET', headers = {}, data }: { url: string; method?: string; headers?: object; data?: object },
) => {
  const accessToken = JSON.parse(localStorage.getItem('token') as string);
 

  if (!accessToken) {
    return { error: { message: 'Access token is missing or invalid' } };
  }
  
  try {
    const response = await axios({
      url: `${baseUrl}${url}`,
      method,
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        ...headers,
      },
      data,
    });
    
    return { data: response.data }; // Return the data in the format expected by Redux Toolkit Query
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
        error: {
            status: err.response?.status,
            data: err.response?.data || err.message
        }
    }; // Return error in the expected format
  }
};
