import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/nav";
import "./perfumeRegist.css";
import { authaxios, freeaxios } from "../../custom/customAxios";
import Swal from "sweetalert2";

function PerfumeRegist() {
  const user = useSelector(state => state.userStore.nowLoginUser);
  let navigate = useNavigate()
  const [content, setContent] = useState("")
  const [imageFile, setImgFile] = useState([])
  const [formValue, setForm] = useState({
    writer: user.user_id,
    title: '',
    company: '',
    describe: '',
  });

  const usercheck = () => {
    if (user.user_id == null) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "로그인이 필요합니다.",
        });
        navigate("/perfume/reglist", { replace: true })
      }
  }

  const imgChange = (e) => {
    setImgFile([]);
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          if (base64) {
            var base64Sub = base64.toString()
            setImgFile(imageFile => [...imageFile, base64Sub]);
          }
        }
      }
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValue.title.replace(/^\s+|\s+$/gm, '') == '') {
      alert("제목을 입력해주세요")
    }
    else {
      let registwrite = new FormData();
      let datas =
      {
        user: user.nickname,
        name: formValue.title,
        company: formValue.company,
        describe: formValue.describe,
        status: 0,
      };
      let jsond = JSON.stringify(datas);
      let file = document.getElementById("img").files[0];
      let blob = new Blob([jsond], { type: "application/json" });
      registwrite.append("file", file)
      registwrite.append("request", blob)

      e.target.setAttribute("disabled", 'true')
      e.target.classList.add("disabled")
      try {
        const response = await authaxios({
          method: "post",
          url: "/api/v1/regist",
          data: registwrite
        });
        if (response.status === 200) {
          alert("작성 완료되었습니다.")
          navigate(`/perfume/reglist`, { replace: true });
        }
        else {
          e.target.classList.remove("disabled")
        }
      } catch (error) {
        console.log(error);
      }
    }
    e.target.removeAttribute("disabled")
  };

  const cancelSubmit = async (e) => {
    e.preventDefault()
    alert("취소했습니다")
    navigate(`/perfume/reglist`, { replace: true });
  }

  useEffect(() => {
    usercheck();
  }, [])

  return (
    <div className="perfumeRegist">
      <form className="mt-80 mb-100">
        <div className="container perfumeRegistBox" style={{ width: "60%" }}>
          <div className="NameBox">
            <label for="name" className="name-label">
              이름
            </label>
            <input
              id="name"
              className="name-input"
              type="text"
              placeholder="필수 항목 입니다."
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="MakerBox">
            <label for="maker" className="maker-label">
              제조사
            </label>
            <input id="maker" className="maker-input" type="text" name="company" onChange={handleChange} />
          </div>
          <div className="DescriptionBox">
            <label for="description" className="description-label">
              설명
            </label>
            <textarea
              id="description"
              className="description-input"
              rows={5}
              name="describe"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="FileBox">
            <label for="file" className="form-label">
              이미지
            </label>
            <input
              className="form-control form-control-sm"
              id="img"
              type="file"
              accept="image/*"
              onChange={imgChange}
            />
          </div>
          <div className="ButtonArea">
            <button className="BackButton" onClick={cancelSubmit}>뒤로</button>
            <button className="AcceptButton" onClick={handleSubmit}>
              확인
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PerfumeRegist;