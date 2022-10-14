package com.perfume.perfumeservice.exception.user;

import com.perfume.perfumeservice.exception.CustomException;
import com.perfume.perfumeservice.exception.ErrorCode;

public class DuplicateNicknameException extends CustomException {
    public DuplicateNicknameException(){
        super(ErrorCode.DUPLICATE_NICKNAME);
    }
}
