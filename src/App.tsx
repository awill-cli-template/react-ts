import "./App.scoped.scss";
import clsx from "clsx";
import Header from "components/Header";
import { useUserState } from "store/reducer/user";
import { RouterProvider } from "react-router-dom";
import router from "router/index";

const myClass = clsx("bg");
function App() {
  const state = useUserState();
  return (
    <div className={`flex flex-row flex-wrap gap-x-[20px] gap-y-[10px] ${myClass}`}>
      <Header />
      <div className={`h-8 w-12 font-Ali`}>{state?.user}</div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
