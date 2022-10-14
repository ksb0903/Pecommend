package com.perfume.perfumeservice.service.community;

import com.perfume.perfumeservice.dto.posts.PostsRequestDto;
import com.perfume.perfumeservice.dto.posts.PostsResponseDto;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface CommunityService {
    String writePostAndImage(PostsRequestDto dto, MultipartFile[] file);
    PostsResponseDto writePost(PostsRequestDto dto);
    PostsResponseDto updatePost(Long id, PostsRequestDto dto);
    List<PostsResponseDto> getList(int category);
    PostsResponseDto getPost(Long id);
    public String addLike(Long userId, Long communityId);
    List<PostsResponseDto> getListByUser(Long userId);
    void deletePost(Long id);

    List<PostsResponseDto> getListAll();

    List<PostsResponseDto> searchPostTitle(String title);

    List<PostsResponseDto> searchPostWriter(String writer);

    List<PostsResponseDto> getListByLike(int category);
    List<PostsResponseDto> getListByLike();

    List<PostsResponseDto> getBestList();
    List<PostsResponseDto> getBestListByCategory(int category);
    Map<String, Object> getMain();
    // add
    String fileUpload(Map<String, Object>map, MultipartHttpServletRequest request);
    String getImg(String img);
}
