package com.perfume.perfumeservice.domain.perfume;

import com.perfume.perfumeservice.domain.comment.Comment;
import com.perfume.perfumeservice.domain.comment.CommentLike;
import com.perfume.perfumeservice.domain.user.UserEntity;
import com.perfume.perfumeservice.dto.perfume.PerfumeLikeResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PerfumeLikeRepository extends JpaRepository<PerfumeLike, Long> {

    Optional<PerfumeLike> findByPerfumeAndUser(Perfume perfume, UserEntity user);

    @Query(value =
            "SELECT p.perfume_id AS perfumeId, Count(p.user_id) AS userCount "
            + "FROM perfume_like p, "
            + "(SELECT user_id "
                    + "FROM perfume_like "
                    + "WHERE perfume_id = :id) sq "
            + "WHERE p.user_id = sq.user_id AND NOT p.perfume_id IN (:id) "
            + "GROUP BY p.perfume_id "
            + "ORDER BY Count(p.user_id) DESC "
            + "LIMIT 10"
            , nativeQuery = true
    )
    List<PerfumeLDCount> findPerfumeLikeLikeWithJPQL(Long id);

    @Query(value =
            "SELECT p.perfume_id AS perfumeId, Count(p.user_id) AS userCount "
                    + "FROM perfume_like p, "
                    + "(SELECT user_id "
                        + "FROM perfume_dislike "
                        + "WHERE perfume_id = :id) sq "
                    + "WHERE p.user_id = sq.user_id AND NOT p.perfume_id IN (:id) "
                    + "GROUP BY p.perfume_id "
                    + "ORDER BY Count(p.user_id) DESC "
                    + "LIMIT 10"
            , nativeQuery = true
    )
    List<PerfumeLDCount> findPerfumeDislikeLikeWithJPQL(Long id);
    List<PerfumeLike> findByUser(UserEntity user);

    @Query(nativeQuery = true, value =
//            "SELECT perfume_id AS perfumeId, COUNT(perfume_id) AS userCount FROM perfume_like WHERE user_id IN (:users) GROUP BY perfume_id ORDER BY COUNT(perfume_id) DESC, perfume_id ASC"
            "SELECT perfume_id AS perfumeId, COUNT(perfume_id) AS userCount FROM perfume_like WHERE user_id IN (:users) GROUP BY perfume_id ORDER BY COUNT(perfume_id) DESC, perfume_id ASC"
    )
    List<Long> findPerfumeIdByUserList(List<Long> users);
}
