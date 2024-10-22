/* // src/hooks/useAuthState.ts
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logOut } from "/redux/feature/authSlice";

const useAuthState = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = !!token;

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return {
    user,
    token,
    isAuthenticated,
    logOut: handleLogOut,
  };
};

export default useAuthState;
 */
