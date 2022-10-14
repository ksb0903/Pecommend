package com.perfume.perfumeservice.service.perfume;

import com.perfume.perfumeservice.domain.perfume.Perfume;
import com.perfume.perfumeservice.domain.perfume.PerfumeLDCount;
import com.perfume.perfumeservice.domain.perfume.PerfumeLikeCount;
import com.perfume.perfumeservice.dto.perfume.PerfumeDislikeResponseDto;
import com.perfume.perfumeservice.dto.perfume.PerfumeLikeResponseDto;
import com.perfume.perfumeservice.dto.perfume.PerfumeResponseDto;

import java.util.List;

public interface PerfumeLikeService {



    String addLike(Long perfumeId, Long userId);

    String addDislike(Long perfumeId, Long userId);

    List<PerfumeLikeResponseDto> getLikePerfume(Long id);
    List<PerfumeDislikeResponseDto> getDislikePerfume(Long id);

    List<PerfumeLikeResponseDto> getLikeUser(Long id);
    List<PerfumeDislikeResponseDto> getDislikeUser(Long id);
    List<PerfumeLikeResponseDto> getLikeAll();
    List<PerfumeDislikeResponseDto> getDislikeAll();

    List<PerfumeLDCount> getLikeLike(Long id);

    List<PerfumeLDCount> getLikeDislike(Long id);
    List<PerfumeLDCount> getDislikeLike(Long id);

    List<PerfumeLDCount> getDislikeDislike(Long id);
    List<PerfumeResponseDto> getLikeList(Long userId);
    List<PerfumeResponseDto> getDisLikeList(Long userId);

    int checkLike(Long userId, Long perfumeId);

    List<Long> getLikeByUserList(List<Long> users);
}
