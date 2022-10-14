package com.perfume.perfumeservice.dto.perfume;

import com.perfume.perfumeservice.domain.perfume.PerfumeLike;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "PerfumeLikeResponseDto", description = "향수 좋아요 정보 응답 Dto")
public class PerfumeLikeResponseDto {
    private long id;
    // 일단 기본만 적어놓음
    private long perfumeId;
    private long userId;

    public static PerfumeLikeResponseDto from(PerfumeLike perfumeLike){
        if(perfumeLike == null) return null;

        return PerfumeLikeResponseDto.builder()
                .id(perfumeLike.getId())
                .perfumeId(perfumeLike.getPerfume().getId())
                .userId(perfumeLike.getUser().getId())
                .build();
    }
}
