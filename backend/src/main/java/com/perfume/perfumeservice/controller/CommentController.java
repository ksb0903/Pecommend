package com.perfume.perfumeservice.controller;

import com.perfume.perfumeservice.dto.comment.CommentsRequestDto;
import com.perfume.perfumeservice.dto.comment.CommentsResponseDto;
import com.perfume.perfumeservice.service.comment.CommentService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/comment")
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/list.do/{id}")
    @ApiOperation(value = "댓글 조회")
    public ResponseEntity<List<CommentsResponseDto>> getList(@PathVariable Long id){
        return new ResponseEntity<>(commentService.getList(id), HttpStatus.OK);
    }

    @PostMapping
    @ApiOperation(value = "댓글 작성")
    public ResponseEntity<CommentsResponseDto> writeComment(@RequestBody CommentsRequestDto dto){
        CommentsResponseDto result = commentService.writeComment(dto);
        return result == null ?
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build() :
                ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @PatchMapping("/{id}")
    @ApiOperation(value = "댓글 수정")
    public ResponseEntity<CommentsResponseDto> updateComment(@PathVariable Long id, @RequestBody CommentsRequestDto dto){
        CommentsResponseDto result = commentService.updateComment(id, dto);
        return result == null ?
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build() :
                ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "댓글 삭제")
    public ResponseEntity<CommentsResponseDto> deleteComment(@PathVariable Long id){
        commentService.deleteComment(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/like")
    @ApiOperation(value = "댓글 추천")
    public ResponseEntity<String> addLike(@RequestBody Map<String, Long> map){
        Long userId = map.get("userId");
        Long commentId = map.get("commentId");

        String result = commentService.addLike(userId, commentId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/dislike")
    @ApiOperation(value = "댓글 비추천")
    public ResponseEntity<String> addDisLike(@RequestBody Map<String, Long> map){
        Long userId = map.get("userId");
        Long commentId = map.get("commentId");

        String result = commentService.addDisLike(userId, commentId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/profile.do/{id}")
    @ApiOperation(value = "프로필 댓글 목록 조회")
    public ResponseEntity<List<CommentsResponseDto>> getProfileComments(@PathVariable Long id){
        return new ResponseEntity<>(commentService.getProfileComments(id), HttpStatus.OK);
    }
}
