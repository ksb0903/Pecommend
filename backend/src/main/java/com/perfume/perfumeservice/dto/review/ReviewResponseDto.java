package com.perfume.perfumeservice.dto.review;

import com.perfume.perfumeservice.domain.review.Review;
import com.perfume.perfumeservice.domain.review.ReviewDisLike;
import com.perfume.perfumeservice.domain.review.ReviewLike;
import com.perfume.perfumeservice.domain.review.ReviewTag;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.LinkedList;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@ApiModel(value = "ReviewResponseDto", description = "리뷰 정보 응답 Dto")
public class ReviewResponseDto {
    private Long id;
    private String content;
    private int score;
    private Long user_id;
    private String user;
    private int reviewLike;
    private int reviewDisLike;
    private List<Long> tags;
    private List<String> tagNames;
    private String createdDate;
    private String modifiedDate;


    public static ReviewResponseDto from(Review review){
        return ReviewResponseDto.builder()
                .id(review.getId())
                .content(review.getContent())
                .score(review.getScore())
                .user_id(review.getUser().getId())
                .user(review.getUser().getNickname())
                .build();
    }
    public static ReviewResponseDto from(Review review, List<ReviewTag> rtList){
        List<ReviewLike> list = review.getReviewLikeList();
        int likes = list == null ? 0 : list.size();

        List<ReviewDisLike> dislist = review.getReviewDisLikeList();
        int dislikes = dislist == null ? 0 : dislist.size();

        List<Long> tagList = new LinkedList<>();
        List<String> tagNameList = new LinkedList<>();

        for(ReviewTag rt: rtList){
            tagList.add(rt.getTag().getId());
            tagNameList.add(rt.getTag().getTagName());
        }

        String cDate = review.getCreatedDate().toString().substring(0, 10);
        String cTime = review.getCreatedDate().toString().substring(11, 19);
        String mDate = review.getModifiedDate().toString().substring(0, 10);
        String mTime = review.getModifiedDate().toString().substring(11, 19);

        return ReviewResponseDto.builder()
                .id(review.getId())
                .content(review.getContent())
                .score(review.getScore())
                .user_id(review.getUser().getId())
                .user(review.getUser().getNickname())
                .reviewLike(likes)
                .reviewDisLike(dislikes)
                .tags(tagList)
                .tagNames(tagNameList)
                .createdDate(cDate + " " + cTime)
                .modifiedDate(mDate + " " + mTime)
                .build();
    }
}
