package com.perfume.perfumeservice.dto.perfume;

import com.perfume.perfumeservice.domain.perfume.PerfumeDislike;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "PerfumeDislikeResponseDto", description = "향수 싫어요 정보 응답 Dto")
public class PerfumeDislikeResponseDto {
    private long id;
    // 일단 기본만 적어놓음
    private long perfumeId;
    private long userId;

    public static PerfumeDislikeResponseDto from(PerfumeDislike perfumeDislike){
        if(perfumeDislike == null) return null;

        return PerfumeDislikeResponseDto.builder()
                .id(perfumeDislike.getId())
                .perfumeId(perfumeDislike.getPerfume().getId())
                .userId(perfumeDislike.getUser().getId())
                .build();
    }
}
