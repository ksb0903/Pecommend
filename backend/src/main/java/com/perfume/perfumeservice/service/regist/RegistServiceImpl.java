package com.perfume.perfumeservice.service.regist;

import com.perfume.perfumeservice.domain.regist.Regist;
import com.perfume.perfumeservice.domain.regist.RegistRepository;
import com.perfume.perfumeservice.dto.regist.RegistRequestDto;
import com.perfume.perfumeservice.dto.regist.RegistResponseDto;
import com.perfume.perfumeservice.exception.regist.RegistNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistServiceImpl implements RegistService{

    @Value("${part4.upload.path2}")
    private String uploadPath;

    private final RegistRepository registRepository;

    @Override
    public void writeRegist(RegistRequestDto request, MultipartFile file) {

        if(file!=null && file.getSize()>0){
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            request.setImg(fileName);
            Path path = Paths.get(uploadPath + File.separator + fileName);
            try{
                file.transferTo(path);
            }catch (Exception e){
                //throw new RuntimeException("이미지 업로드 중 에러가 발생했습니다.");
                e.printStackTrace();
            }
        }else{
            request.setImg(null);
        }

        registRepository.save(request.toEntity());
    }

    @Override
    public RegistResponseDto updateRegist(Long registId, int newStatus) {
        Regist regist = registRepository.findById(registId).orElseThrow(RegistNotFoundException::new);
        regist.update(newStatus);
        registRepository.save(regist);
        return RegistResponseDto.from(regist);
    }

    @Override
    public void deleteRegist(Long registId) {
        Regist regist = registRepository.findById(registId).orElseThrow(RegistNotFoundException::new);
        registRepository.delete(regist);
    }

    @Override
    public List<RegistResponseDto> getList() {
        return registRepository.findAllByOrderByIdDesc().stream()
                .map(regist -> RegistResponseDto.from(regist)).collect(Collectors.toList());
    }

    @Override
    public String getImg(String img) {
        return uploadPath + File.separator + img;
    }
}
