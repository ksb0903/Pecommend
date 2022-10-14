import "./communityRegist.css";
import "./communityList.css";
import React, { Component, useEffect, useState } from "react";
import { authaxios, freeaxios } from "../../custom/customAxios";
import { useParams, Link, Route, Router, useNavigate } from "react-router-dom";
import Pagination from "./pagination";
import { useSelector } from "react-redux";

function CommunityList() {
  const user = useSelector((state) => state.userStore.nowLoginUser);

  let useParam = useParams();
  let navigate = useNavigate();
  let categorys = parseInt(useParam.num);
  const [dataList, setDataList] = useState([]);
  const titleName = ["전체", "자유", "향수", "인기", "공지"];
  const [limitData, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limitData;

  const getArticleListLike = async () => {
    if (categorys > 0) {
      try {
        const response = await freeaxios({
          method: "get",
          url: "/api/v1/community/list.do/like/" + categorys,
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
          setDataList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await freeaxios({
          method: "get",
          url: "/api/v1/community/list.do/like",
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
          setDataList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getArticleListBest = async () => {
    if (categorys > 0) {
      try {
        const response = await freeaxios({
          method: "get",
          url: "/api/v1/community/list.do/best/" + categorys,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);
        if (response.status === 200) {
          setDataList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await freeaxios({
          method: "get",
          url: "/api/v1/community/list.do/best",
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
          setDataList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getArticleList = async () => {
    if (categorys > 0 && categorys != 3) {
      try {
        const response = await freeaxios({
          method: "get",
          url: "/api/v1/community/list.do/" + categorys,
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
          setDataList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    else if(categorys === 3){
      try {
        const response = await freeaxios({
          method: "get",
          url: "/api/v1/community/list.do/best",
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
          setDataList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    else {
      try {
        const response = await freeaxios({
          method: "get",
          url: "/api/v1/community/list.do",
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
          setDataList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clickButton1 = () => {
    getArticleList();
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const button3 = document.getElementById("button3");
    button1.setAttribute("class", "community-top-box-active");
    button2.setAttribute("class", "community-top-box-wait");
    button3.setAttribute("class", "community-top-box-wait");
  };
  const clickButton2 = () => {
    getArticleListLike();
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const button3 = document.getElementById("button3");
    button1.setAttribute("class", "community-top-box-wait");
    button2.setAttribute("class", "community-top-box-active");
    button3.setAttribute("class", "community-top-box-wait");
  };
  const clickButton3 = () => {
    getArticleListBest();
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const button3 = document.getElementById("button3");
    button1.setAttribute("class", "community-top-box-wait");
    button2.setAttribute("class", "community-top-box-wait");
    button3.setAttribute("class", "community-top-box-active");
  };

  const getSearch = async () => {
    const data = document.getElementById("dropdownMenuLink");
    const filter = document.getElementById("search-filter");
    let senddata = {
      type: data.name,
      word: filter.value,
    };
    console.log(senddata);
    try {
      const response = await freeaxios({
        method: "get",
        url: "/api/v1/community/search.do",
        params: senddata,
      });
      console.log(response);
      if (response.status === 200) {
        window.history.pushState("", "", "/commu/list/0");
        setDataList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clicksearchfilter = (e) => {
    const data = document.getElementById("dropdownMenuLink");
    data.name = e.target.name;
    data.innerText = e.target.innerText;
  };

  const getToday = (data) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    const dateString = year + "-" + month + "-" + day;
    if (dateString === data) {
      return 0;
    } else if (data.slice(0, 4) == year) {
      return 1;
    } else {
      return 2;
    }
  };

  useEffect(() => {
    getArticleList();
    clickButton1();
  }, [categorys]);

  return (
    <div className="communityRegist">
      <div className="pb-100">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-12 mt-5">
              <div className="row">
                <div className="community-top-box col-lg-6 col-sm-6 col-xs-6">
                  <button
                    className="community-top-box-active"
                    onClick={clickButton1}
                    id="button1"
                  >
                    ㆍ최신
                  </button>
                  <button
                    className="community-top-box-wait"
                    onClick={clickButton2}
                    id="button2"
                  >
                    ㆍ추천
                  </button>
                  <button
                    className="community-top-box-wait"
                    onClick={clickButton3}
                    id="button3"
                  >
                    ㆍHOT
                  </button>
                </div>
                <div className="community-top-regist col-lg-6 col-sm-6 col-xs-6">
                  {user.user_id == null ? (
                    <></>
                  ) : categorys == 3 ? (
                    <></>
                  ) : user.role == "ROLE_ADMIN" ? (
                    <>
                      <button
                        type="button"
                        className="writingBtn"
                        onClick={() =>
                          navigate(`/commu/regist`, { replace: true })
                        }
                      >
                        글 작성
                      </button>
                    </>
                  ) : categorys < 3 ? (
                    <>
                      <button
                        type="button"
                        className="writingBtn"
                        onClick={() =>
                          navigate(`/commu/regist`, { replace: true })
                        }
                      >
                        글 작성
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="selectdown">
                    <select
                      type="number"
                      value={limitData}
                      onChange={({ target: { value } }) =>
                        setLimit(Number(value))
                      }
                    >
                      <option value="10">10개</option>
                      <option value="20">20개</option>
                      <option value="50">50개</option>
                      <option value="100">100개</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="shop-bottom-area mt-15">
                <div className="tab-content jump">
                  <table className="table table-hover">
                    <thead>
                      <tr className="table-top">
                        <th scope="col">#</th>
                        <th scope="col">제목</th>
                        <th scope="col">작성자</th>
                        <th scope="col">작성일</th>
                        <th scope="col">추천</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataList
                        .slice(offset, offset + limitData)
                        .map((data) => (
                          <tr className="table-bottom">
                            <th scope="row" style={{ textAlign: "center" }}>
                              {data.id}
                            </th>
                            <td
                              className=""
                              style={{ textAlign: "left", paddingLeft: "10px" }}
                            >
                              <div className="text-overflow">
                                <Link
                                  className="community-list-titlebox"
                                  to={`/commu/detail/${data.id}`}
                                >
                                  {data.commentCount > 0 ? (
                                    <>
                                      {data.title}
                                      <span
                                        style={{
                                          color: "#333333",
                                          fontSize: "12px",
                                        }}
                                      >
                                        ({data.commentCount})
                                      </span>
                                    </>
                                  ) : (
                                    <>{data.title}</>
                                  )}
                                </Link>
                              </div>
                            </td>
                            <td
                              className=""
                              style={{
                                textAlign: "center",
                                paddingLeft: "15px",
                              }}
                            >
                              <div className="text-overflow">
                                <Link
                                  className=""
                                  to={`/profile/${data.writer_id}`}
                                >
                                  {data.writer}
                                </Link>
                              </div>
                            </td>
                            {getToday(data.createDateYMD) === 0 ? (
                              <td>{data.createDateHMS.slice(0, 5)}</td>
                            ) : getToday(data.createDateYMD) === 1 ? (
                              <td>
                                {data.createDateYMD.slice(5, 7)}/
                                {data.createDateYMD.slice(8, 10)}
                              </td>
                            ) : (
                              <td>{data.createDateYMD}</td>
                            )}
                            <td>{data.communityLike}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  <div>
                    <Pagination
                      total={dataList.length}
                      limit={limitData}
                      page={page}
                      setPage={setPage}
                    />
                  </div>

                  <div className="input-group mb-3 commu_list_search">
                    <div className="input-group-text p-0">
                      <div className="dropdown">
                        <a
                          className="btn dropdown-toggle"
                          role="button"
                          id="dropdownMenuLink"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          name="title"
                        >
                          제목
                        </a>

                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <li>
                            <a
                              className="dropdown-item"
                              id="filter:title"
                              onClick={clicksearchfilter}
                              name="title"
                            >
                              제목
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              id="filter:writer"
                              onClick={clicksearchfilter}
                              name="writer"
                            >
                              작성자
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="commu_list_search_text">
                      <input
                        id="search-filter"
                        type="text"
                        className="form-control"
                        placeholder="Search Here"
                      />
                    </div>
                    <div>
                      <button
                        className="input-group-text commu_list_search_btn shadow-none px-4"
                        onClick={getSearch}
                      >
                        <i className="bi bi-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityList;
