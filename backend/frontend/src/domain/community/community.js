// import { Outlet } from "react-router-dom";
import { NavLink, Link, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import CommunityDetail from "./communityDetail";
import CommunityMain from "./communityMain";
import CommunityList from "./communityList";
import CommunityRegist from "./communityRegist";
import CommunityEdit from "./communityEdit";
import "./community.css";

const Community = () => {
    

  return (
    <div>
      <div className="container-temp">
        <div className="pernav">
          <div className="pernav-header">
            <div className="comnav-header-title tac">
              <span>COMMUNITY</span>
            </div>
          </div>
          <div className="pernav-header-menu">
            <div className="per-nav n7">
              <ul className="mb-0">
                {/* <li className="is-active">
                  <Link to="">메인</Link>
                </li>
                <li>
                  <Link to="list/0">전체</Link>
                </li>
                <li>
                  <Link to="list/1">자유</Link>
                </li>
                <li>
                  <Link to="list/2">향수</Link>
                </li>
                <li>
                  <Link to="list/3">인기</Link>
                </li>
                <li>
                  <Link to="list/4">공지</Link>
                </li> */}
                <li>
                  <NavLink to="main" className={({isActive}) => (isActive ? "is-active" : "is-not")}>메인</NavLink>
                </li>
                <li>
                  <NavLink to="list/0" className={({isActive}) => (isActive ? "is-active" : "is-not")}>전체</NavLink>
                </li>
                <li>
                  <NavLink to="list/1" className={({isActive}) => (isActive ? "is-active" : "is-not")}>자유</NavLink>
                </li>
                <li>
                  <NavLink to="list/2" className={({isActive}) => (isActive ? "is-active" : "is-not")}>향수</NavLink>
                </li>
                <li>
                  <NavLink to="list/3" className={({isActive}) => (isActive ? "is-active" : "is-not")}>인기</NavLink>
                </li>
                <li>
                  <NavLink to="list/4" className={({isActive}) => (isActive ? "is-active" : "is-not")}>공지</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="main" element={<CommunityMain />} />
        <Route path="list/:num" element={<CommunityList />} />
        <Route path="detail/:num" element={<CommunityDetail />} />
        <Route path="regist" element={<CommunityRegist />} />
        <Route path="edit/:num" element={<CommunityEdit />} />
      </Routes>
    </div>
  );
};

export default Community;
