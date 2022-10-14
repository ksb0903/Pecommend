package com.perfume.perfumeservice.dto.posts;

import com.perfume.perfumeservice.domain.community.Community;
import com.perfume.perfumeservice.domain.community.CommunityLike;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;

@Getter
@Builder
@AllArgsConstructor
public class PostsResponseDto {
    private Long id;
    private int category;
    private Long writer_id;
    private String writer;
    private String title;
    private String content;
    private int communityLike;
    private int commentCount;
    private String createDateYMD;
    private String createDateHMS;
    private String modifiedDateYMD;
    private String modifiedDateHMS;

    public static PostsResponseDto from(Community community){
        Set<CommunityLike> set = community.getLikes();
        int likes = set == null ? 0 : set.size();
        int commentCount = community.getComments() == null ? 0 : community.getComments().size();
        String createDateYMD = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(community.getCreatedDate()).toString();
        String createDateHMS = DateTimeFormatter.ofPattern("HH:mm:ss").format(community.getCreatedDate()).toString();

        String modifiedDateYMD = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(community.getModifiedDate()).toString();
        String modifiedDateHMS = DateTimeFormatter.ofPattern("HH:mm:ss").format(community.getModifiedDate()).toString();

        return PostsResponseDto.builder()
                .id(community.getId())
                .category(community.getCategory())
                .writer_id(community.getWriter().getId())
                .writer(community.getWriter().getNickname())
                .title(community.getTitle())
                .content(community.getContent())
                .communityLike(likes)
                .commentCount(commentCount)
                .createDateYMD(createDateYMD)
                .createDateHMS(createDateHMS)
                .modifiedDateYMD(modifiedDateYMD)
                .modifiedDateHMS(modifiedDateHMS)
                .build();
    }
}
