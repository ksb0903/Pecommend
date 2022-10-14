package com.perfume.perfumeservice.domain.regist;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistRepository extends JpaRepository<Regist, Long> {
    List<Regist> findAllByOrderByIdDesc();
}
