import { useUserDispatch } from "store/reducer/user";
import { useNavigate } from "react-router-dom";
import { Get } from "apis/request";

const Login = () => {
  const dispatch = useUserDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    Get("/user/1", { a: 1 }).then(() => {
      dispatch({ type: "SET_USER", payload: "true" });
      navigate("/home");
    });
  };
  return (
    <div>
      <h1 onClick={handleLogin}>Login</h1>
    </div>
  );
};

export default Login;
