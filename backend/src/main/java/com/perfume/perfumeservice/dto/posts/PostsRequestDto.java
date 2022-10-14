package com.perfume.perfumeservice.dto.posts;

import com.perfume.perfumeservice.domain.community.Community;
import com.perfume.perfumeservice.domain.user.UserEntity;
import lombok.Data;

@Data
public class PostsRequestDto {
    private int category;
    private Long writer;
    private String title;
    private String content;


    public Community toEntity(UserEntity user){
        return Community.builder()
                .category(category)
                .writer(user)
                .title(title)
                .content(content)
                .build();
    }

}
