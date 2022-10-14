package com.perfume.perfumeservice.exception.Review;

import com.perfume.perfumeservice.exception.CustomException;
import com.perfume.perfumeservice.exception.ErrorCode;

public class ReviewExistException extends CustomException {
    public ReviewExistException(){
        super(ErrorCode.REVIEW_IS_EXIST);
    }
}
