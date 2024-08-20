import { ElementType } from "react";
import { Navigate } from "react-router-dom";
import { useUserState } from "store/reducer/user";

const withAuth =
  <P extends object>(Component: ElementType) =>
  (props: P) => {
    const { user } = useUserState();
    if (!user) {
      return <Navigate to="/login" />;
    }
    return <Component {...props} />;
  };

export default withAuth;
