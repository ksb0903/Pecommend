package com.perfume.perfumeservice.exception.Review;

import com.perfume.perfumeservice.exception.CustomException;
import com.perfume.perfumeservice.exception.ErrorCode;

public class ReviewNotFoundException extends CustomException {
    public ReviewNotFoundException(){
        super(ErrorCode.REVIEW_NOT_FOUND);
    }
}
