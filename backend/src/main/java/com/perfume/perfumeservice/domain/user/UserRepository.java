package com.perfume.perfumeservice.domain.user;

import com.perfume.perfumeservice.domain.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByNickname(String nickname);

    List<UserEntity> findByNicknameLike(String nickname);

    void deleteByEmail(String email);

    @Query(nativeQuery = true, value =
            "SELECT u1.user_id AS id FROM users u1, " +
                    "(SELECT u2.user_id FROM users u2, " +
                    "(SELECT user_id FROM users WHERE mbti IN (:mbtis)) sq2 " +
                    "WHERE u2.user_id = sq2.user_id AND gender IN (:genders)) sq1 " +
                    "WHERE u1.user_id = sq1.user_id AND TRUNCATE(u1.age, -1) IN (:ages)"
    )
    List<Long> findByMbtiAndGenderAndAge(List<String> mbtis, List<String> genders, List<Integer> ages); // 엠벼랑 성별이랑 나이로 거른 유저 가져오기

    // 엠벼로 유저 가져오기
    @Query(nativeQuery = true, value =
            "SELECT user_id FROM users WHERE mbti IN (:mbtis)"
    )
    List<Long> findByMbti(List<String> mbtis);

    // 나이로 유저 가져오기
    @Query(nativeQuery = true, value =
            "SELECT user_id FROM users WHERE TRUNCATE(age, -1) IN (:ages)"
    )
    List<Long> findByAge(List<Integer> ages);

    // 성별로 유저 가져오기
    @Query(nativeQuery = true, value =
            "SELECT user_id FROM users WHERE gender IN (:genders)"
    )
    List<Long> findByGender(List<String> genders);

    // 엠벼랑 성별로 유저 가져오기
    @Query(nativeQuery = true, value =
            "SELECT u2.user_id FROM users u2, " +
            "(SELECT user_id FROM users WHERE mbti IN (:mbtis)) sq2 " +
            "WHERE u2.user_id = sq2.user_id AND gender IN (:genders)"
    )
    List<Long> findByMbtiAndGender(List<String> mbtis, List<String> genders);

    // 성별과 나이로 유저 가져오기
    @Query(nativeQuery = true, value =
            "SELECT u1.user_id AS id FROM users u1, " +
                    "(SELECT user_id FROM users WHERE gender IN (:genders)) sq2 " +
                    "WHERE u1.user_id = sq2.user_id AND TRUNCATE(u1.age, -1) IN (:ages)"
    )
    List<Long> findByGenderAndAge(List<String> genders, List<Integer> ages);


    // 엠벼와 나이로 유져 가져오기
    @Query(nativeQuery = true, value =
            "SELECT u1.user_id AS id FROM users u1, " +
                    "(SELECT user_id FROM users WHERE mbti IN (:mbtis)) sq2 " +
                    "WHERE u1.user_id = sq2.user_id AND TRUNCATE(u1.age, -1) IN (:ages)"
    )
    List<Long> findByMbtiAndAge(List<String> mbtis, List<Integer> ages);

    // 그냥 userID 가져오기
    @Query(nativeQuery = true, value =
            "SELECT user_id AS id FROM users"
    )
    List<Long> findUserId();


}
