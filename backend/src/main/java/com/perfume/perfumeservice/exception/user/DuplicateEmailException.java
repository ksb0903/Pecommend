package com.perfume.perfumeservice.exception.user;

import com.perfume.perfumeservice.exception.CustomException;
import com.perfume.perfumeservice.exception.ErrorCode;

public class DuplicateEmailException extends CustomException {
    public DuplicateEmailException(){
        super(ErrorCode.DUPLICATE_EMAIL);
    }
}
