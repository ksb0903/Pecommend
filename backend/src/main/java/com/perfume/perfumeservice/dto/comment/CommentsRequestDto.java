package com.perfume.perfumeservice.dto.comment;

import com.perfume.perfumeservice.domain.comment.Comment;
import com.perfume.perfumeservice.domain.comment.CommentLike;
import com.perfume.perfumeservice.domain.community.Community;
import com.perfume.perfumeservice.domain.user.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Builder
@ToString
public class CommentsRequestDto {
    private Long communityId;
    private Long writer;
    private String content;
    private int depth;
    private Long parent;


    public Comment toEntity(Community community, UserEntity user, Comment parnet){
        return Comment.builder()
                .community(community)
                .writer(user)
                .content(content)
                .parent(parnet)
                .build();
    }
}
