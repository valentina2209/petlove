import { baseApi } from "@/shared/api/baseApi";
import { UpdateUserRequest, UserResponse } from "../model/types";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, any>({
            query: (body) => ({
                url: '/users/signin',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        register: builder.mutation<UserResponse, any>({
            query: (body) => ({
                url: '/users/signup',
                method: 'POST',
                body,
            }),
        }),
        getCurrentUser: builder.query<UserResponse, void>({
            query: () => 'users/current/full',
            providesTags: ['User'],
        }),
        updateUser: builder.mutation<UserResponse, UpdateUserRequest>({
            query: (body) => ({
                url: '/users/current/edit',
                method: 'PATCH',
                body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['User'],
        }),
        addUserPet: builder.mutation<any, FormData | any>({
            query: (data) => ({
                url: '/users/current/pets/add',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        removePet: builder.mutation <{ message: string }, string>({
            query: (id) => ({
                url: `/users/current/pets/remove/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),
        addFavorite: builder.mutation<any, string>({
            query: (id) => ({
                url: `/notices/favorites/add/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['User', 'Notices'], 
        }),
        removeFavorite: builder.mutation<any, string>({
            query: (id) => ({
                url: `/notices/favorites/remove/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User', 'Notices'],
        }),
    }),
});


export const { 
  useLoginMutation, 
  useRegisterMutation,
  useGetCurrentUserQuery, 
  useUpdateUserMutation, 
  useAddUserPetMutation, 
  useRemovePetMutation,
  useAddFavoriteMutation, 
  useRemoveFavoriteMutation
} = userApi;