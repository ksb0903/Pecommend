package com.perfume.perfumeservice.exception.community;

import com.perfume.perfumeservice.exception.CustomException;
import com.perfume.perfumeservice.exception.ErrorCode;

public class NotImgException extends CustomException {
    public NotImgException(){
        super(ErrorCode.NOT_IMAGE_FILE);
    }
}
