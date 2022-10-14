package com.perfume.perfumeservice.exception.perfume;

import com.perfume.perfumeservice.exception.CustomException;
import com.perfume.perfumeservice.exception.ErrorCode;

public class PerfumeNotFoundException extends CustomException {
    public PerfumeNotFoundException() {super(ErrorCode.PERFUME_NOT_FOUND);}
}
