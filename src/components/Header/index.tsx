import "./index.scoped.scss";
import clsx from "clsx";
import { useUserDispatch } from "store/reducer/user";

const myClass = clsx("bg");

const Header = () => {
  const dispatch = useUserDispatch();
  return (
    <div className={`h-10 w-96 ${myClass}`}>
      <button
        className="h-8 w-12"
        onClick={() => {
          dispatch({ type: "SET_USER_ASYNC", payload: false });
        }}
      >
        点击
      </button>
    </div>
  );
};

export default Header;
