import { useEffect } from "react";
import queryString from "query-string";
import { setUser } from "../../redux/user_reducer";
import { useSelector, useDispatch } from "react-redux";
import {authaxios} from "../../custom/customAxios";

function Oauth() {
  const user = useSelector((state) => state.userStore.nowLoginUser);

  const dispatch = useDispatch();
  const saveUser = (data) => dispatch(setUser(data));

  const getUserInfo = async () => {
    try {
      const response = await authaxios({
        method: "get",
        url: "/api/v1/user/myinfo",
        
      });

      if (
        response.data.birth == null &&
        response.data.gender == null &&
        response.data.mbti == null
      ) {
        return false;
      }

      const saveInfo = {
        user_id: response.data.user_id,
        email: response.data.email,
        nickname: response.data.nickname,
        role: response.data.role
      };

      saveUser(saveInfo);

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    var tokens = queryString.parse(window.location.search);

    sessionStorage.setItem("Auth", tokens.Auth);
    sessionStorage.setItem("Refresh", tokens.Refresh);

    getUserInfo().then((response) => {
      if (response) {
        window.location.href = "/";
      } else {
        window.location.href = "/oauth/signup";
      }
    });
  }, []);
}

export default Oauth;
