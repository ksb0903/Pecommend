import { NavLink, Link, Routes, Route } from "react-router-dom";
import PerfumeList from "./perfumeList";
import PerfumeDetail from "./perfumeDetail";
import PerfumeMain from "./perfumeMain";
import PerfumeRegistList from "./perfumeRegistList";
import PerfumeRegist from "./perfumeRegist";
import React, { useState } from "react";
import "./perfume.css";
// import "./perfumeList.scss";


const Perfume = () => {
  return (
    <div>
      <div className="container-temp">
        <div className="pernav">
          <div className="pernav-header">
            <div className="pernav-header-title tac">
              <span>PERFUME</span>
            </div>
          </div>
          <div className="pernav-header-menu">
            <div className="per-nav n3">
              <ul className="mb-0">
                <li>
                  <NavLink
                    to="main"
                    className={({ isActive }) =>
                      isActive ? "is-active" : "is-not"
                    }
                  >
                    메인
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="list"
                    className={({ isActive }) =>
                      isActive ? "is-active" : "is-not"
                    }
                  >
                    목록
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="reglist"
                    className={({ isActive }) =>
                      isActive ? "is-active" : "is-not"
                    }
                  >
                    신청
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="main" element={<PerfumeMain />} />
        <Route path="list" element={<PerfumeList />} />
        <Route path="detail/:num" element={<PerfumeDetail />} />
        <Route path="reglist" element={<PerfumeRegistList />} />
        <Route path="reg" element={<PerfumeRegist />} />
      </Routes>
    </div>
  );
};

export default Perfume;
