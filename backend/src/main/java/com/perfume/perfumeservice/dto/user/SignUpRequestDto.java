package com.perfume.perfumeservice.dto.user;

import com.perfume.perfumeservice.domain.user.UserEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@ApiModel(value = "SignUpRequestDto", description = "회원가입 요청 Dto")
public class SignUpRequestDto {
    @NotBlank
    @ApiModelProperty(value = "이메일")
    private String email;
    @NotBlank
    @ApiModelProperty(value = "비밀번호")
    private String password;
    @NotBlank
    @ApiModelProperty(value = "닉네임")
    private String nickname;
    @ApiModelProperty(value = "생일")
    private String birthday;
    @ApiModelProperty(value = "성별")
    private String gender;
    @ApiModelProperty(value = "MBTI")
    private String mbti;
    @ApiModelProperty(value = "자기 소개")
    private String introduction;


    public UserEntity toEntity(){
        return UserEntity.builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .birthday(birthday)
                .gender(gender)
                .mbti(mbti)
                .introduction(introduction)
                .build();
    }
}
