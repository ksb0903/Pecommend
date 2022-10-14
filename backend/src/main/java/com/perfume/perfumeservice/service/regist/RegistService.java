package com.perfume.perfumeservice.service.regist;

import com.perfume.perfumeservice.dto.regist.RegistRequestDto;
import com.perfume.perfumeservice.dto.regist.RegistResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RegistService {
    void writeRegist(RegistRequestDto request, MultipartFile file);
    RegistResponseDto updateRegist(Long registId, int newStatus);
    void deleteRegist(Long registId);
    String getImg(String img);
    List<RegistResponseDto> getList();
}
