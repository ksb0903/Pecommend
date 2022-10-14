package com.perfume.perfumeservice.domain.community;


import com.perfume.perfumeservice.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    //List<Community> findByCategory(int category);
    List<Community> findByCategoryOrderByIdDesc(int category);
    public List<Community> findAllByOrderByIdDesc();
    List<Community> findByTitleLike(String title);
    List<Community> findByWriterOrderByIdDesc(UserEntity user);

    @Query(nativeQuery = true, value =
        "select * from community c where category=:category " +
                "order by (select count(*) from community_like cl where c.community_id=cl.community_id) desc"
    )
    List<Community> findByCategoryOrderByLikes(@Param("category") int category);

    @Query(nativeQuery = true, value =
            "select * from community c " +
                    "order by (select count(*) from community_like cl where c.community_id=cl.community_id) desc"
    )
    List<Community> findAllOrderByLikes();

    @Query(nativeQuery = true, value =
            "select * from community c " +
                    "where (select count(*) from community_like cl where c.community_id=cl.community_id) >= 10 " +
                    "and c.category=:category " +
                    "order by c.community_id desc"
    )
    List<Community> findAllBestByCategory(@Param("category") int category);
    @Query(nativeQuery = true, value =
        "select * from community c " +
            "where (select count(*) from community_like cl where c.community_id=cl.community_id) >= 10 order by c.community_id desc"
    )
    List<Community> findAllBest();
}
