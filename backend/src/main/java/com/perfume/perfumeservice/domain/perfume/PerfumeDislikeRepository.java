package com.perfume.perfumeservice.domain.perfume;

import com.perfume.perfumeservice.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PerfumeDislikeRepository extends JpaRepository<PerfumeDislike, Long> {

    Optional<PerfumeDislike> findByPerfumeAndUser(Perfume perfume, UserEntity user);

    @Query(value =
            "SELECT p.perfume_id AS perfumeId, Count(p.user_id) AS userCount "
                    + "FROM perfume_dislike p, "
                    + "(SELECT user_id "
                        + "FROM perfume_like "
                        + "WHERE perfume_id = :id) sq "
                    + "WHERE p.user_id = sq.user_id AND NOT p.perfume_id IN (:id) "
                    + "GROUP BY p.perfume_id "
                    + "ORDER BY Count(p.user_id) DESC "
                    + "LIMIT 10"
            , nativeQuery = true
    )
    List<PerfumeLDCount> findPerfumeLikeDislikeWithJPQL(Long id);

    @Query(value =
            "SELECT p.perfume_id AS perfumeId, Count(p.user_id) AS userCount "
                    + "FROM perfume_dislike p, "
                    + "(SELECT user_id "
                        + "FROM perfume_dislike "
                        + "WHERE perfume_id = :id) sq "
                    + "WHERE p.user_id = sq.user_id AND NOT p.perfume_id IN (:id) "
                    + "GROUP BY p.perfume_id "
                    + "ORDER BY Count(p.user_id) DESC "
                    + "LIMIT 10"
            , nativeQuery = true
    )
    List<PerfumeLDCount> findPerfumeDislikeDislikeWithJPQL(Long id);
    List<PerfumeDislike> findByUser(UserEntity user);
}
