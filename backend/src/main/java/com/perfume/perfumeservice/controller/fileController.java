package com.perfume.perfumeservice.controller;

import com.perfume.perfumeservice.service.community.CommunityService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/file")
public class fileController {

    private final CommunityService communityService;

    @PostMapping(value = "/upload")
    public ResponseEntity<String> upload(@RequestParam Map<String, Object> map, MultipartHttpServletRequest request) throws Exception{
        return new ResponseEntity<>(communityService.fileUpload(map, request), HttpStatus.OK);
    }

    @GetMapping(value = "/getimg.do/{img}")
    public ResponseEntity<Resource> getImg(@PathVariable String img) throws Exception{
        String path = communityService.getImg(img);

        Resource ret = new FileSystemResource(path);

        HttpHeaders header = new HttpHeaders();
        Path filePath = null;

        try {
            filePath = Paths.get(path);
            header.add("Content-Type", Files.probeContentType(filePath));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(ret, header, HttpStatus.OK);
    }
}