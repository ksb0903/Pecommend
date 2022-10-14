import React, { useEffect, useState } from "react";
import { freeaxios } from "custom/customAxios";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Login.css";
import Swal from "sweetalert2";

function Search_pwd() {
  const [email, setEmail] = React.useState("");
  const [birth, setBirth] = React.useState("");

  const onEmailhandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onBirthhandler = (event) => {
    setBirth(event.currentTarget.value);
  };

  const sendMail = (event) => {
    event.preventDefault();
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regExp.test(email) === false) {
      Swal.fire({
        icon: "warning",
        title: "실패",
        text: "이메일의 형식이 맞지 않습니다.",
      });
    } else {
      freeaxios
        .get("/api/v1/user/info.do/email/" + email)
        .then(function (response) {
          if (response.status === 200) {
            if (response.data.birthday === birth) {
              Swal.fire({
                icon: "info",
                title: "Loading",
                text: "잠시만 기다려주세요.",
                showConfirmButton: false,
              });
              let body = {
                email: email,
              };
              freeaxios
                .put("/api/v1/user/findpw.do", body)
                .then(function (response_2) {
                  Swal.fire({
                    icon: "success",
                    title: "성공",
                    text: "전송 완료",
                  });
                })
                .catch(function (error) {
                  console.log(error);
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "재시도 후 문의 바랍니다.",
                  });
                });
            } else {
              Swal.fire({
                icon: "warning",
                title: "실패",
                text: "생일을 다시 확인해주세요.",
              });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "warning",
            title: "실패",
            text: "가입되어 있지 않은 메일입니다.",
          });
        });
    }
  };

  return (
    <div className="Login">
      <div className="login-register-area pt-50 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 ms-auto me-auto">
              <div className="login-register-wrapper">
                <div className="login-register-tab-list nav">
                  <a>
                    <h4>비밀번호 찾기</h4>
                  </a>
                </div>
                <div className="tab-content">
                  <div className="login-form-container">
                    <div className="login-register-form">
                      <form>
                        <label>이메일</label>
                        <input
                          name="user-email"
                          placeholder="Email"
                          type="email"
                          onChange={onEmailhandler}
                        />
                        <label>생일</label>
                        <input
                          name="birthday"
                          placeholder="birthday"
                          type="date"
                          max="9999-12-31"
                          onChange={onBirthhandler}
                        />
                        <div className="button-box">
                          <button class="btn" type="submit" onClick={sendMail}>
                            <span>메일 받기</span>
                          </button>
                        </div>
                      </form>
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

export default Search_pwd;
