import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../utils/axiosBaseQuery';
import { createUrlWithParams } from '../utils/createUrlWithParams';

export const watchListApi = createApi({
  reducerPath: 'watchListApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://api.upstox.com/v2' }),
  endpoints: (builder) => ({
    getWatchListData: builder.query({
        query: payload => ({
            url: createUrlWithParams(payload)
        }),
  
    }),
  }),
});

export const { useGetWatchListDataQuery } = watchListApi;
