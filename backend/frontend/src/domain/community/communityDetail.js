import "./communityDetail.css";
import React, { useEffect, useState } from "react";
import { authaxios, freeaxios } from "../../custom/customAxios";
import { useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function CommunityDetail() {
  const noData = "삭제된 댓글입니다.";
  const articleCategory = ["전체", "자유", "향수", "인기", "공지"];
  const user = useSelector((state) => state.userStore.nowLoginUser);
  let navigate = useNavigate();
  let useParam = useParams();
  let number = parseInt(useParam.num);
  const [pageDetail, setPageDetail] = useState({});
  const [parseContent, setParseContent] = useState({});
  const [pageComment, setPageComment] = useState([]);
  const [formValue, setForm] = useState({
    writer: user.user_id,
    communityId: 0,
    content: "",
  });
  const [limitData, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limitData;

  //   input에 입력시 value 값 수정
  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...formValue,
      [name]: value,
    });
  };

  //   게시글 상세정보 가져오기
  const getArticleDetail = async () => {
    try {
      const response = await freeaxios({
        method: "get",
        url: "/api/v1/community/detail.do/" + number,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setPageDetail(response.data);
        const parsedata = parse(response.data.content);
        setParseContent(parsedata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   게시글의 댓글 목록 가져오기
  const getArticleComment = async () => {
    try {
      const response = await freeaxios({
        method: "get",
        url: "/api/v1/comment/list.do/" + number,
      });
      const commentdata = response.data;
      setPageComment(commentdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticleDetail();
    getArticleComment();
  }, []);

  //   게시글 좋아요
  const recommend = async (e) => {
    try {
      let data = {
        userId: user.user_id,
        postId: pageDetail.id,
      };
      if (user.user_id != pageDetail.writer_id) {
        const response = await authaxios({
          method: "post",
          url: "/api/v1/community/like",
          data: data,
        });
        console.log(response);
        if (response.status === 200) {
          console.log("완료");
          if (response.data == "ADD") {
            setPageDetail({
              ...pageDetail,
              communityLike: pageDetail.communityLike + 1,
            });
            e.target.classList.add("onthumb");
          }
          if (response.data == "CANCEL") {
            setPageDetail({
              ...pageDetail,
              communityLike: pageDetail.communityLike - 1,
            });
            e.target.classList.remove("onthumb");
          }
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "실패",
          text: "본인이 작성한 게시글 입니다.",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: "실패",
        text: "로그인이 필요합니다.",
      });
    }
  };

  const clickRemove = async () => {
    var result = window.confirm("삭제하시겠습니까?");
    if (result) {
      try {
        const response = await authaxios({
          method: "delete",
          url: "/api/v1/community/" + number,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "성공",
            text: "성공적으로 삭제했습니다.",
          });

          navigate(-1);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  const commentRegist = async (e) => {
    e.preventDefault();
    e.target.setAttribute("disabled", "true");
    if (formValue.content != "") {
      try {
        const response = await authaxios({
          method: "post",
          url: "/api/v1/comment",
          data: {
            writer: user.user_id,
            content: formValue.content,
            communityId: number,
          },
        });
        if (response.status === 200) {
          // alert("댓글을 작성했습니다!");
          Swal.fire({
            icon: "success",
            title: "성공",
            text: "댓글을 작성했습니다.",
          });

          const commentBlock = document.getElementById("commentline");
          setForm({
            ...formValue,
            writer: user.user_id,
            communityId: number,
            content: "",
          });
          commentBlock.value = "";
          getArticleComment();
          e.target.setAttribute("disabled", "false");
        }
      } catch (error) {
        console.log(error);
        e.target.setAttribute("disabled", "false");
        Swal.fire({
          icon: "warning",
          title: "실패",
          text: "로그인이 필요합니다.",
        });
      }
      e.target.setAttribute("disabled", "false");
    }
  };

  const replyRegist = async (e) => {
    e.preventDefault();
    e.target.setAttribute("disabled", "true");
    const replyBox = document.getElementById("replyline");
    const Pnum = Number(e.target.id.substring(16));
    if (e.target.content != "") {
      try {
        const response = await authaxios({
          method: "post",
          url: "/api/v1/comment",
          data: {
            writer: user.user_id,
            content: replyBox.value,
            communityId: number,
            parent: Pnum,
            depth: 1,
          },
        });
        if (response.status === 200) {
          // alert("댓글을 작성했습니다!");
          Swal.fire({
            icon: "success",
            title: "성공",
            text: "댓글을 작성했습니다.",
          });

          const replyBox = document.getElementsByClassName("reply");
          if (replyBox.length > 0) {
            replyBox[0].remove();
          }
          getArticleComment();
        }
      } catch (error) {
        console.log(error);
        e.target.setAttribute("disabled", "false");
        Swal.fire({
          icon: "warning",
          title: "실패",
          text: "로그인이 필요합니다.",
        });
      }
      e.target.setAttribute("disabled", "false");
    } else {
      alert("내용을 입력해주세요!");
    }
  };

  const CommentreplyRegist = async (e) => {
    e.preventDefault();
    e.target.setAttribute("disabled", "true");
    const replyBox = document.getElementById("replyline");
    const Pnum = Number(e.target.id.substring(16));
    if (e.target.content != "") {
      try {
        const response = await authaxios({
          method: "post",
          url: "/api/v1/comment",
          data: {
            writer: user.user_id,
            content: replyBox.value,
            communityId: number,
            parent: Pnum,
            depth: 2,
          },
        });
        console.log(response);
        if (response.status === 200) {
          // alert("댓글을 작성했습니다!");
          Swal.fire({
            icon: "success",
            title: "성공",
            text: "댓글을 작성했습니다.",
          });

          const replyBox = document.getElementsByClassName("reply");
          if (replyBox.length > 0) {
            replyBox[0].remove();
          }
          getArticleComment();
        }
      } catch (error) {
        console.log(error);
        e.target.setAttribute("disabled", "false");
      }
      e.target.setAttribute("disabled", "false");
    } else {
      //alert("내용을 입력해주세요!");
      Swal.fire({
        icon: "warning",
        title: "실패",
        text: "내용을 입력해주세요.",
      });
    }
  };

  const clickCommentRemove = async (e) => {
    var result = window.confirm("댓글을 삭제하시겠습니까?");
    if (result) {
      try {
        const response = await authaxios({
          method: "delete",
          url: "/api/v1/comment/" + e.target.id,
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "성공",
            text: "성공적으로 삭제했습니다.",
          });

          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
      getArticleComment();
    } else {
    }
  };

  //   댓글 수정 누름
  const clickCommentEdit = (e) => {
    const commentBox = document.getElementById(
      "comment-content-" + e.target.id,
    );
    commentBox.setAttribute("name", commentBox.value);
    const commentButtonBox1 = document.getElementById(
      "comment-button-set1-" + e.target.id,
    );
    const commentButtonBox2 = document.getElementById(
      "comment-button-set2-" + e.target.id,
    );
    commentButtonBox1.hidden = true;
    commentButtonBox2.hidden = false;
    commentBox.readOnly = false;
    removeReply();
  };

  //   댓글 수정 취소
  const clickCommentEditRemove = (e) => {
    const commentBox = document.getElementById(
      "comment-content-" + e.target.id,
    );
    const commentButtonBox1 = document.getElementById(
      "comment-button-set1-" + e.target.id,
    );
    const commentButtonBox2 = document.getElementById(
      "comment-button-set2-" + e.target.id,
    );
    commentButtonBox1.hidden = false;
    commentButtonBox2.hidden = true;
    commentBox.value = commentBox.getAttribute("name");
    commentBox.readOnly = true;
    getArticleComment();
  };

  //   댓글 좋아요!
  const clickCommentLike = async (e) => {
    try {
      const response = await authaxios({
        method: "post",
        url: "/api/v1/comment/like",
        data: {
          userId: user.user_id,
          commentId: e.target.id,
        },
      });
      if (response.status === 200) {
        if (response.data == "ADD") {
          window.location.reload();
        }
        if (response.data == "CANCEL") {
          window.location.reload();
        }
        if (response.data == "X") {
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: "실패",
        text: "로그인이 필요합니다.",
      });
    }
  };

  //   댓글 싫어요!
  const clickCommentDislike = async (e) => {
    try {
      const response = await authaxios({
        method: "post",
        url: "/api/v1/comment/dislike",
        data: {
          userId: user.user_id,
          commentId: e.target.id,
        },
      });
      if (response.status === 200) {
        if (response.data == "ADD") {
          window.location.reload();
        }
        if (response.data == "CANCEL") {
          window.location.reload();
        }
        if (response.data == "X") {
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: "실패",
        text: "로그인이 필요합니다.",
      });
    }
  };

  //   댓글 수정 확인
  const clickCommentEditCommit = async (e) => {
    try {
      const commentBox = document.getElementById(
        "comment-content-" + e.target.id,
      );
      const response = await authaxios({
        method: "patch",
        url: "/api/v1/comment/" + e.target.id,
        data: {
          writer: user.user_id,
          content: commentBox.value,
          communityId: number,
        },
      });
      if (response.status === 200) {
        const commentBox = document.getElementById(
          "comment-content-" + e.target.id,
        );
        const commentButtonBox1 = document.getElementById(
          "comment-button-set1-" + e.target.id,
        );
        const commentButtonBox2 = document.getElementById(
          "comment-button-set2-" + e.target.id,
        );
        commentButtonBox1.hidden = false;
        commentButtonBox2.hidden = true;
        commentBox.readOnly = true;
        getArticleComment();
        Swal.fire({
          icon: "success",
          title: "성공",
          text: "수정 완료했습니다.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   댓글 수정 버튼 누름
  const commentEditChange = (e) => {
    // console.log(e.target.value);
  };

  //   글 수정 클릭
  const clickEdit = () => {
    navigate("/commu/edit/" + number, { replace: true });
  };

  //   대댓글 박스(글박스) 삭제
  const removeReply = () => {
    const replyBox = document.getElementsByClassName("reply");
    if (replyBox.length > 0) {
      replyBox[0].remove();
    }
  };

  //   댓글 박스 클릭해서 대댓글 생성
  const commentClick = (e) => {
    if (e.target.readOnly == true) {
      const targetComment = document.getElementById("community-" + e.target.id);
      removeReply();
      const newDiv = document.createElement("div");
      const newTextArea = document.createElement("textarea");
      const newSubDiv = document.createElement("div");
      const newRemoveButton = document.createElement("button");
      const newSubmitButton = document.createElement("button");
      const newIconDiv = document.createElement("div");
      const newLineDiv = document.createElement("div");
      const newImg = document.createElement("img");

      newDiv.classList.add("reply");
      newSubDiv.classList.add("reply-sub");
      newRemoveButton.classList.add("reply-remove");
      newRemoveButton.classList.add("fa-solid");
      newRemoveButton.classList.add("fa-eraser");
      newSubmitButton.classList.add("reply-submit");
      newSubmitButton.classList.add("fa-solid");
      newSubmitButton.classList.add("fa-pen");
      newIconDiv.classList.add("reply-icon");
      newLineDiv.classList.add("reply-line");

      newImg.setAttribute("src", "assets/img/icon-img/arrow-turn-up.svg");
      newImg.setAttribute("width", "20px");
      newTextArea.setAttribute("id", "replyline");
      newTextArea.setAttribute("rows", "3");
      newTextArea.setAttribute("name", "content");
      newDiv.setAttribute("id", e.target.id);
      newSubmitButton.addEventListener("click", replyRegist);
      newRemoveButton.addEventListener("click", removeReply);
      newSubmitButton.setAttribute("id", e.target.id);

      newIconDiv.appendChild(newImg);
      newLineDiv.appendChild(newIconDiv);
      newLineDiv.appendChild(newTextArea);
      newSubDiv.appendChild(newRemoveButton);
      newSubDiv.appendChild(newSubmitButton);
      newDiv.appendChild(newLineDiv);
      // newDiv.appendChild(newTextArea);
      newDiv.appendChild(newSubDiv);
      targetComment.appendChild(newDiv);
    }
  };

  //   대댓글 생성 버튼 클릭
  const commentClickBtn = (e) => {
    const targetCommentBox = document.getElementById("comment" + e.target.id);
    if (targetCommentBox.readOnly == true) {
      const targetComment = document.getElementById(
        "community-comment" + e.target.id,
      );
      removeReply();
      const newDiv = document.createElement("div");
      const newTextArea = document.createElement("textarea");
      const newSubDiv = document.createElement("div");
      const newRemoveButton = document.createElement("button");
      const newSubmitButton = document.createElement("button");
      const newIconDiv = document.createElement("div");
      const newLineDiv = document.createElement("div");
      const newImg = document.createElement("img");

      newDiv.classList.add("reply");
      newSubDiv.classList.add("reply-sub");
      newRemoveButton.classList.add("reply-remove");
      newRemoveButton.classList.add("fa-solid");
      newRemoveButton.classList.add("fa-eraser");
      newSubmitButton.classList.add("reply-submit");
      newSubmitButton.classList.add("fa-solid");
      newSubmitButton.classList.add("fa-pen");
      newIconDiv.classList.add("reply-icon");
      newLineDiv.classList.add("reply-line");

      newImg.setAttribute("src", "assets/img/icon-img/arrow-turn-up.svg");
      newImg.setAttribute("width", "20px");
      newTextArea.setAttribute("id", "replyline");
      newTextArea.setAttribute("rows", "3");
      newTextArea.setAttribute("name", "content");
      newDiv.setAttribute("id", "comment" + e.target.id);
      newSubmitButton.addEventListener("click", replyRegist);
      newRemoveButton.addEventListener("click", removeReply);
      newSubmitButton.setAttribute("id", "comment" + e.target.id);

      newIconDiv.appendChild(newImg);
      newLineDiv.appendChild(newIconDiv);
      newLineDiv.appendChild(newTextArea);
      newSubDiv.appendChild(newRemoveButton);
      newSubDiv.appendChild(newSubmitButton);
      newDiv.appendChild(newLineDiv);
      // newDiv.appendChild(newTextArea);
      newDiv.appendChild(newSubDiv);
      targetComment.appendChild(newDiv);
    }
  };

  // 대댓글 클릭시 대댓글 생성
  const replyClick = (number, e) => {
    if (e.target.readOnly == true) {
      const targetComment = document.getElementById(
        "community-comment-content-" + number,
      );
      removeReply();
      const newDiv = document.createElement("div");
      const newTextArea = document.createElement("textarea");
      const newSubDiv = document.createElement("div");
      const newRemoveButton = document.createElement("button");
      const newSubmitButton = document.createElement("button");
      const newIconDiv = document.createElement("div");
      const newLineDiv = document.createElement("div");
      const newImg = document.createElement("img");

      newDiv.classList.add("reply");
      newSubDiv.classList.add("reply-sub");
      newRemoveButton.classList.add("reply-remove");
      newRemoveButton.classList.add("fa-solid");
      newRemoveButton.classList.add("fa-eraser");
      newSubmitButton.classList.add("reply-submit");
      newSubmitButton.classList.add("fa-solid");
      newSubmitButton.classList.add("fa-pen");
      newIconDiv.classList.add("reply-icon");
      newLineDiv.classList.add("reply-line");

      newImg.setAttribute("src", "assets/img/icon-img/arrow-turn-up.svg");
      newImg.setAttribute("width", "20px");
      newTextArea.setAttribute("id", "replyline");
      newTextArea.setAttribute("rows", "3");
      newTextArea.setAttribute("name", "content");
      newDiv.setAttribute("id", "comment-content-" + number);
      newSubmitButton.addEventListener("click", replyRegist);
      newRemoveButton.addEventListener("click", removeReply);
      newSubmitButton.setAttribute("id", "comment-content-" + number);

      newIconDiv.appendChild(newImg);
      newLineDiv.appendChild(newIconDiv);
      newLineDiv.appendChild(newTextArea);
      newSubDiv.appendChild(newRemoveButton);
      newSubDiv.appendChild(newSubmitButton);
      newDiv.appendChild(newLineDiv);
      // newDiv.appendChild(newTextArea);
      newDiv.appendChild(newSubDiv);
      targetComment.appendChild(newDiv);
    }
  };

  return (
    <div className="communityDetail">
      <div className="pt-95 pb-100">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-12 community-detail-box">
              {/* 게시글 상세 */}
              <div className="community-detail">
                <div className="community-detail-title">
                  <h4 className="mx-4 mt-3 detail-title">
                    [{articleCategory[pageDetail.category]}] {pageDetail.title}
                  </h4>
                </div>
                <div className="community-detail-user d-flex flex-row justify-content-between align-items-center mx-4">
                  <div>
                    <span>작성자 : {pageDetail.writer}</span>
                  </div>
                  <div>
                    <h5 style={{ margin: "0" }}>
                      추천 {pageDetail.communityLike}
                    </h5>
                    <h5 style={{ margin: "0" }}>{pageDetail.Created_date}</h5>
                  </div>
                </div>
                <hr></hr>
                <div
                  className="community-detail-maintextbox"
                  dangerouslySetInnerHTML={{ __html: pageDetail.content }}
                ></div>

                {/* 게시글 좋아요 */}
                <div className="community-detail-artiblebox d-flex justify-content-center">
                  <a className="articleButton" onClick={recommend}>
                    <span
                      className="commu-up fa-solid fa-thumbs-up "
                      name="thumb"
                    ></span>
                  </a>
                  <h5>{pageDetail.communityLike}</h5>
                </div>
                <hr></hr>
                {/* 게시글 하단 상세 부분 및 버튼 부분 */}
                <div className="community-detail-subtextbox">
                  <h5>
                    {pageDetail.createDateYMD}&nbsp;&nbsp;
                    {pageDetail.createDateHMS}&nbsp;&nbsp;작성됨
                  </h5>
                  <h5>
                    {pageDetail.modifiedDateYMD}&nbsp;&nbsp;
                    {pageDetail.modifiedDateHMS} &nbsp;&nbsp;수정됨
                  </h5>
                  {user.user_id === pageDetail.writer_id ? (
                    <>
                      <button
                        className="community-button-remove fa-solid fa-trash-can"
                        onClick={clickRemove}
                      ></button>
                      <button
                        className="community-button-edit fa-solid fa-pen"
                        onClick={clickEdit}
                      ></button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* 댓글 작성 */}
              <div id="communityComment">
                <div className="community-write-box">
                  <h5>{user.nickname}</h5>
                  <form
                    className="d-flex justify-content-right align-items-end"
                    onSubmit={commentRegist}
                  >
                    <textarea
                      id="commentline"
                      rows="3"
                      name="content"
                      placeholder="댓글을 입력하세요."
                      onChange={handleChange}
                      maxLength="255"
                    ></textarea>
                    <button className="comment-submit">등록</button>
                  </form>
                </div>

                {/* 새로운 버전! */}
                <div className="community-comment-list">
                  {/* 댓글 생성 코드! */}
                  {pageComment.map((data) => (
                    <div className="community-comment-card">
                      <div className="community-comment-box d-flex">
                        <div className="community-comment-img">
                          <img src="assets/tempImg/person.png" />
                        </div>
                        <div className="community-comment-data">
                          <div className="row">
                            <div className="comment-data col-9">
                              {data.writer}&nbsp;&nbsp;|&nbsp;&nbsp;
                              {data.createDateYMD}
                              &nbsp;{data.createDateHMS}
                              &nbsp;&nbsp;|&nbsp;&nbsp;추천수&nbsp;
                              {data.commentLike}
                            </div>
                            {user.user_id === data.writerId &&
                            data.deleted === false ? (
                              <div className="col-3">
                                <div
                                  className="comment-button-set"
                                  id={`comment-button-set1-${data.id}`}
                                >
                                  <button
                                    className="community-button-remove fa-solid fa-trash-can"
                                    onClick={clickCommentRemove}
                                    id={`${data.id}`}
                                  ></button>
                                  <button
                                    className="community-button-edit fa-solid fa-pen"
                                    onClick={clickCommentEdit}
                                    id={`${data.id}`}
                                  ></button>
                                  <button
                                    className="community-button-reply fa-solid fa-comments"
                                    id={`-content-${data.id}`}
                                    onClick={commentClickBtn}
                                  ></button>
                                </div>
                                <div
                                  className="comment-button-set"
                                  id={`comment-button-set2-${data.id}`}
                                  hidden
                                >
                                  <button
                                    className="community-edit-remove fa-solid fa-xmark"
                                    onClick={clickCommentEditRemove}
                                    id={`${data.id}`}
                                  ></button>
                                  <button
                                    className="community-edit-commit fa-solid fa-pen"
                                    onClick={clickCommentEditCommit}
                                    id={`${data.id}`}
                                  ></button>
                                  <button
                                    className="community-button-reply fa-solid fa-comments"
                                    id={`-content-${data.id}`}
                                    onClick={commentClickBtn}
                                  ></button>
                                </div>
                              </div>
                            ) : data.deleted === false ? (
                              <>
                                <div className="col-3">
                                  <div className="comment-button-set">
                                    <button
                                      className="community-button-edit-btn fa-solid fa-thumbs-up"
                                      onClick={clickCommentLike}
                                      id={`${data.id}`}
                                    ></button>
                                    <button
                                      className="community-button-remove-btn fa-solid fa-thumbs-down"
                                      onClick={clickCommentDislike}
                                      id={`${data.id}`}
                                    ></button>
                                    <button
                                      className="community-button-reply-btn fa-solid fa-comments"
                                      id={`-content-${data.id}`}
                                      onClick={commentClickBtn}
                                    ></button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                          {data.deleted === false ? (
                            <>
                              <textarea
                                readOnly
                                rows="3"
                                name=""
                                id={`comment-content-${data.id}`}
                                onChange={commentEditChange}
                                onClick={commentClick}
                                maxLength="255"
                              >
                                {data.content}
                              </textarea>
                            </>
                          ) : (
                            <>
                              <textarea
                                readOnly
                                rows="3"
                                name=""
                                id={`comment-content-${data.id}`}
                                onChange={commentEditChange}
                                onClick={commentClick}
                                maxLength="255"
                              >
                                {noData}
                              </textarea>
                            </>
                          )}
                        </div>
                      </div>
                      <div
                        className="replybox"
                        id={`community-comment-content-${data.id}`}
                      ></div>

                      {/* 대댓글 생성 코드 */}
                      {data.children &&
                        data.children.map((dataR) => (
                          <div className="community-comment-card reply-comment">
                            <div className="community-comment-box d-flex">
                              <div className="depth1"></div>
                              <div className="community-comment-img">
                                <img src="assets/tempImg/person.png" />
                              </div>
                              <div className="community-comment-data">
                                <div className="row">
                                  <div className="comment-data col-9">
                                    {dataR.writer} | {dataR.createDateYMD}{" "}
                                    {dataR.createDateHMS} | 추천수&nbsp;
                                    {dataR.commentLike}
                                  </div>
                                  {user.user_id === dataR.writerId &&
                                  dataR.deleted === false ? (
                                    <div className="col-3">
                                      <div
                                        className="comment-button-set"
                                        id={`comment-button-set1-${dataR.id}`}
                                      >
                                        <button
                                          className="community-button-remove fa-solid fa-trash-can"
                                          onClick={clickCommentRemove}
                                          id={`${dataR.id}`}
                                        ></button>
                                        <button
                                          className="community-button-edit fa-solid fa-pen"
                                          onClick={clickCommentEdit}
                                          id={`${dataR.id}`}
                                        ></button>
                                        <button
                                          className="community-button-reply fa-solid fa-comments"
                                          id={`-content-${dataR.id}`}
                                          onClick={commentClickBtn}
                                        ></button>
                                      </div>
                                      <div
                                        className="comment-button-set"
                                        id={`comment-button-set2-${dataR.id}`}
                                        hidden
                                      >
                                        <button
                                          className="community-edit-remove fa-solid fa-xmark"
                                          onClick={clickCommentEditRemove}
                                          id={`${dataR.id}`}
                                        ></button>
                                        <button
                                          className="community-edit-commit fa-solid fa-pen"
                                          onClick={clickCommentEditCommit}
                                          id={`${dataR.id}`}
                                        ></button>

                                        <button
                                          className="community-button-reply fa-solid fa-comments"
                                          id={`-content-${dataR.id}`}
                                          onClick={commentClickBtn}
                                        ></button>
                                      </div>
                                    </div>
                                  ) : dataR.deleted === false ? (
                                    <>
                                      <div className="col-3">
                                        <div className="comment-button-set">
                                          <button
                                            className="community-button-edit-btn fa-solid fa-thumbs-up"
                                            onClick={clickCommentLike}
                                            id={`${dataR.id}`}
                                          ></button>
                                          <button
                                            className="community-button-remove-btn fa-solid fa-thumbs-down"
                                            onClick={clickCommentDislike}
                                            id={`${dataR.id}`}
                                          ></button>
                                          <button
                                            className="community-button-reply-btn fa-solid fa-comments"
                                            id={`-content-${dataR.id}`}
                                            onClick={commentClickBtn}
                                          ></button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>

                                {dataR.deleted === false ? (
                                  <>
                                    <textarea
                                      readOnly
                                      rows="3"
                                      name=""
                                      id={`comment-content-${dataR.id}`}
                                      onChange={commentEditChange}
                                      onClick={commentClick}
                                      maxLength="255"
                                    >
                                      {dataR.content}
                                    </textarea>
                                  </>
                                ) : (
                                  <>
                                    <textarea
                                      readOnly
                                      rows="3"
                                      name=""
                                      id={`comment-content-${dataR.id}`}
                                      onChange={commentEditChange}
                                      onClick={commentClick}
                                      maxLength="255"
                                    >
                                      {noData}
                                    </textarea>
                                  </>
                                )}
                              </div>
                            </div>

                            <div
                              className="replybox-d1"
                              id={`community-comment-content-${dataR.id}`}
                            ></div>

                            {/* 대대댓글 생성 코드 */}
                            {dataR.children &&
                              dataR.children.map((dataRR) => (
                                <div className="community-comment-card reply-comment">
                                  <div className="community-comment-box d-flex">
                                    <div className="depth2"></div>
                                    <div className="community-comment-img">
                                      <img src="assets/tempImg/person.png" />
                                    </div>
                                    <div className="community-comment-data">
                                      <div className="row">
                                        <div className="comment-data col-9">
                                          {dataRR.writer} |{" "}
                                          {dataRR.createDateYMD}{" "}
                                          {dataRR.createDateHMS} | 추천수&nbsp;
                                          {dataRR.commentLike}
                                        </div>
                                        {user.user_id === dataRR.writerId &&
                                        dataRR.deleted === false ? (
                                          <div className="col-3">
                                            <div
                                              className="comment-button-set"
                                              id={`comment-button-set1-${dataRR.id}`}
                                            >
                                              <button
                                                className="community-button-remove fa-solid fa-trash-can"
                                                onClick={clickCommentRemove}
                                                id={`${dataRR.id}`}
                                              ></button>
                                              <button
                                                className="community-button-edit fa-solid fa-pen"
                                                onClick={clickCommentEdit}
                                                id={`${dataRR.id}`}
                                              ></button>
                                            </div>
                                            <div
                                              className="comment-button-set"
                                              id={`comment-button-set2-${dataRR.id}`}
                                              hidden
                                            >
                                              <button
                                                className="community-edit-remove fa-solid fa-xmark"
                                                onClick={clickCommentEditRemove}
                                                id={`${dataRR.id}`}
                                              ></button>
                                              <button
                                                className="community-edit-commit fa-solid fa-pen"
                                                onClick={clickCommentEditCommit}
                                                id={`${dataRR.id}`}
                                              ></button>
                                            </div>
                                          </div>
                                        ) : dataRR.deleted === false ? (
                                          <>
                                            <div className="col-3">
                                              <div className="comment-button-set">
                                                <button
                                                  className="community-button-edit-btn fa-solid fa-thumbs-up"
                                                  onClick={clickCommentLike}
                                                  id={`${dataRR.id}`}
                                                ></button>
                                                <button
                                                  className="community-button-remove-btn fa-solid fa-thumbs-down"
                                                  onClick={clickCommentDislike}
                                                  id={`${dataRR.id}`}
                                                ></button>
                                              </div>
                                            </div>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      {dataRR.deleted === false ? (
                                        <>
                                          <textarea
                                            readOnly
                                            rows="3"
                                            name=""
                                            id={`comment-content-${dataRR.id}`}
                                            onChange={commentEditChange}
                                            onClick={(e) =>
                                              replyClick(dataR.id, e)
                                            }
                                            maxLength="255"
                                          >
                                            {dataRR.content}
                                          </textarea>
                                        </>
                                      ) : (
                                        <>
                                          <textarea
                                            readOnly
                                            rows="3"
                                            name=""
                                            id={`comment-content-${dataRR.id}`}
                                            onChange={commentEditChange}
                                            onClick={(e) =>
                                              replyClick(dataR.id, e)
                                            }
                                            maxLength="255"
                                          >
                                            {noData}
                                          </textarea>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className="replybox-d2"
                                    id={`community-comment-content-${dataRR.id}`}
                                  ></div>
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>

                <div className="backButton mt-5">
                  <button
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    목록
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityDetail;
