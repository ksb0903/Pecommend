import "./communityEdit.css";
import Nav from "../../components/nav";
import { authaxios, freeaxios } from "../../custom/customAxios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "jquery";
import Editor from "./editor";
import userReducer from "redux/user_reducer";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function CommunityEdit() {
  const user = useSelector((state) => state.userStore.nowLoginUser);
  let navigate = useNavigate();
  let useParam = useParams();
  let number = parseInt(useParam.num);
  const [formValue, setForm] = useState({
    writer: "",
    title: "",
    category: 0,
  });

  const [content, setContent] = useState("");

  const getArticleDetail = async () => {
    try {
      const response = await freeaxios({
        method: "get",
        url: "/api/v1/community/detail.do/" + number,
        // data: registwrite,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setForm(response.data);
        const item = document.getElementById("dropdownMenuButton1");
        let text = document.getElementById(response.data.category);
        // console.log(text)
        item.innerText = text.innerText;
        setContent(response.data.content);
      }
      if (response.data.writer_id != user.user_id) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "올바르지 못한 접근입니다!",
        });
        navigate("/commu/main", { replace: true });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "올바르지 못한 접근입니다!",
      });
      navigate("/commu/main", { replace: true });
    }
  };
  useEffect(() => {
    getArticleDetail();
  }, []);

  const categoryChangehandler = (e) => {
    const item = document.getElementById("dropdownMenuButton1");
    // item.value = e.target.id
    item.innerText = e.target.innerText;
    const { id, name } = e.target;
    setForm({
      ...formValue,
      [name]: id,
    });
  };

  const [imageFile, setImgFile] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authaxios({
        method: "patch",
        url: "/api/v1/community/" + number,
        // data: registwrite,
        data: {
          writer: formValue.writer_id,
          title: formValue.title,
          content: content,
          category: formValue.category,
        },
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "성공",
          text: "수정되었습니다.",
        });
        navigate("/commu/detail/" + number, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const returnPage = (e) => {
    e.preventDefault();
    navigate("/commu/detail/" + number, { replace: true });
  };

  return (
    <div className="communityRegist">
      <form onSubmit={handleSubmit}>
        <div className="community-regist-topbar">
          <div className="regist-topbar-item">
            <div className="regist-topbar-item-name">
              <span>카테고리</span>
            </div>
            <div className="regist-topbar-item-context">
              <div className="dropdown">
                <button
                  className="regist-dropdown dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  카테고리
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a
                      className=""
                      name="category"
                      onClick={categoryChangehandler}
                      id="1"
                    >
                      자유
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      name="category"
                      onClick={categoryChangehandler}
                      id="2"
                    >
                      향수
                    </a>
                  </li>
                  {/* <li><a className="dropdown-item" name="category" onClick={categoryChangehandler} id="3">질문</a></li> */}
                  {/* <li><a className="dropdown-item" name="category" onClick={categoryChangehandler} id="4">공지</a></li> */}
                  {user.role == "ROLE_ADMIN" ? (
                    <>
                      <li>
                        <a
                          className="dropdown-item"
                          name="category"
                          onClick={categoryChangehandler}
                          id="4"
                        >
                          공지
                        </a>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <hr className="hrtag"></hr>
          <div className="regist-topbar-item">
            <div className="regist-topbar-item-name">
              <span>제목</span>
            </div>
            <div className="regist-topbar-item-context context-title">
              <input
                type="text"
                className="regist-topbar-title"
                name="title"
                value={formValue.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <hr className="hrtag"></hr>
          <div className="regist-topbar-item">
            <div className="regist-topbar-item-name">
              <span>작성자</span>
            </div>
            <div className="regist-topbar-item-context">
              <span>{formValue.writer}</span>
            </div>
          </div>
          <hr className="hrtag"></hr>
        </div>
        <div className="community-regist-text">
          <Editor SetContent={setContent} content={content} />
        </div>
        <div className="community-regist-bottombar">
          <button className="registBtn">등록하기</button>
          <button className="cancleBtn" onClick={returnPage}>
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommunityEdit;
