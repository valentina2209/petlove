import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { toggleTheme } from "./themeSlice";

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  const toggle = () => dispatch(toggleTheme());

  return { theme, toggle };
};