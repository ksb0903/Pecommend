package com.perfume.perfumeservice.domain.review;

import com.perfume.perfumeservice.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewDisLikeRepository extends JpaRepository<ReviewDisLike, Long> {
    Optional<ReviewDisLike> findByUserAndReview(UserEntity user, Review review);
}
