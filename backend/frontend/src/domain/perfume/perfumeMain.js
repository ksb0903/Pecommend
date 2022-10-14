import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { authaxios, freeaxios } from "custom/customAxios";
import { Rating } from "react-simple-star-rating";
import "./perfumeMain.css";

// 향수 메인 페이지
const PerfumeMain = () => {
  const [hottag, setHottag] = useState([]); // 별점
  const [popularPerfume, setPopularPerfume] = useState([]); // 별점
  const [newReview, setNewReview] = useState([]);
  const [newReview1, setNewReview1] = useState([]); //최신리뷰 1-3
  const [newReview2, setNewReview2] = useState([]); //최신리뷰 4-6

  const getPerfumeHashTag = async () => {
    try {
      const response = await freeaxios({
        method: "get",
        url: "/api/v1/perfume/hottag.do",
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setHottag(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 인기향수 데려오기
  const getPerfumePopularDetail = async () => {
    try {
      const response = await freeaxios({
        method: "get",
        url: "/api/v1/perfume/best.do",
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setPopularPerfume(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //최신리뷰6개
  const getNewReview = async () => {
    try {
      const response = await freeaxios({
        method: "get",
        url: "/api/v1/review/new.do",
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setNewReview(response.data);
        setNewReview1(response.data.slice(0, 3));
        setNewReview2(response.data.slice(3));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPerfumeHashTag();
    getPerfumePopularDetail();
    getNewReview();
  }, []);

  return (
    <div className="perfumeMain">
      <div className="perfume-popular-area pt-50 pb-100">
        <div className="container">
          <div className="product-details-content mt-30">
            <div className="title row">
              <h2 className="title-popular col-xs-6">인기 키워드</h2>
              <div className="title-sub col-xs-6" style={{ display: "none" }}>
                <Link to={"../list"} className="title-sub-link">
                  <div>더보기 {">"}</div>
                </Link>
              </div>
            </div>
            <div className="perfume-popular-hashtag">
              <div className="product-hashtag">
                {hottag.map((data, index) => (
                  <div className="" key={index}>
                    #{data.tName}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 인기향수 */}
        <div className="popular-container">
          <div className="container">
            <div className="product-details-content">
              <div className="title row">
                <h2 className="title-popular col-xs-6">인기 향수</h2>
                <div className="title-sub col-xs-6">
                  <Link to={"../list"} className="title-sub-link">
                    <div>더보기 {">"}</div>
                  </Link>
                </div>
              </div>
              <div className="perfume-popular-items row pl-20 pr-20">
                {popularPerfume.map((data, index) => (
                  <div
                    className="product-wrap perfume-popular-item mb-25 scroll-zoom col-lg-2"
                    key={index}
                  >
                    <div className="product-img">
                      <Link to={`../detail/${data.pDto.perfumeId}`}>
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
                            className="popular-item-img"
                            src={`https://pecommend.com/api/v1/perfume/getimg.do/${data.pDto.enName}`}
                            alt=""
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="product-content text-center">
                      <h3>{data.pDto.koName}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* 최신리뷰 */}
          <div className="product-details-content mt-30">
            <div className="title row ">
              <h2 className="title-popular col-xs-6">최신 리뷰</h2>
              <div className="title-sub col-xs-6">{/* 더보기 {">"} */}</div>
            </div>

            {/* 캐러셀 - 전체를 Link로 감싸기 detail로 이동 */}
            <div
              id="carouselExampleControls"
              className="carousel d-sm-block slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner per_main_review">
                <div className="carousel-item active">
                  <div className="cards-wrapper">
                    {newReview1.map((data, index) => (
                      <div key={index} className="card per_main_review_card">
                        <Link to={`../detail/${data.pDto.perfumeId}`}>
                        <div className="image-wrapper">
                          <img
                            src={`https://pecommend.com/api/v1/perfume/getimg.do/${data.pDto.enName}`}
                            className="card-img-top"
                            alt="..."
                          />
                          <div>
                            <h4 className="card-title">{data.pDto.koName}</h4>
                            <h5 className="card-title-name">
                              {data.rDto.user} 님
                            </h5>
                            <div className="review-rating review-star">
                              <Rating
                                tooltipDefaultText="4"
                                initialValue={`${data.rDto.score}`}
                                readonly
                                size={"20px"}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <p className="card-text per_main_review_text">
                            {data.rDto.content}
                          </p>
                        </div></Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="cards-wrapper">
                    {newReview2.map((data, index) => (
                      <div key={index} className="card per_main_review_card">
                        <div className="image-wrapper">
                          <img
                            src={`https://pecommend.com/api/v1/perfume/getimg.do/${data.pDto.enName}`}
                            className="card-img-top"
                            alt="..."
                          />
                          <div>
                            <h4 className="card-title">{data.pDto.koName}</h4>
                            <h5 className="card-title-name">
                              {data.rDto.user} 님
                            </h5>
                            <div className="review-rating review-star">
                              <Rating
                                tooltipDefaultText="4"
                                initialValue={`${data.rDto.score}`}
                                readonly
                                size={"20px"}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <p className="card-text per_main_review_text">
                            {data.rDto.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
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
                data-bs-target="#carouselExampleControls"
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
      </div>
    </div>
  );
};

export default PerfumeMain;
