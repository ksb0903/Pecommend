package com.perfume.perfumeservice.service.review;

import com.perfume.perfumeservice.domain.perfume.*;
import com.perfume.perfumeservice.domain.review.*;
import com.perfume.perfumeservice.domain.user.UserEntity;
import com.perfume.perfumeservice.domain.user.UserRepository;
import com.perfume.perfumeservice.dto.perfume.PerfumeResponseDto;
import com.perfume.perfumeservice.dto.review.ReviewRequestDto;
import com.perfume.perfumeservice.dto.review.ReviewResponseDto;
import com.perfume.perfumeservice.dto.review.ReviewUpdateDto;
import com.perfume.perfumeservice.exception.Review.ReviewExistException;
import com.perfume.perfumeservice.exception.Review.ReviewNotFoundException;
import com.perfume.perfumeservice.exception.perfume.PerfumeNotFoundException;
import com.perfume.perfumeservice.exception.perfume.TagNotFoundException;
import com.perfume.perfumeservice.exception.user.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@RequiredArgsConstructor
@Transactional
@Slf4j
@Service
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;
    private final PerfumeTagRepository perfumeTagRepository;
    private final ReviewTagRepository reviewTagRepository;
    private final ReviewLikeRepository reviewLikeRepository;
    private final ReviewDisLikeRepository reviewDisLikeRepository;
    private final TagRepository tagRepository;
    private final PerfumeRepository perfumeRepository;
    private final UserRepository userRepository;

    @Override
    public ReviewResponseDto writeReview(ReviewRequestDto reviewDto) {
        // 리뷰 저장
        UserEntity user = userRepository.findById(reviewDto.getUser_id()).orElseThrow(UserNotFoundException::new);
        Perfume perfume = perfumeRepository.findById(reviewDto.getPerfume_id()).orElseThrow(PerfumeNotFoundException::new);
        Optional<Review> check = reviewRepository.findByUserAndPerfume(user, perfume);
        if(check.isPresent()){
            throw new ReviewExistException();
        }

        Review review = reviewDto.toEntity(perfume, user);
        reviewRepository.save(review);

        // 리뷰-태그 저장
        List<Long> tags = reviewDto.getTags();
        List<ReviewTag> tagList = new LinkedList<>();
        for(Long tagId: tags){
            Tag tag = tagRepository.findById(tagId).orElseThrow(TagNotFoundException::new);
            ReviewTag rt = ReviewTag.builder().review(review).tag(tag).build();
            tagList.add(rt);
            reviewTagRepository.save(rt);

            // 향수-태그 업데이트
            Optional<PerfumeTag> pt = perfumeTagRepository.findByPerfumeAndTag(perfume, tag);
            if(pt.isPresent()){
                pt.get().setCount(pt.get().getCount() + 1);
                perfumeTagRepository.save(pt.get());
            }else{
                perfumeTagRepository.save(PerfumeTag.builder().perfume(perfume).tag(tag).count(1).build());
            }
        }

        review.setTags(tagList);
        return ReviewResponseDto.from(reviewRepository.save(review), tagList);
    }

    @Override
    public ReviewResponseDto updateReview(Long id, ReviewRequestDto reviewDto) {
        // 리뷰 업데이트
        Review review = reviewRepository.findById(id).orElseThrow(ReviewNotFoundException::new);
        Perfume perfume = perfumeRepository.findById(reviewDto.getPerfume_id()).orElseThrow(PerfumeNotFoundException::new);
        review.update(reviewDto);

        // 기존 태그 삭제
        List<Long> tags = reviewDto.getTags();
        List<ReviewTag> rtList = reviewTagRepository.findByReview(review).orElseThrow(ReviewNotFoundException::new);

        for(ReviewTag rt: rtList){
            Tag t = rt.getTag();

            Optional<PerfumeTag> pt = perfumeTagRepository.findByPerfumeAndTag(perfume, t);

            if(pt.isPresent()){
                if(pt.get().getCount()==1){
                    perfumeTagRepository.delete(pt.get());
                }else{
                    pt.get().setCount(pt.get().getCount() - 1);
                    perfumeTagRepository.save(pt.get());
                }
            }else{
                throw new TagNotFoundException();
            }

            reviewTagRepository.delete(rt);
        }

        // 새 태그 추가
        List<ReviewTag> nrtList = new LinkedList<>();
        for(Long tagId: tags){
            Tag tag = tagRepository.findById(tagId).orElseThrow(TagNotFoundException::new);
            ReviewTag rt = ReviewTag.builder().review(review).tag(tag).build();
            nrtList.add(rt);
            reviewTagRepository.save(rt);

            Optional<PerfumeTag> pt = perfumeTagRepository.findByPerfumeAndTag(perfume, tag);
            if(pt.isPresent()){
                pt.get().setCount(pt.get().getCount() + 1);
                perfumeTagRepository.save(pt.get());
            }else{
                perfumeTagRepository.save(PerfumeTag.builder().perfume(perfume).tag(tag).count(1).build());
            }
        }

        review.setTags(nrtList);
        return ReviewResponseDto.from(reviewRepository.save(review), nrtList);
    }

    @Override
    public void deleteReview(Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(ReviewNotFoundException::new);
        Perfume perfume = perfumeRepository.findById(review.getPerfume().getId()).orElseThrow(PerfumeNotFoundException::new);

        List<ReviewTag> rtList = review.getReviewTags();
        List<Tag> tList = new LinkedList<>();

        for(ReviewTag rt: rtList){
            tList.add(rt.getTag());
        }

        for(Tag t: tList){
            Optional<PerfumeTag> pt = perfumeTagRepository.findByPerfumeAndTag(perfume, t);

            if(pt.isPresent()){
                if(pt.get().getCount()==1){
                    perfumeTagRepository.delete(pt.get());
                }else{
                    pt.get().setCount(pt.get().getCount() - 1);
                    perfumeTagRepository.save(pt.get());
                }
            }else{
                throw new TagNotFoundException();
            }
        }

        reviewRepository.delete(review);
    }

    @Override
    public List<ReviewResponseDto> getList(Long id, String order) {
        Perfume perfume = perfumeRepository.findById(id).orElseThrow(PerfumeNotFoundException::new);
        List<Review> review;
        List<ReviewResponseDto> list;
        switch(order){
            case "new":
                review =  reviewRepository.findByPerfumeOrderByIdDesc(perfume);
                list = new LinkedList<>();

                for(Review r: review){
                    List<ReviewTag> rtList = r.getReviewTags();
                    list.add(ReviewResponseDto.from(r, rtList));
                }

                return list;
            case "old":
                review =  reviewRepository.findByPerfumeOrderById(perfume);
                list = new LinkedList<>();

                for(Review r: review){
                    List<ReviewTag> rtList = r.getReviewTags();
                    list.add(ReviewResponseDto.from(r, rtList));
                }

                return list;
            case "best":
                review =  reviewRepository.findByPerfumeOrderByLikes(id);
                list = new LinkedList<>();

                for(Review r: review){
                    List<ReviewTag> rtList = r.getReviewTags();
                    list.add(ReviewResponseDto.from(r, rtList));
                }

                return list;
            default:
                throw new RuntimeException("잘못된 요청입니다.");
        }
    }

    @Override
    public String addLike(Map<String, Long> map) {
        Long userId = map.get("userId");
        Long reviewId = map.get("reviewId");

        UserEntity user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Review review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);

        Optional<ReviewLike> like = reviewLikeRepository.findByUserAndReview(user, review);
        Optional<ReviewDisLike> disLike = reviewDisLikeRepository.findByUserAndReview(user, review);

        if(disLike.isPresent()){
            return "X";
        }else{
            if(like.isPresent()){
                reviewLikeRepository.delete(like.get());
                return "CANCEL";
            }else{
                reviewLikeRepository.save(ReviewLike.builder().review(review).user(user).build());
                return "ADD";
            }
        }
    }

    @Override
    public String addDisLike(Map<String, Long> map) {
        Long userId = map.get("userId");
        Long reviewId = map.get("reviewId");

        UserEntity user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Review review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);

        Optional<ReviewLike> like = reviewLikeRepository.findByUserAndReview(user, review);
        Optional<ReviewDisLike> disLike = reviewDisLikeRepository.findByUserAndReview(user, review);

        if(like.isPresent()){
            return "X";
        }else{
            if(disLike.isPresent()){
                reviewDisLikeRepository.delete(disLike.get());
                return "CANCEL";
            }else{
                reviewDisLikeRepository.save(ReviewDisLike.builder().review(review).user(user).build());
                return "ADD";
            }
        }
    }

    @Override
    public List<ReviewResponseDto> getLikeList(Long id) {
        List<Review> rList = reviewRepository.findReviewLikePerfumeUser(id);
        List<ReviewResponseDto> dtoList = new LinkedList<>();

        for(Review r: rList){
            dtoList.add(ReviewResponseDto.from(r, r.getReviewTags()));
        }

        return dtoList;
    }

    @Override
    public List<ReviewResponseDto> getDisLikeList(Long id) {
        List<Review> rList = reviewRepository.findReviewDisLikePerfumeUser(id);
        List<ReviewResponseDto> dtoList = new LinkedList<>();

        for(Review r: rList){
            dtoList.add(ReviewResponseDto.from(r, r.getReviewTags()));
        }

        return dtoList;
    }
    @Override
    public List<Map<String, Object>> getNewReview() {
        List<Map<String, Object>> list = new LinkedList<>();

        List<Review> rList = reviewRepository.findAllByOrderByIdDesc();

        int idx = 0;
        for (Review r : rList) {
            ReviewResponseDto rDto = ReviewResponseDto.from(r);
            PerfumeResponseDto pDto = PerfumeResponseDto.from(r.getPerfume());

            Map<String, Object> map = new LinkedHashMap<>();
            map.put("rDto", rDto);
            map.put("pDto", pDto);

            list.add(map);

            idx++;
            if (idx == 6) break;
        }

        return list;
    }

    @Override
    public List<Tag> getTagAll() {
        return tagRepository.findAllByOrderByTagName();
    }

    @Override
    public ReviewResponseDto updateReviewNoTag(Long id, ReviewUpdateDto dto) {
        Review review = reviewRepository.findById(id).orElseThrow(ReviewNotFoundException::new);
        review.update(dto);
        List<ReviewTag> tagList = review.getReviewTags();
        reviewRepository.save(review);

        return ReviewResponseDto.from(review, tagList);
    }
}
