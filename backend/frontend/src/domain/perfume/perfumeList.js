import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link, Routes, Route } from "react-router-dom";
import { authaxios, freeaxios } from "custom/customAxios";
import { useNavigate } from "react-router-dom";
// import Pagination from "../community/pagination";
// import Pagination from "@mui/material/Pagination";
import "./perfumeList.css";
// import "./perfumeList.scss";

const PerfumeList = () => {
  // let useParam = useParams();
  // let page = parseInt(useParam.num);
  const [dataList, setDataList] = useState([]); //향수리스트
  // const [callData, setCallData] = useState(1);
  // const [limitData, setLimit] = useState(16); //한페이지당?
  // const offset = (page - 1) * limitData;
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [pageCnt, setPageCnt] = useState(1);
  const mbtiList = [
    "ISTJ",
    "ISTP",
    "ISFJ",
    "ISFP",
    "INTJ",
    "INTP",
    "INFJ",
    "INFP",
    "ESTJ",
    "ESTP",
    "ESFJ",
    "ESFP",
    "ENTJ",
    "ENTP",
    "ENFJ",
    "ENFP",
  ];

  // 필터링
  const [searchFilter, setSearchFilter] = useState({
    ages: [],
    gender: [],
    mbti: [],
  });
  //성별
  const [checkedGender, setCheckedGender] = useState([]);
  const genderChangeHandler = (checked, id) => {
    if (checked) {
      setCheckedGender([...checkedGender, id]);
    } else {
      setCheckedGender(checkedGender.filter((button) => button !== id));
    }
  };
  //연령
  const [checkedAge, setCheckedAge] = useState([]);
  const ageChangeHandler = (checked, id) => {
    if (checked) {
      setCheckedAge([...checkedAge, id]);
    } else {
      setCheckedAge(checkedAge.filter((button) => button !== id));
    }
  };
  //mbti
  const [checkedMbti, setCheckedMbti] = useState([]);
  const mbtiChangeHandler = (checked, id) => {
    if (checked) {
      setCheckedMbti([...checkedMbti, id]);
    } else {
      setCheckedMbti(checkedMbti.filter((button) => button !== id));
    }
  };

  useEffect(() => {
    changeState();
  }, [checkedMbti, checkedAge, checkedGender]);

  useEffect(() => {
    if (
      checkedMbti.length === 0 &&
      checkedAge.length === 0 &&
      checkedGender.length === 0
    ) {
    } else {
      changeFilter();
    }
  }, [searchFilter]);

  const changeState = () => {
    setSearchFilter({
      ages: checkedAge,
      gender: checkedGender,
      mbti: checkedMbti,
    });
  };
  //change 할때마다 seachFilter에 담아서 요청보내기
  const changeFilter = async () => {
    if (searchFilter !== null) {
      try {
        const response = await freeaxios({
          method: "post",
          url: "/api/v1/perfume/list.do/filter/page/" + page,
          // headers: { "Content-Type": "multipart/form-data" },
          data: searchFilter,
          responseType: "json",
          charset: "utf-8",
          responseEncodig: "utf-8",
        });
        if (response.status === 200) {
          // setDataList(response.data);
          setDataList(response.data.dtoList);
          setTotalCnt(response.data.totalCnt);
          setPageCnt(response.data.pageCnt);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // useEffect(() => {
  //   getPerfumeList();
  // }, []);
  useEffect(() => {
    if (keyWord.length !== 0) {
      getPerfumeSearchList();
    } else if (
      !(
        checkedMbti.length === 0 &&
        checkedAge.length === 0 &&
        checkedGender.length === 0
      )
    ) {
      changeFilter();
    } else {
      getPerfumeList();
    }
  }, [page]);

  const getPerfumeList = async () => {
    try {
      const response = await freeaxios({
        method: "get",
        url: "/api/v1/perfume/list.do/page/" + page,
        // data: registwrite,
        headers: { "Content-Type": "multipart/form-data" },
        // headers: { "Content-Type" : ""}
        // JSON.stringify()
      });
      if (response.status === 200) {
        setDataList(response.data.dtoList);
        setTotalCnt(response.data.totalCnt);
        setPageCnt(response.data.pageCnt);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [keyWord, setKeyWord] = useState(""); //검색키워드
  const getPerfumeSearchList = async () => {
    try {
      const response = await freeaxios({
        method: "get",
        url: "/api/v1/perfume/list.do/" + keyWord + "/page/" + page,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setDataList(response.data.dtoList);
        setTotalCnt(response.data.totalCnt);
        setPageCnt(response.data.pageCnt);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const keywordSearch = (e) => {
    setPage(1);
    e.preventDefault();
    console.log(keyWord);
    getPerfumeSearchList();
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      keywordSearch();
    }
  };

  return (
    <div className="perfumeList">
      <div className="shop-area pt-95 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  padding: "12px",
                  marginBottom: "30px",
                }}
                className=""
              >
                <div className="sidebar-style">
                  <div className="sidebar-widget">
                    <div className="pro-sidebar-search mb-50 mt-10">
                      <form className="pro-sidebar-search-form">
                        <input
                          type="text"
                          placeholder="향수명 검색"
                          onChange={(e) => setKeyWord(e.target.value)}
                          onKeyPress={onKeyPress}
                          defaultValue=""
                        />
                        <button onClick={(e) => keywordSearch(e)}>
                          <i className="pe-7s-search"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="sidebar-widget text-center">
                    <h4>선호도 검색</h4>
                    <br></br>
                  </div>

                  <div className="sidebar-widget">
                    <div className="side_button">
                      <span className="pro-sidebar-title">성별</span>
                      <button
                        className="btn side_in_button side_btn"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#Collapse1"
                        aria-expanded="false"
                        aria-controls="Collapse1"
                      ></button>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="collapse show" id="Collapse1">
                          <ul className="list-group list-group-horizontal">
                            <li className="list-group-item border-0">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                defaultValue=""
                                aria-label="..."
                                onChange={(e) => {
                                  genderChangeHandler(
                                    e.currentTarget.checked,
                                    "male",
                                  );
                                }}
                                checked={
                                  checkedGender.includes("male") ? true : false
                                }
                              />
                              남성
                            </li>
                            <li className="list-group-item border-0">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                defaultValue=""
                                aria-label="..."
                                onChange={(e) => {
                                  genderChangeHandler(
                                    e.currentTarget.checked,
                                    "female",
                                  );
                                }}
                                checked={
                                  checkedGender.includes("female")
                                    ? true
                                    : false
                                }
                              />
                              여성
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="side_button">
                      <span className="pro-sidebar-title">연령대</span>
                      <button
                        className="btn side_in_button side_btn"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#Collapse2"
                        aria-expanded="true"
                        aria-controls="Collapse2"
                      ></button>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="collapse show" id="Collapse2">
                          <ul className="list-group list-group">
                            <li className="list-group-item border-0">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                defaultValue=""
                                aria-label="..."
                                onChange={(e) => {
                                  ageChangeHandler(e.currentTarget.checked, 10);
                                }}
                                checked={checkedAge.includes(10) ? true : false}
                              />
                              10대
                            </li>
                            <li className="list-group-item border-0">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                defaultValue=""
                                aria-label="..."
                                onChange={(e) => {
                                  ageChangeHandler(e.currentTarget.checked, 20);
                                }}
                                checked={checkedAge.includes(20) ? true : false}
                              />
                              20대
                            </li>
                            <li className="list-group-item border-0">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                defaultValue=""
                                aria-label="..."
                                onChange={(e) => {
                                  ageChangeHandler(e.currentTarget.checked, 30);
                                }}
                                checked={checkedAge.includes(30) ? true : false}
                              />
                              30대
                            </li>
                            <li className="list-group-item border-0">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                defaultValue=""
                                aria-label="..."
                                onChange={(e) => {
                                  ageChangeHandler(e.currentTarget.checked, 40);
                                }}
                                checked={checkedAge.includes(40) ? true : false}
                              />
                              40대 이상
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="side_button">
                      <span className="pro-sidebar-title">MBTI</span>
                      <button
                        className="btn side_in_button side_btn"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#Collapse3"
                        aria-expanded="true"
                        aria-controls="Collapse3"
                      ></button>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="collapse show" id="Collapse3">
                          <ul className="list-group list-group">
                            <li
                              className="list-group-item border-0 justify-content-between row pl-10"
                              style={{
                                display: "flex",
                                marginLeft: "0",
                                width: "90%",
                              }}
                            >
                              {mbtiList.map((data, index) => (
                                <div
                                  style={{
                                    width: "50%",
                                    marginBottom: "10px",
                                  }}
                                  key={index}
                                >
                                  <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    defaultValue=""
                                    aria-label="..."
                                    onChange={(e) => {
                                      mbtiChangeHandler(
                                        e.currentTarget.checked,
                                        `${data}`,
                                      );
                                    }}
                                    checked={
                                      checkedMbti.includes(`${data}`)
                                        ? true
                                        : false
                                    }
                                  />
                                  {data}
                                </div>
                              ))}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="sidebar-widget mt-50"
                  style={{ display: "none" }}
                >
                  <h4 className="pro-sidebar-title">해시태그 </h4>
                  <div className="sidebar-widget-tag mt-25">
                    <ul>
                      <li>
                        <a href="#"># 봄</a>
                      </li>
                      <li>
                        <a href="#"># 여름</a>
                      </li>
                      <li>
                        <a href="#"># 가을</a>
                      </li>
                      <li>
                        <a href="#"># 겨울</a>
                      </li>
                      <li>
                        <a href="#"># 해시태그가어디까지길어지는거죠?</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="shop-top-bar">
                <div
                  className="select-shoing-wrap pl-20"
                  style={{ width: "100%" }}
                >
                  <div className="shop-select">
                    <select style={{ display: "none" }}>
                      <option defaultValue="">정렬</option>
                      <option defaultValue="">추천순</option>
                      <option defaultValue="">추천비율순</option>
                    </select>
                  </div>
                  <div className="pr-20" style={{ marginLeft: "auto" }}>
                    총 {totalCnt}개
                  </div>
                </div>
              </div>
              <div className="shop-bottom-area mt-35">
                <div className="tab-content jump">
                  <div id="shop-1" className="tab-pane active">
                    <div className="row">
                      {dataList.length === 0 ? (
                        <div>
                          <div
                            className="mt-50 mb-50"
                            style={{ textAlign: "center", fontSize: "25px" }}
                          >
                            {" "}
                            해당 조건에 맞는 향수가 없습니다.
                          </div>
                        </div>
                      ) : (
                        <>
                          {dataList.map((data) => (
                            <div
                              key={data.pDto.perfumeId}
                              className="col-xl-3 col-md-3 col-lg-3 col-sm-6"
                            >
                              <div className="product-wrap mb-25 scroll-zoom ">
                                <div className="product-img">
                                  <Link
                                    to={`/perfume/detail/${data.pDto.perfumeId}`}
                                  >
                                    <div className="text_photo">
                                      <div className="explain">
                                        <div className="list-hashtag">
                                          {data.tDto.map((temp, index) => (
                                            <div className="" key={index}>
                                              #{temp.tagName}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      <img
                                        className="default-img"
                                        src={`https://pecommend.com/api/v1/perfume/getimg.do/${data.pDto.enName}`}
                                        alt=""
                                      />
                                    </div>
                                  </Link>
                                </div>
                                <div className="product-content text-center perfume_list_name">
                                  <div className="product-content-koName">
                                    {data.pDto.koName}
                                  </div>
                                  <div className="product-content-enName">
                                    ({data.pDto.enName})
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex" }} className="perfume_list_page">
                  <Button
                    variant="outline-secondary perfume_list_btn"
                    onClick={() => {
                      page <= 1 ? setPage(1) : setPage(page - 1);
                    }}
                  >
                    이전
                  </Button>
                  <div className="perfume_list_page_text">
                    <div className="ml-15" style={{ color: "#0d6efd" }}>
                      {page}&nbsp;
                    </div>
                    <div className="mr-15" style={{ fontWeight: "bold" }}>
                      {" "}
                      / {pageCnt}
                    </div>
                  </div>
                  <Button
                    variant="outline-secondary perfume_list_btn"
                    onClick={() => {
                      page >= pageCnt ? setPage(pageCnt) : setPage(page + 1);
                    }}
                  >
                    다음
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeList;
