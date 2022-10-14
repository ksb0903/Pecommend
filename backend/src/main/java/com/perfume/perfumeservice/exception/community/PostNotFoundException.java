package com.perfume.perfumeservice.exception.community;

import com.perfume.perfumeservice.exception.CustomException;
import com.perfume.perfumeservice.exception.ErrorCode;

public class PostNotFoundException extends CustomException {
    public PostNotFoundException(){
        super(ErrorCode.POST_NOT_FOUND);
    }
}
