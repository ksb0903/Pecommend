import { useEffect } from "react";
import { logOut } from "../redux/user_reducer";
import { useDispatch } from "react-redux";
import { authaxios } from "custom/customAxios";

function LogOut() {
  const dispatch = useDispatch();
  const doLogOut = () => dispatch(logOut());

  useEffect(async () => {
    logoutprocess()
      .then(() => {
        after();
        doLogOut();
      })
      .then(() => {
        window.location.href = "/";
      });
  });
}

const logoutprocess = async () => {
  await authaxios.patch("/api/v1/user/logout").catch((error) => {
    console.log(error);
  });
};

const after = async () => {
  sessionStorage.removeItem("Auth");
  sessionStorage.removeItem("Refresh");
};

export default LogOut;
