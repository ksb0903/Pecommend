/* eslint-disable */
import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="container mt-150 mb-150" style={{ textAlign: "center" }}>
        <h1>요청하신 페이지가 존재하지 않습니다.</h1>
        <h4>주소가 변경되거나 삭제되어 요청하신 페이지를 찾을 수 없습니다.</h4>
        <Link to={"/"}><h5>홈으로 돌아가기</h5></Link>
      </div>
    </div >
  );
}

export default NotFound;