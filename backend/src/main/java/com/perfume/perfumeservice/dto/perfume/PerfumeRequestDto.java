package com.perfume.perfumeservice.dto.perfume;

import com.perfume.perfumeservice.domain.perfume.Perfume;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Builder
@Data
public class PerfumeRequestDto {

    private String koName;
    private String enName;

    public Perfume toEntity(Perfume perfume){
        return Perfume.builder()
                .koName(koName)
                .enName(enName)
                .build();

    }
    // 삽입


}
