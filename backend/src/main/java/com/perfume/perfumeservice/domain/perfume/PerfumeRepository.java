package com.perfume.perfumeservice.domain.perfume;

import com.perfume.perfumeservice.domain.user.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PerfumeRepository extends JpaRepository<Perfume, Long> {

    public List<Perfume> findAllByOrderByKoName();

    public Page<Perfume> findAll(Pageable pageable);

    public List<Perfume> findByKoNameLike(String keyword);

    public List<Perfume> findByEnNameLike(String keyword);

    public List<Perfume> findByKoNameLikeOrEnNameLike(String koName, String enName);

    @Query(nativeQuery = true, value =
        "select * from perfume p where p.perfume_id in(select perfume_id from perfume_tag where tag_id in(:tags)) order by p.perfume_id;"
    )
    public List<Perfume> findByTags(List<Long> tags);

    @Query(nativeQuery = true, value =
        "select * from perfume p order by (select count(*) from perfume_like pl where p.perfume_id=pl.perfume_id) desc"
    )
    public List<Perfume> findAllOrderByLikes();
    //public List<Perfume> findByKoNameLikeOrEnNameLike(String koName, String enName);

    public Page<Perfume> findByKoNameLikeOrEnNameLikeIgnoreCase(Pageable pageable, String koName, String enName);


    @Query(nativeQuery = true, value =
            "select * from perfume where perfume_id in(:perfumes)"
    )
    public List<Perfume> findByIds(List<Long> perfumes);

    @Query(nativeQuery = true, value =
            "SELECT pl.perfume_id, p.perfume_name_ko, p.perfume_name_en " +
                    "FROM perfume_like pl, perfume p " +
                    "WHERE pl.perfume_id = p.perfume_id AND pl.user_id IN (:users) " +
                    "GROUP BY pl.perfume_id " +
                    "ORDER BY COUNT(pl.perfume_id) DESC, p.perfume_name_ko ASC;"
    )
    public List<Perfume> findByUsers(List<Long> users);

    @Query(nativeQuery = true, value =
            "SELECT pl.perfume_id, p.perfume_name_ko, p.perfume_name_en " +
                    "FROM perfume_like pl, perfume p " +
                    "WHERE pl.perfume_id = p.perfume_id AND pl.user_id IN (:users) " +
                    "GROUP BY pl.perfume_id " +
                    "ORDER BY COUNT(pl.perfume_id) DESC, p.perfume_name_ko ASC",
            countQuery = "SELECT COUNT(distinct pl.perfume_id) FROM perfume_like pl WHERE pl.user_id IN (:users)"
    )
    public Page<Perfume> findByUsersPage(Pageable pageable, List<Long> users);

}
