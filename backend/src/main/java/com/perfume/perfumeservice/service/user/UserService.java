package com.perfume.perfumeservice.service.user;

import com.perfume.perfumeservice.dto.jwt.TokenDto;
import com.perfume.perfumeservice.dto.jwt.TokenRequestDto;
import com.perfume.perfumeservice.dto.user.*;

import java.util.List;

public interface UserService {

    boolean checkEmail(String email);
    boolean checkNickName(String nickname);
    TokenDto doLogin(LoginRequestDto requestDto);
    UserResponseDto doSignUp(SignUpRequestDto requestDto);
    UserResponseDto getUserInfo(Long id);
    UserResponseDto getUserInfo(String email);
    void updateUser(String email, UpdateUserRequestDto requestDto);
    void deleteUser(String email);
    void changePW(String email, String newPW);
    UserResponseDto getMyInfo();
    TokenDto refresh(TokenRequestDto requestDto);
    void logout();

    // 엠벼랑 성별과 나이로 유저 찾기
    List<Long> getUserByMbtiAndGenderAndAge(List<String> mbtis, List<String> genders, List<Integer> ages);

}
