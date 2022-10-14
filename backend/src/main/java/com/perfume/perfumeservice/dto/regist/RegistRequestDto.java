package com.perfume.perfumeservice.dto.regist;

import com.perfume.perfumeservice.domain.regist.Regist;
import lombok.Data;

@Data
public class RegistRequestDto {
    private String user;
    private String name;
    private String company;
    private String describe;
    private int status;
    private String img;

    public Regist toEntity(){
        return Regist.builder()
                .userName(user)
                .name(name)
                .company(company)
                .describe(describe)
                .status(status)
                .img(img)
                .build();
    }

    public void setImg(String img){
        this.img = img;
    }
}
