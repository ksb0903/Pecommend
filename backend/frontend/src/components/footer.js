import { Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer-area bg-gray pt-100 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12">
            <div className="copyright mb-30">
              <div className="footer-logo">
                <a href="/">
                  <img alt="" src="assets/img/logo/logo-3.PNG" style={{ height: "26px" }} />
                </a>
              </div>
              <p>
                © 2022 <a href="#">PECO</a>.<br /> All Rights Reserved
              </p>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <div>메뉴</div>
              </div>

              <div className="footer-list">
                <ul>
                  <li>
                    <a href="/">HOME</a>
                  </li>
                  <li>
                    <a href="/perfume/main">PERFUME</a>
                  </li>
                  <li>
                    <a href="/commu/main">COMMUNITY</a>
                  </li>
                  <li>
                    <a href="/test">TEST</a>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <div>문의 & 피드백</div>
              </div>
              <div className="subscribe-style">
                {/* <hr /> */}
                <p>
                  pecommend@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
