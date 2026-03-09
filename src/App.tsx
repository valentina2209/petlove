import { useDispatch } from "react-redux";
import AppRouter from "./app/providers/router/ui/AppRouter";
import { useEffect } from "react";
import { setCredentials } from "./entities/user/model/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Відправляємо токен назад у Redux, щоб isLoggedIn став true
      dispatch(setCredentials({ token }));
    }
  }, [dispatch]);

  return (
    <AppRouter />
  );
}

export default App;
