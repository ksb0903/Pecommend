import './communityRegist.css'
import Nav from "../../components/nav";
import {authaxios, freeaxios} from "../../custom/customAxios";
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Editor from "./editor"
import {useSelector} from "react-redux"
import Swal from "sweetalert2";

function CommunityRegist ()  {
    const user = useSelector(state => state.userStore.nowLoginUser);
    let navigate = useNavigate()

    useEffect(()=>{
        usercheck()
    })

    const usercheck = () => {
        if (user.user_id == null) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "올바르지 못한 접근입니다!",
            });
            navigate("/commu/main", { replace: true })
          }
    }

    
    const [formValue, setForm] = useState({
        writer: user.user_id,
        title: '',
        category: 1,
    });
    const[content,setContent] = useState("")

    const handleChange = (e) => {
        const { value, name } = e.target;
        console.log(value,name)
        setForm({
            ...formValue,
            [name]: value
        })
        console.log(formValue)
    }

    const categoryChangehandler = (e) => {
        const item = document.getElementById("dropdownMenuButton1")
        // item.value = e.target.id
        item.innerText = e.target.innerText
        const { id, name } = e.target;
        console.log(id,name)
        setForm({
            ...formValue,
            [name]: id
        })
        
        console.log(formValue)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValue.title.replace(/^\s+|\s+$/gm,'') == '') {
            Swal.fire({
                icon: "warning",
                title: "실패",
                text: "제목을 입력해주세요.",
            });
        }
        else {
            e.target.setAttribute("disabled",'true')
            e.target.classList.add("disabled")
            try {
              const response = await authaxios({
                method: "post",
                url: "/api/v1/community",
                // data: registwrite,
                data:{
                    writer: user.user_id,
                    title: formValue.title,
                    content: content,
                    category: formValue.category,
                },
              });
              console.log(response);
              if (response.status === 200) {
                console.log(response.data);
                Swal.fire({
                    icon: "success",
                    title: "성공",
                    text: "작성 완료되었습니다.",
                });
                navigate(`/commu/detail/${response.data.id}`, { replace: true });
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

    const cancelSubmit = async(e) => {
        e.preventDefault()
        Swal.fire({
            icon: "warning",
            title: "실패",
            text: "취소했습니다.",
        });
        navigate(`/commu/main` , {replace:true});
    }

    return (
        <div className="communityRegist">
            {/* <div className='community-regist-head'>
                <span>글쓰기</span>
            </div> */}
            <form>
            <div className='community-regist-topbar'>
                <div className="regist-topbar-item mt-5">
                    <div className="regist-topbar-item-name">
                        <span className="fontS">카테고리</span>
                    </div>
                    <div className="regist-topbar-item-context">
                        <div className="dropdown">
                            <button className="fontS regist-dropdown dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                자유
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="" name="category" onClick={categoryChangehandler} id="1">자유</a></li>
                                <li><a className="dropdown-item" name="category" onClick={categoryChangehandler} id="2">향수</a></li>
                                {/* {
                                    user.
                                } */}
                                {/* <li><a className="dropdown-item" name="category" onClick={categoryChangehandler} id="4">공지</a></li> */}
                                {
                                    (user.role == "ROLE_ADMIN")
                                    ? <>
                                        <li><a className="dropdown-item" name="category" onClick={categoryChangehandler} id="4">공지</a></li>
                                    </>
                                    : <></>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="hrtag"></hr>
                <div className="regist-topbar-item">
                    <div className="regist-topbar-item-name" >
                        <span className="fontS">제목</span>
                    </div>
                    <div className="regist-topbar-item-context context-title">
                        <input type="text" className='regist-topbar-title' name="title" onChange={handleChange} id="titleinput"/>
                    </div>
                </div>
                <hr className='hrtag'></hr>
                <div className="regist-topbar-item">
                    <div className="regist-topbar-item-name">
                        <span className="fontS">작성자</span>
                    </div>
                    <div className="regist-topbar-item-context">
                        <span className="fontS">{user.nickname}</span>
                    </div>
                </div>
                <hr className='hrtag'></hr>
            </div>
            <div className='community-regist-text'>
                {/* <textarea className="regist-textarea" rows="15" onChange={ handleChange } name="content" id="contentinput"></textarea> */}
                <Editor
                SetContent={setContent}
                content={content}
            />
            </div>
            <div className='community-regist-bottombar'>
                <button className="registBtn" onClick={handleSubmit}>
                    등록하기
                </button>
                <button className='cancleBtn' onClick={cancelSubmit}>
                    취소하기
                </button>
            </div>
            </form>
        </div>
    );
}

export default CommunityRegist;