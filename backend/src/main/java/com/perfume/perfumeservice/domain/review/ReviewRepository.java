package com.perfume.perfumeservice.domain.review;

import com.perfume.perfumeservice.domain.perfume.Perfume;
import com.perfume.perfumeservice.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPerfumeOrderByIdDesc(Perfume perfume);
    List<Review> findByPerfumeOrderById(Perfume perfume);

    @Query(nativeQuery = true, value =
        "select * from review r where r.perfume_id=:perfume " +
                "order by (select count(*) from review_like rl where r.review_id=rl.review_id) desc"
    )
    List<Review> findByPerfumeOrderByLikes(@Param("perfume") Long id);
    Optional<Review> findByUserAndPerfume(UserEntity user, Perfume perfume);
    @Query(nativeQuery = true, value =
        "select * from review r where r.perfume_id=:perfume_id " +
                "and (select count(*) from perfume_like pl where pl.user_id=r.user_id and pl.perfume_id=:perfume_id)>0 " +
                "order by r.review_id desc"
    )
    List<Review> findReviewLikePerfumeUser(@Param("perfume_id") Long perfumeId);
    @Query(nativeQuery = true, value =
            "select * from review r where r.perfume_id=:perfume_id " +
                    "and (select count(*) from perfume_dislike pl where pl.user_id=r.user_id and pl.perfume_id=:perfume_id)>0 " +
                    "order by r.review_id desc"
    )
    List<Review> findReviewDisLikePerfumeUser(@Param("perfume_id") Long perfumeId);
    List<Review> findAllByOrderByIdDesc();
}
