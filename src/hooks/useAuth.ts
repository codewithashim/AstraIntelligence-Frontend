import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from "./reduxHooks";
import { RootState } from "@/redux/store";
import { storageUtils } from "@/utils/storage-util";
import { setAuthState, clearAuthState, IAuthState, selectToken, selectIsAuthenticated } from "@/redux/slices/authSlice";

const AUTH_STORAGE_KEY = "authState";

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const loginUser = useAppSelector((state) => state.auth?.user);
  const userRole = loginUser?.role;
  const authToken = useSelector(selectToken);
  const isLogin = useSelector(selectIsAuthenticated);

  const initAuth = () => {
    const authState = storageUtils.get<IAuthState>(AUTH_STORAGE_KEY);
    if (authState) {
      dispatch(setAuthState(authState));
    }
  };

  const logout = () => {
    dispatch(clearAuthState());
  };

  const isAuthenticated = (): boolean => {
    return isLogin && !!authToken;
  };

  return {
    ...auth,
    initAuth,
    logout,
    loginUser,
    user: loginUser,
    userRole,
    authToken,
    isLogin,
    isAuthenticated
  };
};