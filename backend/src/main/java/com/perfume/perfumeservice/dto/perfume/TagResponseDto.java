package com.perfume.perfumeservice.dto.perfume;

import com.perfume.perfumeservice.domain.perfume.Tag;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "TagResponseDto", description = "태그 정보 응답 Dto")
public class TagResponseDto {
    private long tagId;
    private String tagName;

    public static TagResponseDto from(Tag tag){
        if(tag == null) return null;

        return TagResponseDto.builder()
                .tagId(tag.getId())
                .tagName(tag.getTagName())
                .build();
    }
}
