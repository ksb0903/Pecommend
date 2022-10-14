package com.perfume.perfumeservice.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    USER_NOT_FOUND(404, "U001", "회원 정보를 찾을 수 없습니다."),
    DUPLICATE_EMAIL(400, "U002", "이미 존재하는 계정입니다."),
    DUPLICATE_NICKNAME(400, "U003", "이미 존재하는 닉네임입니다."),
    INVALID_PARAMETER(400, "U003", "잘못된 요청입니다."),

    POST_NOT_FOUND(404, "C001", "게시글 정보를 찾을 수 없습니다."),

    PERFUME_NOT_FOUND(404, "P001", "향수 정보를 찾을 수 없습니다."),
    NOT_IMAGE_FILE(415, "C002", "이미지 형식의 파일이 아닙니다."),

    COMMENT_NOT_FOUND(404, "O001", "댓글 정보를 찾을 수 없습니다."),
    REVIEW_NOT_FOUND(404, "P002", "리뷰를 찾을 수 없습니다."),
    TAG_NOT_FOUND(404, "P003", "해시태그 정보를 찾을 수 없습니다."),
    REVIEW_IS_EXIST(400, "P004", "이미 리뷰룰 작성하였습니다."),
    REGIST_NOT_FOUND(404, "R001", "게시글 정보를 찾을 수 없습니다.");

    private final int status;
    private final String code;
    private final String message;


}
