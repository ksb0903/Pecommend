package com.perfume.perfumeservice.exception.user;

import com.perfume.perfumeservice.exception.CustomException;
import com.perfume.perfumeservice.exception.ErrorCode;

public class UserNotFoundException extends CustomException {
    public UserNotFoundException(){
        super(ErrorCode.USER_NOT_FOUND);
    }
}
