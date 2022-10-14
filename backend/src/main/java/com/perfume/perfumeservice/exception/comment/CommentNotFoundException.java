package com.perfume.perfumeservice.exception.comment;

import com.perfume.perfumeservice.exception.CustomException;
import com.perfume.perfumeservice.exception.ErrorCode;

public class CommentNotFoundException extends CustomException {
    public CommentNotFoundException(){super(ErrorCode.COMMENT_NOT_FOUND);}
}
