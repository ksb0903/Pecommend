package com.perfume.perfumeservice.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.perfume.perfumeservice.domain.user.Role;
import com.perfume.perfumeservice.domain.user.UserEntity;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "UserResponseRequestDto", description = "회원 정보 응답 Dto")
public class UserResponseDto {
    private long user_id;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String nickname;
    private String birthday;
    private String gender;
    private String mbti;
    private String introduction;
    private Role role;

    public static UserResponseDto from(UserEntity entity){
        if(entity == null) return null;

        return UserResponseDto.builder()
                .user_id(entity.getId())
                .email(entity.getEmail())
                .birthday(entity.getBirthday())
                .gender(entity.getGender())
                .mbti(entity.getMbti())
                .nickname(entity.getNickname())
                .introduction(entity.getIntroduction())
                .role(entity.getRole())
                        .build();
    }
}
