import "./communitySidebar.css";
import React, { useState } from "react";

function communitySidebar() {
  return (
    <div className="community-topbar">
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            전체
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            자유
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            향수
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            인기
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            베스트
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            질문
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            공지
          </a>
        </li>
        <div className="pro-sidebar-search searchbar">
          <form
            className="pro-sidebar-search-form"
            action="#"
            style={{ marginBottom: "-1px" }}
          >
            <input
              type="text"
              placeholder="Search here..."
              style={{
                backgroundColor: "rgb(255,255,255)",
                marginBottom: "-1px",
                height: "40px",
              }}
            />
            <button>
              <i className="pe-7s-search"></i>
            </button>
          </form>
        </div>
      </ul>
    </div>
  );
}

export default communitySidebar;
