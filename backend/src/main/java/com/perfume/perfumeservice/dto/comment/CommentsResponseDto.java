package com.perfume.perfumeservice.dto.comment;

import com.perfume.perfumeservice.domain.comment.Comment;
import com.perfume.perfumeservice.domain.comment.CommentDisLike;
import com.perfume.perfumeservice.domain.comment.CommentLike;
import com.perfume.perfumeservice.domain.community.Community;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@ToString
@Builder
public class CommentsResponseDto {
    private Long id;
    private Long communityId;
    private String content;
    private Long writerId;
    private String writer;
    private int commentLike;
    private String createDateYMD;
    private String createDateHMS;
    private String modifiedDateYMD;
    private String modifiedDateHMS;
    private int depth;
    private Long parentId;
    private boolean isDeleted;

    private List<CommentsResponseDto> children;



    public static CommentsResponseDto from(Comment comment){
        Set<CommentLike> likeSet = comment.getCommentLikes();
        Set<CommentDisLike> disLikeSet = comment.getCommentDisLikes();
        int likes = likeSet == null ? 0 : likeSet.size();
        int disLikes = disLikeSet == null ? 0 : disLikeSet.size();
        Long parentId = comment.getParent() == null ? null : comment.getParent().getId();

        String createDateYMD = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(comment.getCreatedDate()).toString();
        String createDateHMS = DateTimeFormatter.ofPattern("HH:mm:ss").format(comment.getCreatedDate()).toString();

        String modifiedDateYMD = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(comment.getModifiedDate()).toString();
        String modifiedDateHMS = DateTimeFormatter.ofPattern("HH:mm:ss").format(comment.getModifiedDate()).toString();


        return CommentsResponseDto.builder()
                .id(comment.getId())
                .communityId(comment.getCommunity().getId())
                .content(comment.getContent())
                .writerId(comment.getWriter().getId())
                .writer(comment.getWriter().getNickname())
                .commentLike(likes - disLikes)
                .createDateYMD(createDateYMD)
                .createDateHMS(createDateHMS)
                .modifiedDateYMD(modifiedDateYMD)
                .modifiedDateHMS(modifiedDateHMS).depth(comment.getDepth())
                .parentId(parentId)
                .isDeleted(comment.isDeleted())
                .build();
    }

    public void addChildren(List<CommentsResponseDto> children){
        this.children = children;
    }

}