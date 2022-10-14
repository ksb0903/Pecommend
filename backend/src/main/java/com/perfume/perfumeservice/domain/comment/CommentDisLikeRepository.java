package com.perfume.perfumeservice.domain.comment;

import com.perfume.perfumeservice.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentDisLikeRepository extends JpaRepository<CommentDisLike, Long> {

    Optional<CommentDisLike> findByUserAndComment(UserEntity user, Comment comment);
}
