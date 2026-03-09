import { baseApi } from "@/shared/api/baseApi";
import { GetNoticesParams, NoticesResponse, City, Notice } from "../model/types";

export const noticesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Отримання списку оголошень
    getNotices: builder.query<NoticesResponse, GetNoticesParams>({
      query: (params) => ({
        url: "/notices",
        params,
      }),
      providesTags: ['Notices'],
    }),

    getNoticeById: builder.query<Notice, string>({
      query: (id) => `/notices/${id}`,
      providesTags: (result, error, id) => [{ type: 'Notices', id }],
    }),

    // Додавання в обране
    // addFavorite: builder.mutation<void, string>({
    //   query: (id) => ({
    //     url: `/notices/favorites/add/${id}`,
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["Notices"],
    // }),

    // Видалення з обраного
    // removeFavorite: builder.mutation<void, string>({
    //   query: (id) => ({
    //     url: `/notices/favorites/remove/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ['Notices'],
    // }),

    // Видалення оголошення
    deleteNotice: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Notices'],
    }),

    // Списки для фільтрів
    getNoticesCategories: builder.query<string[], void>({
      query: () => "/notices/categories",
    }),

    getNoticesSex: builder.query<string[], void>({
      query: () => "/notices/sex",
    }),

    getNoticesSpecies: builder.query<string[], void>({
      query: () => "/notices/species",
    }),

    // Пошук міст
    getCities: builder.query<City[], string>({
      query: (keyword) => ({
        url: "/cities",
        params: { keyword },
      }),
    }),
  }),
});

// Експорт хуків
export const {
  useGetNoticesQuery,
  useGetNoticeByIdQuery,
  useDeleteNoticeMutation,
  useGetNoticesCategoriesQuery,
  useGetNoticesSexQuery,
  useGetNoticesSpeciesQuery,
  useGetCitiesQuery,
} = noticesApi;