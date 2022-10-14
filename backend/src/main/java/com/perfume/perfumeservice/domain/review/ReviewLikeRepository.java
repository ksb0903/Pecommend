package com.perfume.perfumeservice.domain.review;

import com.perfume.perfumeservice.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewLikeRepository extends JpaRepository<ReviewLike, Long> {
    Optional<ReviewLike>findByUserAndReview(UserEntity user, Review review);
}
