import { baseApi } from '@/shared/api/baseApi'
import { Friend } from '../model/types'

export const friendsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFriends: builder.query<Friend[], void>({
      query: () => '/friends',
      providesTags: ['Friends'],
    }),
  }),
})

export const { useGetFriendsQuery } = friendsApi
