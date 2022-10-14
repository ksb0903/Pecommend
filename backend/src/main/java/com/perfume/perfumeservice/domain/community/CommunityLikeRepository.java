package com.perfume.perfumeservice.domain.community;

import com.perfume.perfumeservice.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CommunityLikeRepository extends JpaRepository<CommunityLike, Long> {
    Optional<CommunityLike> findByUserAndCommunity(UserEntity user, Community community);
    void deleteByUserAndCommunity(UserEntity user, Community community);
}
