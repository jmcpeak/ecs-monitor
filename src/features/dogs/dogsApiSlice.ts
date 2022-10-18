import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = 'debdab56-0184-457d-9eca-ab4c83882759';

export interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

export const dogsApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thedogapi.com/v1',
    prepareHeaders(headers) {
      headers.set('x-api-key', apiKey);

      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchBreeds: builder.query<Breed[], string | void>({
        query(limit = '10') {
          return `/breeds?limit=${limit}`;
        },
      }),
    };
  },
});

export const { useFetchBreedsQuery } = dogsApiSlice;
