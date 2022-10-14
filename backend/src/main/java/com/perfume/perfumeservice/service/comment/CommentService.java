package com.perfume.perfumeservice.service.comment;

import com.perfume.perfumeservice.dto.comment.CommentsRequestDto;
import com.perfume.perfumeservice.dto.comment.CommentsResponseDto;
import lombok.RequiredArgsConstructor;

import java.util.List;


public interface CommentService {
    List<CommentsResponseDto> getList(Long id);
    CommentsResponseDto writeComment(CommentsRequestDto dto);

    CommentsResponseDto updateComment(Long id, CommentsRequestDto dto);

    void deleteComment(Long id);
    String addLike(Long userId, Long commentId);

    String addDisLike(Long userId, Long commentId);

    List<CommentsResponseDto> getProfileComments(Long id);
}
