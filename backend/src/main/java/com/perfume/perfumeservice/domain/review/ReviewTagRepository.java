package com.perfume.perfumeservice.domain.review;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewTagRepository extends JpaRepository<ReviewTag, Long> {
    Optional<List<ReviewTag>> findByReview(Review review);
}
