//package com.perfume.perfumeservice.service.comment;
//
//import com.perfume.perfumeservice.domain.comment.Comment;
//import com.perfume.perfumeservice.domain.comment.CommentRepository;
//import com.perfume.perfumeservice.domain.community.Community;
//import com.perfume.perfumeservice.domain.community.CommunityRepository;
//import com.perfume.perfumeservice.domain.user.UserEntity;
//import com.perfume.perfumeservice.domain.user.UserRepository;
//import com.perfume.perfumeservice.dto.comment.CommentsRequestDto;
//import com.perfume.perfumeservice.exception.comment.CommentNotFoundException;
//import com.perfume.perfumeservice.exception.community.PostNotFoundException;
//import com.perfume.perfumeservice.exception.user.UserNotFoundException;
//import lombok.RequiredArgsConstructor;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@ExtendWith(MockitoExtension.class)
//@SpringBootTest
//class CommentServiceImplTest {
//
//    @Autowired
//    CommentRepository commentRepository;
//    @Autowired
//    UserRepository userRepository;
//    @Autowired
//    CommunityRepository communityRepository;
//
//
//    @BeforeEach
//    void setUp(){
//        UserEntity user = UserEntity.builder()
//                .email("aaa")
//                .password("123")
//                .nickname("123")
//                .birthday("123")
//                .gender("남")
//                .build();
//        userRepository.save(user);
//
//        Community community = Community.builder()
//                .category(1)
//                .content("123")
//                .writer(user)
//                .title("제목")
//                .build();
//        communityRepository.save(community);
//    }
//
//    @Test
//    @DisplayName("글 작성 테스트")
//    void writeComment() {
//        //준비
//        CommentsRequestDto dto = CommentsRequestDto.builder()
//                                    .content("content")
//                                    .communityId(1L)
//                                    .writer(1L)
//                                    .build();
//        UserEntity user = userRepository.findById(dto.getWriter()).orElseThrow(UserNotFoundException::new);
//        Community community = communityRepository.findById(dto.getCommunityId()).orElseThrow(PostNotFoundException::new);
//        commentRepository.save(dto.toEntity(community, user));
//
//        //예상
//        String expected = "content";
//
//        //결과
//        assertTrue(expected.equals(commentRepository.findById(1L).orElse(null).getContent()));
//    }
//
//    @Test
//    @DisplayName("글 수정 테스트")
//    void updateComment(){
//        //준비
//        CommentsRequestDto dto = CommentsRequestDto.builder()
//                .content("content")
//                .communityId(1L)
//                .writer(1L)
//                .build();
//        UserEntity user = userRepository.findById(dto.getWriter()).orElseThrow(UserNotFoundException::new);
//        Community community = communityRepository.findById(dto.getCommunityId()).orElseThrow(PostNotFoundException::new);
//        commentRepository.save(dto.toEntity(community, user));
//
//        Comment comment = commentRepository.findById(1L).orElseThrow(CommentNotFoundException::new);
//        Comment target = Comment.builder()
//                .community(community)
//                .writer(user)
//                .content("수정컨텐츠")
//                .build();
//        comment.patch(target);
//
//        commentRepository.save(comment);
//
//        //예상
//
//        Comment result = commentRepository.findById(1L).orElseThrow(CommentNotFoundException::new);
//        String expected = "수정컨텐츠";
//
//        //결과
//        assertTrue(result.getContent().equals(expected));
//    }
//
//    @Test
//    @DisplayName("글 삭제 테스트")
//    void deleteComment(){
//        //준비
//        CommentsRequestDto dto = CommentsRequestDto.builder()
//                .content("content")
//                .communityId(1L)
//                .writer(1L)
//                .build();
//        UserEntity user = userRepository.findById(dto.getWriter()).orElseThrow(UserNotFoundException::new);
//        Community community = communityRepository.findById(dto.getCommunityId()).orElseThrow(PostNotFoundException::new);
//        Comment comment = dto.toEntity(community, user);
//        commentRepository.save(comment);
//        System.out.println("결과 출력: " + commentRepository.findById(6L).orElse(null).getContent());
//        commentRepository.delete(comment);
//        //결과
//        NullPointerException n = Assertions.assertThrows(NullPointerException.class, () -> {
//            commentRepository.findById(6L).orElse(null).getContent();
//        });
//
//    }
//}