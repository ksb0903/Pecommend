package com.perfume.perfumeservice.exception.perfume;

import com.perfume.perfumeservice.exception.CustomException;
import com.perfume.perfumeservice.exception.ErrorCode;

public class TagNotFoundException extends CustomException {
    public TagNotFoundException(){
        super(ErrorCode.TAG_NOT_FOUND);
    }
}
