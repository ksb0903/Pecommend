package com.perfume.perfumeservice.dto.perfume;

import com.perfume.perfumeservice.domain.perfume.PerfumeTag;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "PerfumeTagResponseDto", description = "향수태그 정보 응답 Dto")
public class PerfumeTagResponseDto {
    private long perfumeTagId;
    private long perfumeId;
    private long tagId;
    private String tagName;

    public static PerfumeTagResponseDto from(PerfumeTag perfumeTag){
        if(perfumeTag == null) return null;

        return PerfumeTagResponseDto.builder()
                .perfumeTagId(perfumeTag.getId())
                .perfumeId(perfumeTag.getPerfume().getId())
                .tagId(perfumeTag.getTag().getId())
                .tagName(perfumeTag.getTag().getTagName())
                .build();
    }

}
