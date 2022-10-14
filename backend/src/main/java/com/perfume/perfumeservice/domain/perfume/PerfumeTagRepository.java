package com.perfume.perfumeservice.domain.perfume;

import com.perfume.perfumeservice.dto.perfume.PerfumeTagResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PerfumeTagRepository  extends JpaRepository<PerfumeTag, Long> {

    public List<PerfumeTag> findByPerfumeOrderByCountDesc(Perfume perfume);

//    public List<PerfumeTag> findAllByOrderByCountDesc();

    // 그룹바이태그아이디
    @Query(value =
            "SELECT tag_id AS tagId, SUM(count) AS countSum "
                    + "FROM perfume_tag "
                    + "GROUP BY tag_id "
                    + "ORDER BY SUM(count) DESC "
            , nativeQuery = true
    )
    List<PerfumeTagCount> findCountSumOrderBySumWithJPQL();

    Optional<PerfumeTag> findByPerfumeAndTag(Perfume perfume, Tag tag);

}
