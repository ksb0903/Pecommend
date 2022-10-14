package com.perfume.perfumeservice.exception.regist;

import com.perfume.perfumeservice.exception.CustomException;
import com.perfume.perfumeservice.exception.ErrorCode;

public class RegistNotFoundException extends CustomException {
    public RegistNotFoundException(){
        super(ErrorCode.REGIST_NOT_FOUND);
    }
}
