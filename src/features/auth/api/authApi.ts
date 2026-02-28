import { baseApi } from "@/shared/api/baseApi"
import { RegisterRequest, AuthResponse } from "@/entities/user/model/types"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: "/users/signup",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useRegisterMutation } = authApi