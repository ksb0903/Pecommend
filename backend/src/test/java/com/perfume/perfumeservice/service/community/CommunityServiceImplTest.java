//package com.perfume.perfumeservice.service.community;
//
//import com.perfume.perfumeservice.domain.community.Community;
//import com.perfume.perfumeservice.domain.community.CommunityRepository;
//import com.perfume.perfumeservice.dto.posts.PostsResponseDto;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class CommunityServiceImplTest {
//
//    @Autowired
//    CommunityRepository communityRepository;
//
//    @Test
//    @DisplayName("역정렬 테스트")
//    void getListAll() {
//        Long result = communityRepository.findAllByOrderByIdDesc().get(0).getId();
//        Long expected = 6L;
//
//        assertEquals(expected, result);
//    }
//}