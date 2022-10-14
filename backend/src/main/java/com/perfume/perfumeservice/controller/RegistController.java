package com.perfume.perfumeservice.controller;

import com.perfume.perfumeservice.dto.regist.RegistRequestDto;
import com.perfume.perfumeservice.dto.regist.RegistResponseDto;
import com.perfume.perfumeservice.service.regist.RegistService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/regist")
public class RegistController {

    private final RegistService registService;

    @PostMapping
    @ApiOperation(value = "향수 등록 신청 작성")
    public ResponseEntity<String> writeRegist(@RequestPart(value = "request") RegistRequestDto request, @RequestPart(value = "file", required = false)MultipartFile file){
        registService.writeRegist(request, file);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    @ApiOperation(value = "향수 등록 신청 상태 변경")
    public ResponseEntity<RegistResponseDto> updateRegist(@PathVariable Long id, @RequestParam int newStatus){
        return new ResponseEntity<>(registService.updateRegist(id, newStatus), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "향수 등록 신청 삭제")
    public ResponseEntity<String> deleteRegist(@PathVariable Long id){
        registService.deleteRegist(id);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/list.do")
    @ApiOperation(value = "향수 등록 신청 목록")
    public ResponseEntity<List<RegistResponseDto>> getList(){
        return new ResponseEntity<>(registService.getList(), HttpStatus.OK);
    }

    @GetMapping("/img.do/{img}")
    @ApiOperation(value = "이미지 가져오기")
    public ResponseEntity<Resource> getImg(@PathVariable String img){
        String path = registService.getImg(img);
        Resource resource = new FileSystemResource(path);
        HttpHeaders headers = new HttpHeaders();
        Path filePath = null;

        try{
            filePath = Paths.get(path);
            headers.add("Content-Type", Files.probeContentType(filePath));
        }catch(Exception e){
            e.printStackTrace();
        }

        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }
}
