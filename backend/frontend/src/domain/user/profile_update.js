import "./Login.css";
import { authaxios, freeaxios } from "../../custom/customAxios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/user_reducer";
import { logOut } from "../../redux/user_reducer";
import Swal from "sweetalert2";

function Profile_update() {
  const user = useSelector((state) => state.userStore.nowLoginUser);

  const dispatch = useDispatch();
  const saveUser = (data) => dispatch(setUser(data));

  const [pwd, setPwd] = React.useState("");
  const [pwdRe, setPwdRe] = React.useState("");
  const [birth, setBirth] = React.useState("");
  const [nick, setNick] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [mbti, setMbti] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState(true);
  const [nick_check, setNickCheck] = React.useState(true);
  const [pwd_disabled, setPwdDisabled] = React.useState(true);
  const [nick_disabled, setNickDisabled] = React.useState(true);
  const [userprofile, setUserProfile] = React.useState([]);
  const [nick_change_msg, setNickChangeMsg] = React.useState("변경");
  const [pwd_change_msg, setPwdChangeMsg] = React.useState("변경");
  const [introduction, setIntroduction] = React.useState("");

  const getUserInfo = async () => {
    try {
      const response = await authaxios({
        method: "get",
        url: "/api/v1/user/myinfo",
      });
      if (response.status === 200) {
        setUserProfile(response.data);
        setBirth(response.data.birthday);
        setGender(response.data.gender);
        setNick(response.data.nickname);
        setMbti(response.data.mbti);
        setIntroduction(response.data.introduction);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const onRPWDhandler = (event) => {
    setPwd(event.currentTarget.value);
  };

  const onPWDReHandler = (event) => {
    setPwdRe(event.currentTarget.value);
  };

  const onBirthhandler = (event) => {
    setBirth(event.currentTarget.value);
  };

  const onNicknamehandler = (event) => {
    setNick(event.currentTarget.value);
    setNickCheck(false);
  };

  const onGenderHandler = (event) => {
    setGender(event.currentTarget.value);
  };

  const onMbtiHandler = (event) => {
    setMbti(event.currentTarget.value);
  };

  const onIntroduction = (event) => {
    setIntroduction(event.currentTarget.value);
  };

  const checkAge = (data) => {
    const nums = data.split("-");
    const today = new Date();
    const birthDate = new Date(nums[0], nums[1], nums[2]);

    let age = today.getFullYear() - birthDate.getFullYear() + 1;

    return parseInt(age / 10) * 10;
  };

  // 비밀번호 유효성 검사
  const checkPassword = (password) => {
    // 8~16자리 문자, 숫자, 특수문자 조합.
    const regExp = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;
    if (regExp.test(password) === false) {
      return false;
    } else {
      return true;
    }
  };

  // 닉네임 중복검사
  const checkNickname = (event) => {
    event.preventDefault();
    if (nick.length >= 2 && nick.length <= 8) {
      freeaxios
        .get("/api/v1/user/check.do/nickname/" + nick)
        .then(function (response) {
          if (response.data === true) {
            Swal.fire({
              icon: "warning",
              title: "실패",
              text: "이미 존재하는 닉네임입니다.",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "성공",
              text: "사용 가능한 닉네임입니다.",
            });
            setNickCheck(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "재시도 후 문의바랍니다.",
          });
        });
    };
  };

  const changeNickname = (event) => {
    event.preventDefault();
    if (nick_disabled) {
      Swal.fire({
        title: '닉네임을 변경하시겠습니까?',
        text: " ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          setNickDisabled(false);
          setNickCheck(false);
          setNickChangeMsg("변경 취소");
        }
      })
    } else {
      Swal.fire({
        title: '닉네임을 변경을 취소하시겠습니까?',
        text: " ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          setNickDisabled(true);
          setNickCheck(true);
          setNick(userprofile.nickname);
          setNickChangeMsg("변경");
        }
      })
    }
  };

  const changePassword = (event) => {
    event.preventDefault();
    if (pwd_disabled) {
      Swal.fire({
        title: "비밀번호를 변경하시겠습니까?",
        text: " ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          setPwdDisabled(false);
          setPwdCheck(false);
          setPwdChangeMsg("변경 취소");
        }
      })
    } else {
      Swal.fire({
        title: "비밀번호 변경을 취소하시겠습니까?",
        text: " ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          setPwdDisabled(true);
          setPwdCheck(true);
          setPwd("");
          setPwdRe("");
          setPwdChangeMsg("변경");
        }
      })
    }
  };

  const isMale = () => {
    return gender == "male" ? "checked" : "";
  };

  const isFemale = () => {
    return gender == "female" ? "checked" : "";
  };

  const deleteUser = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "정말로 탈퇴하시겠습니까?",
      text: " ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        authaxios
          .delete("/api/v1/user/delete")
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "성공",
              text: "탈퇴가 완료되었습니다.",
            });
          })
          .then(() => {
            window.location.href = "/logout";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
  };

  // 회원수정
  const onRegisthandler = (event) => {
    event.preventDefault();
    if (!pwd_check && checkPassword(pwd) === false) {
      Swal.fire({
        icon: "warning",
        title: "비밀번호",
        text: "8 ~ 16자리로 문자, 숫자, 특수문자가 포함되어야 합니다.",
      });
    } else if (pwd !== pwdRe) {
      Swal.fire({
        icon: "warning",
        title: "비밀번호 확인",
        text: "'비밀번호 확인'을 다시 해주세요.",
      });
    } else if (nick_check === false) {
      Swal.fire({
        icon: "warning",
        title: "닉네임",
        text: "닉네임 중복확인이 필요합니다.",
      });
    } else if (birth === "") {
      Swal.fire({
        icon: "warning",
        title: "생일",
        text: "생일을 선택해주세요.",
      });
    } else if (checkAge(birth) < 10) {
      Swal.fire({
        icon: "warning",
        title: "생일",
        text: "10세 이상만 가입 가능합니다.",
      });
    } else if (gender === "") {
      Swal.fire({
        icon: "warning",
        title: "성별",
        text: "성별을 선택해주세요.",
      });
    } else if (introduction.length > 60) {
      Swal.fire({
        icon: "warning",
        title: "프로필 소개",
        text: "소개는 60자 이하만 가능합니다.",
      });
    } else {
      let body = {
        password: pwd,
        nickname: nick,
        birthday: birth,
        gender: gender,
        mbti: mbti,
        introduction: introduction,
      };
      authaxios
        .put("/api/v1/user/update", body)
        .then(function (response) {
          if (response.status == 200) {
            const saveInfo = {
              user_id: userprofile.user_id,
              email: userprofile.email,
              nickname: nick,
              role: userprofile.role
            };

            saveUser(saveInfo);
          }
        })
        .then(() => {
          document.location.href = "/profile/" + user.user_id;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="Login">
      <div className="Login">
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <div className="login-register-tab-list nav">
                    <a>
                      <h4>회원정보 수정</h4>
                    </a>
                  </div>
                  <div className="tab-content">
                    <div id="lg2">
                      <div className="login-form-container">
                        <div className="login-register-form">
                          <form onSubmit={onRegisthandler}>
                            <label>새 비밀번호</label>
                            <button
                              class="btn"
                              style={{ float: "right" }}
                              onClick={changePassword}
                            >
                              {pwd_change_msg}
                            </button>
                            <input
                              type="password"
                              name="user-password"
                              placeholder="비밀번호는 8~16자로 문자, 숫자, 특수문자가 포함되어야 합니다"
                              onChange={onRPWDhandler}
                              disabled={pwd_disabled}
                            />
                            <label>비밀번호 확인</label>
                            <input
                              name="user-password-confirm"
                              placeholder="비밀번호 확인"
                              type="password"
                              onChange={onPWDReHandler}
                              disabled={pwd_disabled}
                            />
                            <label>닉네임</label>
                            <button
                              class="btn"
                              style={{ float: "right" }}
                              onClick={changeNickname}
                            >
                              {nick_change_msg}
                            </button>
                            <button
                              class="btn"
                              style={{ float: "right" }}
                              onClick={checkNickname}
                            >
                              중복 확인
                            </button>
                            <input
                              name="nickname"
                              placeholder="닉네임은 2~8자만 가능합니다"
                              type="text"
                              onChange={onNicknamehandler}
                              value={nick}
                              disabled={nick_disabled}
                            />
                            <label>생일</label>
                            <input
                              name="birthday"
                              placeholder="birthday"
                              type="date"
                              max="9999-12-31"
                              onChange={onBirthhandler}
                              value={birth}
                            />
                            <label>성별</label>
                            <br />
                            <input
                              name="gender"
                              value="male"
                              type="radio"
                              id="male-check"
                              onChange={onGenderHandler}
                              checked={isMale()}
                            />
                            <label
                              for="male-check"
                              className="form-check-label"
                            >
                              남성
                            </label>
                            <input
                              name="gender"
                              value="female"
                              type="radio"
                              id="female-check"
                              onChange={onGenderHandler}
                              checked={isFemale()}
                            />
                            <label
                              for="female-check"
                              className="form-check-label"
                            >
                              여성
                            </label>
                            <br />
                            <br />
                            <label>MBTI</label><span class="optional-mark">(선택)</span>
                            <select
                              name="mbti"
                              className="form-select"
                              onChange={onMbtiHandler}
                              value={mbti}
                            >
                              <option value="비공개">비공개</option>
                              <option value="ISTJ">ISTJ</option>
                              <option value="ISTP">ISTP</option>
                              <option value="ISFJ">ISFJ</option>
                              <option value="ISFP">ISFP</option>
                              <option value="INTJ">INTJ</option>
                              <option value="INTP">INTP</option>
                              <option value="INFJ">INFJ</option>
                              <option value="INFP">INFP</option>
                              <option value="ESTJ">ESTJ</option>
                              <option value="ESTP">ESTP</option>
                              <option value="ESFJ">ESFJ</option>
                              <option value="ESFP">ESFP</option>
                              <option value="ENTJ">ENTJ</option>
                              <option value="ENTP">ENTP</option>
                              <option value="ENFJ">ENFJ</option>
                              <option value="ENFP">ENFP</option>
                            </select>
                            <label>프로필 소개</label><span class="optional-mark">(선택)</span>
                            <input
                              name="introduction"
                              placeholder="소개는 60자 이하만 가능합니다"
                              type="text"
                              onChange={onIntroduction}
                              value={introduction}
                            />
                            <div className="button-box">
                              <button type="submit">
                                <span>수정</span>
                              </button>
                            </div>
                            <div className="button-danger">
                              <button onClick={deleteUser}>
                                <span>회원 탈퇴</span>
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
      </div>
    </div>
  );
}

export default Profile_update;
