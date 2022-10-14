import { Routes, Route, useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/layout";
import CommunityList from "./domain/community/communityList";
import CommunityDetail from "./domain/community/communityDetail";
import CommunityMain from "./domain/community/communityMain";
import CommunityRegist from "./domain/community/communityRegist";
import CommunityEdit from "domain/community/communityEdit";
import Community from "domain/community/community";
import Perfume from "./domain/perfume/perfume";
import PerfumeList from "./domain/perfume/perfumeList";
import PerfumeDetail from "./domain/perfume/perfumeDetail";
import PerfumeMain from "./domain/perfume/perfumeMain";
import PerfumeRegistList from "./domain/perfume/perfumeRegistList";
import PerfumeRegist from "./domain/perfume/perfumeRegist";
import Test from "./domain/test/test";
import Login from "./domain/user/Login";
import Search_pwd from "domain/user/searchpwd";
import Profile from "./domain/user/profile";
import Profile_update from "./domain/user/profile_update";
import Oauth from "./domain/user/oauth";
import OauthSignUp from "domain/user/oauthSignUp";
import Home from "./domain/home/home";
import NotFound from "./domain/error/NotFound";
import LogOut from "components/logout";

function App() {
  const isLogined = useSelector((state) => state.userStore.isLogined);

  const element = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "perfume/*",
          element: <Perfume />,
          children: [
            { path: "list", element: <PerfumeList /> },
            { path: "detail/:num", element: <PerfumeDetail /> },
            { path: "reglist", element: <PerfumeRegistList /> },
            { path: "reg", element: <PerfumeRegist /> },
          ],
        },
        {
          path: "commu/*",
          element: <Community />,
          children: [
            { path: "detail/:num", element: <CommunityDetail /> },
            { path: "list/:num", element: <CommunityList /> },
            {
              path: "regist",
              element: isLogined ? (
                <CommunityRegist />
              ) : (
                <Navigate to="/login" />
              ),
            },
            {
              path: "commu/edit/:num",
              element: isLogined ? <CommunityEdit /> : <Navigate to="/login" />,
            },
          ],
        },
        {
          path: "profile/:num",
          element: <Profile />,
        },
        {
          path: "profile/update",
          element: isLogined ? <Profile_update /> : <Navigate to="/login" />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "searchpwd",
          element: <Search_pwd />
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "commutest",
          element: <Community />,
        },
        {
          path: "oauth",
          element: <Oauth />,
        },
        {
          path: "oauth/signup",
          element: <OauthSignUp />,
        },
        {
          path: "logout",
          element: <LogOut />
        },
        {
          path: "test",
          element: <Test />
        }
      ],
    },
  ]);
  return element;
}

export default App;
