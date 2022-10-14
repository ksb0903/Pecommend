import "./communityMain.css";
import React, { useEffect, useState } from "react";
import { authaxios, freeaxios } from "../../custom/customAxios";
import { Link } from "react-router-dom";

function CommunityMain() {
  const [article_all, setArticleall] = useState([]);
  const [article_free, setArticlefree] = useState([]);
  const [article_perfume, setArticleperfume] = useState([]);
  const [article_hot, setArticlehot] = useState([]);
  const [article_announce, setArticleannounce] = useState([]);

  const titleName = ["전체", "자유", "향수", "인기", "공지"];

  const getArticleList = async () => {
    try {
      const response = await freeaxios({
        method: "get",
        url: "/api/v1/community/list.do/main",
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        const dataset = response.data;

        setArticleall(dataset[0]);
        setArticlefree(dataset[1]);
        setArticleperfume(dataset[2]);
        setArticlehot(dataset[3]);
        setArticleannounce(dataset[4]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticleList();
  }, []);

  return (
    <div className="communityMain">
      <div className="mt-50 pb-100">
        <div className="container commuMain_con">
          <div className="row flex-row-reverse">
            <div className="col-lg-12">
              <div className="community-long-box">
                <div
                  id="community-carousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner long-item-box">
                    {article_hot &&
                      article_hot.map((data, index) =>
                        index == 0 ? (
                          <>
                            <Link
                              className="long-item-title"
                              to={`/commu/detail/${data.id}`}
                            >
                              <div className="carousel-item active long-item-article">
                                {data.category == 1 && (
                                  <img
                                    className="long-item-img"
                                    src="../assets\tempImg\office-g89f42876b_1920.png"
                                    alt=""
                                  />
                                )}
                                {data.category == 2 && (
                                  <img
                                    className="long-item-img"
                                    src="../assets\tempImg\laptop-g3b51ebe8f_1920.png"
                                    alt=""
                                  />
                                )}
                                <div className="long-item-popular">
                                  인기게시글 HOT
                                </div>
                                [{titleName[data.category]}] {data.title}
                                <div className="long-item-text">
                                  {data.content
                                    .replace(/(<([^>]+)>)/gi, "")
                                    .replace("&nbsp;", " ")
                                    .replace("&amp;", "&")
                                    .replace("&lt;", "<")
                                    .replace("&gt;", ">")}
                                </div>
                              </div>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              className="long-item-title"
                              to={`/commu/detail/${data.id}`}
                            >
                              <div className="carousel-item long-item-article">
                                {data.category == 1 && (
                                  <img
                                    className="long-item-img"
                                    src="../assets\tempImg\office-g89f42876b_1920.png"
                                    alt=""
                                  />
                                )}
                                {data.category == 2 && (
                                  <img
                                    className="long-item-img"
                                    src="../assets\tempImg\laptop-g3b51ebe8f_1920.png"
                                    alt=""
                                  />
                                )}
                                <div className="long-item-popular">
                                  인기게시글 HOT
                                </div>
                                [{titleName[data.category]}] {data.title}
                                <div className="long-item-text">
                                  {data.content
                                    .replace(/(<([^>]+)>)/gi, "")
                                    .replace("&nbsp;", " ")
                                    .replace("&amp;", "&")
                                    .replace("&lt;", "<")
                                    .replace("&gt;", ">")}
                                </div>
                              </div>
                            </Link>
                          </>
                        ),
                      )}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#community-carousel"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#community-carousel"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="community-main">
                <div className="col-sm-6 col-xs-12">
                  <div className="community-main-box">
                    <div className="d-flex justify-content-between community-main-box-title">
                      <h4>전체글</h4>
                      <h5>
                        <Link to={`/commu/list/0`}>더보기 {">"}</Link>
                      </h5>
                    </div>
                    <div className="community-article-box">
                      <ul>
                        {article_all != null ? (
                          <>
                            {article_all.map((data) => (
                              <li className="text-overflow">
                                <Link
                                  className="community-list-titlebox"
                                  to={`/commu/detail/${data.id}`}
                                >
                                  [{titleName[data.category]}] {data.title}{" "}
                                  {data.commentCount > 0 && (
                                    <>
                                      <span
                                        style={{
                                          color: "#333333",
                                          fontSize: "12px",
                                        }}
                                      >
                                        ({data.commentCount})
                                      </span>
                                    </>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-12">
                  <div className="community-main-box">
                    <div className="d-flex justify-content-between community-main-box-title">
                      <h4>자유</h4>
                      <h5>
                        <Link to={`/commu/list/1`}>더보기 {">"}</Link>
                      </h5>
                    </div>
                    <div className="community-article-box">
                      <ul>
                        {article_free != null ? (
                          <>
                            {article_free.map((data) => (
                              <li className="text-overflow">
                                <Link
                                  className="community-list-titlebox"
                                  to={`/commu/detail/${data.id}`}
                                >
                                  {data.title}{" "}
                                  {data.commentCount > 0 && (
                                    <>
                                      <span
                                        style={{
                                          color: "#333333",
                                          fontSize: "12px",
                                        }}
                                      >
                                        ({data.commentCount})
                                      </span>
                                    </>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-12">
                  <div className="community-main-box">
                    <div className="d-flex justify-content-between community-main-box-title">
                      <h4>향수</h4>
                      <h5>
                        <Link to={`/commu/list/2`}>더보기 {">"}</Link>
                      </h5>
                    </div>
                    <div className="community-article-box">
                      <ul>
                        {article_perfume != null ? (
                          <>
                            {article_perfume.map((data) => (
                              <li className="text-overflow">
                                <Link
                                  className="community-list-titlebox"
                                  to={`/commu/detail/${data.id}`}
                                >
                                  {data.title}{" "}
                                  {data.commentCount > 0 && (
                                    <>
                                      <span
                                        style={{
                                          color: "#333333",
                                          fontSize: "12px",
                                        }}
                                      >
                                        ({data.commentCount})
                                      </span>
                                    </>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-12">
                  <div className="community-main-box">
                    <div className="d-flex justify-content-between community-main-box-title">
                      <h4>공지</h4>
                      <h5>
                        <Link to={`/commu/list/4`}>더보기 {">"}</Link>
                      </h5>
                    </div>
                    <div className="community-article-box">
                      <ul>
                        {article_announce != null ? (
                          <>
                            {article_announce.map((data) => (
                              <li className="text-overflow">
                                <Link
                                  className="community-list-titlebox"
                                  to={`/commu/detail/${data.id}`}
                                >
                                  {data.title}{" "}
                                  {data.commentCount > 0 && (
                                    <>
                                      <span
                                        style={{
                                          color: "#333333",
                                          fontSize: "12px",
                                        }}
                                      >
                                        ({data.commentCount})
                                      </span>
                                    </>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </ul>
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

export default CommunityMain;
