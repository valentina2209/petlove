import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
   baseUrl: 'https://petlove.b.goit.study/api',
  }),

  tagTypes: ['News', 'Friends', 'Notices'],

  endpoints: () => ({}),
})
    
















   