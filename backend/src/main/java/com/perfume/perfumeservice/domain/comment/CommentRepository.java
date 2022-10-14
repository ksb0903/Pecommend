package com.perfume.perfumeservice.domain.comment;

import com.perfume.perfumeservice.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(nativeQuery = true, value =
            "select * from comment c left join comment p " +
                    " on c.parent_id = p.comment_id" +
                    " where c.community_id = :communityId" +
                    " order by c.parent_id Is Null DESC, c.created_date ")
    List<Comment> findCommentByCommunityId(@Param("communityId") Long communityId);

    List<Comment> findByWriterOrderByIdDesc(UserEntity user);
}
