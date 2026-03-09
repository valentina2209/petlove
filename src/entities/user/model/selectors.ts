import { RootState } from "@/app/providers/StoreProvider/store"; 

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectToken = (state: RootState) => state.auth.token;

// Оскільки в твоєму слайсі поки немає стейтуRefreshing, 
// створимо заглушку або просто селектор, щоб PrivateRoute не сварився
export const selectIsRefreshing = (state: RootState) => false;