import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-host': process.env.REACT_APP_CRYPTO_HOST,
  'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
};

const baseUrl = process.env.REACT_APP_CRYPTOS_URL;

console.log(baseUrl);

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoAPI = createApi({
  reducerPath: 'cryptoAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoAPI;
