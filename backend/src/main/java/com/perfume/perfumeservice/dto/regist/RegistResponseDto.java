package com.perfume.perfumeservice.dto.regist;

import com.perfume.perfumeservice.domain.regist.Regist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistResponseDto {
    private Long id;
    private String user;
    private String name;
    private String company;
    private String describe;
    private int status;
    private String img;

    public static RegistResponseDto from(Regist regist){
        return RegistResponseDto.builder()
                .id(regist.getId())
                .user(regist.getUserName())
                .name(regist.getName())
                .company(regist.getCompany())
                .describe(regist.getDescribe())
                .status(regist.getStatus())
                .img(regist.getImg())
                .build();
    }
}
