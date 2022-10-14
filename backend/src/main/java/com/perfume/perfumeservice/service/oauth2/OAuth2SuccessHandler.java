package com.perfume.perfumeservice.service.oauth2;

import com.perfume.perfumeservice.domain.user.Role;
import com.perfume.perfumeservice.domain.user.UserEntity;
import com.perfume.perfumeservice.domain.user.UserRepository;
import com.perfume.perfumeservice.dto.jwt.TokenDto;
import com.perfume.perfumeservice.jwt.TokenProvider;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final PasswordMaker passwordMaker;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        if(attributes.get("response")!=null){
            attributes = (Map<String, Object>) attributes.get("response");
        }
        System.out.println(attributes);
        String email = (String) attributes.get("email");

        // db 확인
        // 새로운 유저 -> 회원가입
        UserEntity entity = userRepository.findByEmail(email)
                .orElse(UserEntity.builder()
                        .email(email)
                        .nickname(passwordMaker.make())
                        .role(Role.ROLE_USER)
                        .password(passwordMaker.make())
                        .build());

        if(entity.getBirthday() != null){
            entity.setAge();
        }

        // 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(entity.getEmail(), entity.getRole().toString());
        entity.saveToken(tokenDto.getRefreshToken());
        userRepository.save(entity);

        // 리다이렉트
        String target = "https://pecommend.com/oauth?Auth=" + tokenDto.getAccessToken() + "&Refresh=" + tokenDto.getRefreshToken();
        RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
        redirectStrategy.sendRedirect(request, response, target);
    }
}
