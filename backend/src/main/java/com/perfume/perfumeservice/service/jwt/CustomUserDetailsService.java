package com.perfume.perfumeservice.service.jwt;

import com.perfume.perfumeservice.domain.user.UserEntity;
import com.perfume.perfumeservice.domain.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component("userDetailsService")
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String email){
        return userRepository.findByEmail(email)
                .map(user -> createUser(email, user))
                .orElseThrow(()->new UsernameNotFoundException(email + " -> DB에서 찾을 수 없습니다."));
    }

    // DB에 있는 회원 정보를 UserDetails 객체로 만들어 리턴
    private User createUser(String username, UserEntity user){
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(user.getRole().toString()));

        return new User(user.getEmail(), user.getPassword(), grantedAuthorities);
    }
}
