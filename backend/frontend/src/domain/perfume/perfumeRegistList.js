import { authaxios, freeaxios } from "custom/customAxios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import Pagination from "../community/pagination";
import "./perfumeRegistList.css";

function PerfumeRegistList() {
  const user = useSelector((state) => state.userStore.nowLoginUser);
  const [registList, setRegistList] = useState([]);

  const [limitData, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limitData;

  const getRegistList = async () => {
    try {
      const response = await freeaxios({
        method: "get",
        url: "/api/v1/regist/list.do",
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setRegistList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setStatus = async (number, e) => {
    try {
      const response = await authaxios({
        method: "patch",
        url: "/api/v1/regist/" + e.target.id,
        params: {
          newStatus: number,
        },
      });
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRegistList();
  }, []);

  return (
    <div className="perfumeRegistList">
      <div
        className="container mt-50 mb-100"
        style={{ width: "70%", minWidth: "500px" }}
      >
        <div>
          <div class="alert alert-secondary" role="alert">
            * PECO에서 보고싶은 미등록 향수가 있다면 신청해주세요.
          </div>
        </div>
        <div className="top-bar">
          <h4>향수 등록 신청 목록</h4>
          <div className="button-right">
            <Link to={"../reg"}>
              <button type="button" className="registbutton">
                신청하기
              </button>
            </Link>
          </div>
        </div>

        <div className="perfume-list">
          <div>
            {registList.map((data) => (
              <div className="row perfume">
                <div className="col-md-3 perfumeBox">
                  <img
                    className="perfumeImg"
                    alt=""
                    src={`https://pecommend.com/api/v1/regist/img.do/${data.img}`}
                  />
                </div>
                <div className="col-md-7 perfumeText d-flex flex-column justify-content-center align-items-start">
                  <h4>{data.name}</h4>
                  <h4>{data.company}</h4>
                  <textarea readOnly rows="3" className="describe">
                    {data.describe}
                  </textarea>
                  <h5>신청자 : {data.user}</h5>
                </div>
                <div className="col-md-2 perfumeState">
                  {data.status == 0 ? (
                    <>
                      <span className="perfumeState-Wait">검토중</span>
                    </>
                  ) : data.status == 1 ? (
                    <>
                      <span className="perfumeState-Accept">추가 완료</span>
                    </>
                  ) : (
                    <>
                      <span className="perfumeState-Denied">반려됨</span>
                    </>
                  )}
                  {user.role === "ROLE_ADMIN" ? (
                    <>
                      <div>
                        <button
                          id={`${data.id}`}
                          onClick={(e) => setStatus(0, e)}
                        >
                          검토
                        </button>
                        <button
                          id={`${data.id}`}
                          onClick={(e) => setStatus(1, e)}
                        >
                          완료
                        </button>
                        <button
                          id={`${data.id}`}
                          onClick={(e) => setStatus(2, e)}
                        >
                          반려
                        </button>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Pagination
            total={registList.length}
            limit={limitData}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default PerfumeRegistList;
