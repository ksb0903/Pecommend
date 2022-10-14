import React, { useEffect } from "react";
import Nav from "../../components/nav";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  let navigate = useNavigate();
  return (
    <div className="home">
      <div className="home1 mb-50">
        <div className="container">
          <div className="row home-parent">
            <div className="home-title">
              <p
                style={{
                  display: "inline",
                  // textShadow:
                  //   "-2px 0 rgb(92 92 92), 0 2px rgb(92 92 92), 2px 0 rgb(92 92 92), 0 -2px rgb(92 92 92)",
                  textShadow:
                    "2px 2px 2px gray",
                }}
                className="mr-9"
              >
                PECO
              </p>
              <p
                style={{
                  color: "rgb(62 63 69)",
                  display: "inline",
                  fontSize: "48px",
                }}
              >
                MMEND
              </p>
              {/* <h2>We bring you closer to your goals</h2> */}
              <div className="mt-2"><span className="slogan">We bring you closer to your goals</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="home2">
        <div className="container">
          <div className="section-title text-center mb-20 mt-30">
            <h2>HOW</h2>
          </div>
          <div className="row home-feature">
            <div className="col feature-box">
              <img src=".\assets\img/home/feature1.jpg" alt="" />
              <h3>교류</h3>
              <p>회원들과의 소통과</p>
            </div>
            <div className="col feature-box">
              <img src=".\assets\img/home/feature2.jpg" alt="" />
              <h3>추천</h3>
              <p>선호 / 비선호 정보로</p>
            </div>
            <div className="col feature-box">
              <img src=".\assets\img/home/feature3.jpg" alt="" />
              <h3>취향</h3>
              <p>나에게 맞는 향수를</p>
            </div>
          </div>
        </div>
      </div>

      <div className="home3 mb-80">
        <div className="container">
          <div
            className="home-banner"
            onClick={() => navigate("/perfume/main")}
          >
            <div className="banner-box">
              <div className="banner-total">
                <div className="banner-title">PERFUME</div>
                <div className="banner-text">
                  해시태그와 선호도에 따른 다양한 향수를 만나보세요!
                  <br />
                  데이터를 기반으로 연관 향수 추천까지!
                </div>
                {/* <button type="button" className="btn btn-outline-light">
                  &nbsp;바로가기&nbsp;
                </button> */}
                <div className="home-product-hashtag">
                  <div
                    className=""
                    style={{ backgroundColor: "rgb(241 169 131)" }}
                  >
                    #좋아요
                  </div>
                  <div
                    className=""
                    style={{ backgroundColor: "rgb(199 188 187)" }}
                  >
                    #싫어요
                  </div>
                  <div
                    className=""
                    style={{ backgroundColor: "rgb(171 145 146)" }}
                  >
                    #리뷰
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-banner2" onClick={() => navigate("/commu/main")}>
            <div className="banner-box2">
              <div className="banner-total">
                <div className="banner-title">COMMUNITY</div>
                <div className="banner-text">
                  다양한 게시판을 통해 다른 회원들과 의견을 나눠보세요! <br />
                  인기 게시판을 통해 회원들의 관심 게시글을 확인해보세요!
                </div>
                <div className="home-product-hashtag">
                  <div
                    className=""
                    style={{ backgroundColor: "rgb(153 187 255)" }}
                  >
                    #향수
                  </div>
                  <div className="" style={{ backgroundColor: "#deb6ff" }}>
                    #자유
                  </div>
                  <div className="" style={{ backgroundColor: "#ffda3c" }}>
                    #인기
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-banner3 " onClick={() => navigate("/test")}>
            <div className="banner-box">
              <div className="banner-total">
                <div className="banner-title">TEST</div>
                <div className="banner-text">
                  {/* 향수를 처음 접하신다면? 간단한 Test를 통해서 향수를 추천받으며 향수를 접해보고 알아가보세요! */}
                  당신은 어떤 향수가 어울릴까요?
                </div>
                <div className="home-product-hashtag">
                  <div
                    className=""
                    style={{ backgroundColor: "rgb(120 126 114)" }}
                  >
                    #간단하게
                  </div>
                  <div
                    className=""
                    style={{ backgroundColor: "rgb(201 177 155)" }}
                  >
                    #향수추천
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
