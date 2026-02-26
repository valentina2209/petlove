import { baseApi } from '@/shared/api/baseApi'
import { GetNewsParams, NewsResponse } from '../model/types'

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, GetNewsParams>({
      query: ({ page, search }) => ({
        url: '/news',
        params: {
          page,
          search,
        },
      }),
      providesTags: ['News'],
    }),
  }),
})

export const { useGetNewsQuery } = newsApi