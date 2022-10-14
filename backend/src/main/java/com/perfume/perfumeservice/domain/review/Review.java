package com.perfume.perfumeservice.domain.review;

import com.perfume.perfumeservice.domain.baseTime.BaseTime;
import com.perfume.perfumeservice.domain.perfume.Perfume;
import com.perfume.perfumeservice.domain.user.UserEntity;
import com.perfume.perfumeservice.dto.review.ReviewRequestDto;
import com.perfume.perfumeservice.dto.review.ReviewUpdateDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "review")
public class Review extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    // perfume
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "perfume_id")
    private Perfume perfume;

    // user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    // content
    @Column(name = "content")
    private String content;

    // score - 별점
    @Column(name = "score")
    private int score;

    // regdate - 보류
    // ?

//    // review_tag
    @OneToMany(mappedBy = "review", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ReviewTag> reviewTags = new LinkedList<ReviewTag>();

    // review_like
    @OneToMany(mappedBy = "review", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ReviewLike> reviewLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "review", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ReviewDisLike> reviewDisLikeList = new ArrayList<>();

    public void update(ReviewRequestDto requestDto){
        this.content = requestDto.getContent();
        this.score = requestDto.getScore();
    }

    public void update(ReviewUpdateDto requestDto){
        this.content = requestDto.getContent();
        this.score = requestDto.getScore();
    }

    public void setTags(List<ReviewTag> tags){
        this.reviewTags = tags;
    }
}
