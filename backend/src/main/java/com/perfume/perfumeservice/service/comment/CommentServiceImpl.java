package com.perfume.perfumeservice.service.comment;

import com.perfume.perfumeservice.domain.comment.*;
import com.perfume.perfumeservice.domain.community.Community;
import com.perfume.perfumeservice.domain.community.CommunityRepository;
import com.perfume.perfumeservice.domain.user.UserEntity;
import com.perfume.perfumeservice.domain.user.UserRepository;
import com.perfume.perfumeservice.dto.comment.CommentsRequestDto;
import com.perfume.perfumeservice.dto.comment.CommentsResponseDto;
import com.perfume.perfumeservice.dto.posts.PostsResponseDto;
import com.perfume.perfumeservice.exception.comment.CommentNotFoundException;
import com.perfume.perfumeservice.exception.community.PostNotFoundException;
import com.perfume.perfumeservice.exception.user.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Slf4j
@Service
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final CommentDisLikeRepository commentDisLikeRepository;

    @Override
    public List<CommentsResponseDto> getList(Long id) {
        List<CommentsResponseDto> result = new ArrayList<>();
        Map<Long, CommentsResponseDto> map = new HashMap<>();
        commentRepository.findCommentByCommunityId(id).stream()
                .forEach(c -> {
                    CommentsResponseDto dto = CommentsResponseDto.from(c);
                    map.put(dto.getId(), dto);
                    if(c.getParent() != null) {

                        List<CommentsResponseDto> childList = map.get(c.getParent().getId()).getChildren();
                        if(childList == null){
                            childList = new ArrayList<>();
                            childList.add(dto);
                        }else{
                            childList.add(dto);
                        }
                        map.get(c.getParent().getId()).addChildren(childList);
                    }
                    else result.add(dto);
                });
        return result;
    }

    @Override
    public CommentsResponseDto writeComment(CommentsRequestDto dto) {
        UserEntity user = userRepository.findById(dto.getWriter()).orElseThrow(UserNotFoundException::new);
        Community community = communityRepository.findById(dto.getCommunityId()).orElseThrow(PostNotFoundException::new);
        Comment parent = dto.getParent() == null ? null :
                commentRepository.findById(dto.getParent()).orElseThrow(CommentNotFoundException::new);
        return CommentsResponseDto.from(commentRepository.save(dto.toEntity(community, user, parent)));
    }

    @Override
    public CommentsResponseDto updateComment(Long id, CommentsRequestDto dto) {
        UserEntity user = userRepository.findById(dto.getWriter()).orElseThrow(UserNotFoundException::new);
        Community community = communityRepository.findById(dto.getCommunityId()).orElseThrow(PostNotFoundException::new);
        Comment parent = dto.getParent() == null ? null :
                commentRepository.findById(dto.getParent()).orElseThrow(CommentNotFoundException::new);
        Comment comment = dto.toEntity(community, user, parent);

        Comment target = commentRepository.findById(id).orElseThrow(CommentNotFoundException::new);
        target.patch(comment);
        Comment updated = commentRepository.save(target);
        return CommentsResponseDto.from(updated);
    }

    @Override
    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(CommentNotFoundException::new);
        if(comment.getChildren().size() != 0){
            comment.changeDeleted();
        }else{
            commentRepository.delete(getDeletableAncestorComment(comment));
        }
    }

    private Comment getDeletableAncestorComment(Comment comment) {
        Comment parent = comment.getParent();
        if(parent != null && parent.isDeleted() && parent.getChildren().size() == 1)
            return getDeletableAncestorComment(parent);
        return comment;
    }

    @Override
    public String addLike(Long userId, Long commentId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);
        Optional<CommentDisLike> dislike = commentDisLikeRepository.findByUserAndComment(user, comment);
        if(dislike.isPresent()) return "X";

        Optional<CommentLike> like = commentLikeRepository.findByUserAndComment(user, comment);
        if(like.isPresent()) {
            commentLikeRepository.delete(like.get());
            return "CANCEL";
        }
        else{
            commentLikeRepository.save(CommentLike.builder()
                            .comment(comment)
                            .user(user)
                            .build());
            return "ADD";
        }
    }

    @Override
    public String addDisLike(Long userId, Long commentId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);
        Optional<CommentLike> like = commentLikeRepository.findByUserAndComment(user, comment);
        if(like.isPresent()) return "X";

        Optional<CommentDisLike> dislike = commentDisLikeRepository.findByUserAndComment(user, comment);
        if(dislike.isPresent()){
            commentDisLikeRepository.delete(dislike.get());
            return "CANCEL";
        }else{
            commentDisLikeRepository.save(CommentDisLike.builder()
                            .comment(comment)
                            .user(user)
                            .build());
            return "ADD";
        }
    }

    @Override
    public List<CommentsResponseDto> getProfileComments(Long id) {
        UserEntity user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        return commentRepository.findByWriterOrderByIdDesc(user).stream()
                .map(comment -> CommentsResponseDto.from(comment))
                .collect(Collectors.toList());
    }
}
