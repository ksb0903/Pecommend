package com.perfume.perfumeservice.controller;

import com.perfume.perfumeservice.dto.posts.PostsRequestDto;
import com.perfume.perfumeservice.dto.posts.PostsResponseDto;
import com.perfume.perfumeservice.service.community.CommunityService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/community")
public class CommunityController {
    private final CommunityService communityService;

    @PostMapping("/like")
    public ResponseEntity<String> addLike(@RequestBody Map<String, Long> map){
        Long userId = map.get("userId");
        Long postId = map.get("postId");
        String result = communityService.addLike(userId, postId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/upload")
    @ApiOperation(value = "게시글 작성(이미지 포함)")
    public ResponseEntity<String> writePostAndImage(@RequestPart(value = "dto") PostsRequestDto dto, @RequestPart(value = "file", required = false) MultipartFile[] file){
        String message = communityService.writePostAndImage(dto, file);
        return (message != null) ?
                ResponseEntity.status(HttpStatus.OK).body(message) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/detail.do/{id}")
    @ApiOperation(value = "게시글 조회하기")
    public ResponseEntity<PostsResponseDto> getPost(@PathVariable long id){
        return new ResponseEntity<>(communityService.getPost(id), HttpStatus.OK);
    }

    @GetMapping("/search.do")
    @ApiOperation(value = "게시글 이름으로 검색하기")
    public ResponseEntity<List<PostsResponseDto>> searchPostTitle(@RequestParam String type, @RequestParam String word){
        if(type.equals("title"))
            return new ResponseEntity<>(communityService.searchPostTitle(word), HttpStatus.OK);
        else if(type.equals("writer")) {
            return new ResponseEntity<>(communityService.searchPostWriter(word), HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @PostMapping
    @ApiOperation(value = "게시글 작성")
    public ResponseEntity<PostsResponseDto> writePost(@RequestBody PostsRequestDto dto){
        PostsResponseDto response = communityService.writePost(dto);

        return (response != null) ?
                ResponseEntity.status(HttpStatus.OK).body(response) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/list.do/user/{userid}")
    @ApiOperation(value = "해당 유저가 쓴 글 가져오기")
    public ResponseEntity<List<PostsResponseDto>> getListByUser(@PathVariable Long userid){
        return new ResponseEntity<>(communityService.getListByUser(userid), HttpStatus.OK);
    }

    @GetMapping("/list.do/{category}")
    @ApiOperation(value = "해당 카테고리 게시글 목록 가져오기")
    public ResponseEntity<List<PostsResponseDto>> getList(@PathVariable int category){
        List<PostsResponseDto> postsDtoList = communityService.getList(category);
        return new ResponseEntity<>(postsDtoList, HttpStatus.OK);
    }

    @GetMapping("/list.do")
    @ApiOperation(value = "전체게시글 목록 가져오기")
    public ResponseEntity<List<PostsResponseDto>> getListAll(){
        List<PostsResponseDto> postsDtoList = communityService.getListAll();
        return new ResponseEntity<>(postsDtoList, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    @ApiOperation(value = "게시글 수정")
    public ResponseEntity<PostsResponseDto> updatePost(@PathVariable Long id, @RequestBody PostsRequestDto dto){
        PostsResponseDto result = communityService.updatePost(id, dto);
        return result == null ?
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build() :
                ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "게시글 삭제")
    public ResponseEntity<Integer> deletePost(@PathVariable Long id){
        communityService.deletePost(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list.do/like/{category}")
    @ApiOperation(value = "해당 카테고리 게시글 목록 추천 순으로 가져오기")
    public ResponseEntity<List<PostsResponseDto>> getListByLike(@PathVariable int category){
        List<PostsResponseDto> postsDtoList = communityService.getListByLike(category);
        return new ResponseEntity<>(postsDtoList, HttpStatus.OK);
    }

    @GetMapping("/list.do/like")
    @ApiOperation(value = "전체 게시글 목록 추천 순으로 가져오기")
    public ResponseEntity<List<PostsResponseDto>> getListByLike(){
        List<PostsResponseDto> postsDtoList = communityService.getListByLike();
        return new ResponseEntity<>(postsDtoList, HttpStatus.OK);
    }

    @GetMapping("/list.do/best/{category}")
    @ApiOperation(value = "카테고리 별 게시글 목록 추천 10개 이상 가져오기")
    public ResponseEntity<List<PostsResponseDto>> getBestListByCategory(@PathVariable int category){
        List<PostsResponseDto> postsDtoList = communityService.getBestListByCategory(category);
        return new ResponseEntity<>(postsDtoList, HttpStatus.OK);
    }

    @GetMapping("/list.do/best")
    @ApiOperation(value = "전체 게시글 목록 추천 10개 이상 가져오기")
    public ResponseEntity<List<PostsResponseDto>> getBestList(){
        List<PostsResponseDto> postsDtoList = communityService.getBestList();
        return new ResponseEntity<>(postsDtoList, HttpStatus.OK);
    }

    @GetMapping("/list.do/main")
    @ApiOperation(value = "메인에 쓸 게시글 목록(5가지 카테고리) 가져오기")
    public ResponseEntity<Map<String, Object>> getMain(){
        return new ResponseEntity<>(communityService.getMain(), HttpStatus.OK);
    }
}
