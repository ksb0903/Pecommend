package com.perfume.perfumeservice.dto.perfume;

import com.perfume.perfumeservice.domain.perfume.*;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "PerfumeResponseDto", description = "향수 정보 응답 Dto")
public class PerfumeResponseDto {
    private long perfumeId;
    private String koName;
    private String enName;


    public static PerfumeResponseDto from(Perfume perfume){
        if(perfume == null) return null;

        return PerfumeResponseDto.builder()
                .perfumeId(perfume.getId())
                .koName(perfume.getKoName())
                .enName(perfume.getEnName())
                .build();
    }

}
