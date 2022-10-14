package com.perfume.perfumeservice.dto.review;

import com.perfume.perfumeservice.domain.perfume.Perfume;
import com.perfume.perfumeservice.domain.perfume.Tag;
import com.perfume.perfumeservice.domain.review.Review;
import com.perfume.perfumeservice.domain.user.UserEntity;
import lombok.Data;

import java.util.List;

@Data
public class ReviewRequestDto {
    private Long perfume_id;
    private Long user_id;
    private String content;
    private int score;
    private List<Long> tags;

    public Review toEntity(Perfume perfume, UserEntity user){

        return Review.builder()
                .perfume(perfume)
                .user(user)
                .content(content)
                .score(score)
                .build();
    }
}
