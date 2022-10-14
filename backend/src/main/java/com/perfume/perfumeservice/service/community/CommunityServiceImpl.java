package com.perfume.perfumeservice.service.community;

import com.perfume.perfumeservice.domain.community.*;
import com.perfume.perfumeservice.domain.community.Community;
import com.perfume.perfumeservice.domain.community.CommunityRepository;
import com.perfume.perfumeservice.domain.user.UserEntity;
import com.perfume.perfumeservice.domain.user.UserRepository;
import com.perfume.perfumeservice.dto.posts.PostsRequestDto;
import com.perfume.perfumeservice.dto.posts.PostsResponseDto;
import com.perfume.perfumeservice.exception.community.NotImgException;
import com.perfume.perfumeservice.exception.community.PostNotFoundException;
import com.perfume.perfumeservice.exception.user.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.transaction.Transactional;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;


@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class CommunityServiceImpl implements CommunityService {
    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final CommunityLikeRepository communityLikeRepository;

    @Value("${part4.upload.path}")
    private String uploadPath;

    @Override
    public String writePostAndImage(PostsRequestDto dto, MultipartFile[] uploadFile) {

        UserEntity user = userRepository.findById(dto.getWriter()).orElseThrow(UserNotFoundException::new);
        if(uploadFile == null || uploadFile.length == 0){
            communityRepository.save(dto.toEntity(user));
            return "SUCCESS";
        }
        return "";
    }

    @Override
    public String addLike(Long userId, Long communityId){
        UserEntity user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Community community = communityRepository.findById(communityId).orElseThrow(PostNotFoundException::new);

        Optional<CommunityLike> like = communityLikeRepository.findByUserAndCommunity(user, community);

        if(like.isPresent()){
            communityLikeRepository.delete(like.get());
            return "CANCEL";
        }else{
            communityLikeRepository.save(CommunityLike.builder()
                    .user(user).community(community).build());
            return "ADD";
        }
    }

    @Override
    public List<PostsResponseDto> getListByUser(Long userId){
        UserEntity user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        List<Community> c_list = communityRepository.findByWriterOrderByIdDesc(user);
        List<PostsResponseDto> p_list = new LinkedList<>();

        for(Community c: c_list){
            p_list.add(PostsResponseDto.from(c));
        }

        return p_list;
    }

    @Override
    public PostsResponseDto writePost(PostsRequestDto dto) {
        UserEntity user = userRepository.findById(dto.getWriter()).orElseThrow(UserNotFoundException::new);

        Community community = dto.toEntity(user);
        communityRepository.save(community);
        return PostsResponseDto.from(community);
    }

    @Override
    public PostsResponseDto getPost(Long id){
        Community community = communityRepository.findById(id).orElseThrow(PostNotFoundException::new);

        return PostsResponseDto.from(community);
    }


    @Override
    public String fileUpload(Map<String, Object>map, MultipartHttpServletRequest request){
        MultipartFile mf = request.getFiles("files").get(0);

        if(!mf.getContentType().startsWith("image")){
            throw new NotImgException();
        }

        String originalName = mf.getOriginalFilename();
        String uuidFileName = UUID.randomUUID().toString() + "_" + originalName;

        Map<String, String> folderMap = makeFolder();
        String folderPath = folderMap.get("folderPath");
        String dateInfo = folderMap.get("dateInfo");

        String retName = dateInfo + "_" + uuidFileName;
        String saveName = uploadPath + File.separator + folderPath + File.separator + retName;
        Path savePath = Paths.get(saveName);

        try{
            mf.transferTo(savePath);
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("이미지 업로드 중 문제가 발생했습니다.");
        }

        return retName;
    }

    @Override
    public String getImg(String img){
        String year = img.substring(0, 4);
        String month = img.substring(4, 6);
        String date = img.substring(6, 8);
        String folderPath = year +  File.separator + month + File.separator + date;

        String path = uploadPath + File.separator + folderPath + File.separator + img;

        return path;
    }

    @Override
    public PostsResponseDto updatePost(Long id, PostsRequestDto dto) {
        UserEntity user = userRepository.findById(dto.getWriter()).orElseThrow(UserNotFoundException::new);
        Community community = dto.toEntity(user);
        log.info("id : {}, Community: {}", id, community.toString());
        Community target = communityRepository.findById(id).orElseThrow(PostNotFoundException::new);
        target.patch(community);
        Community updated = communityRepository.save(target);
        return PostsResponseDto.from(updated);
    }

    @Override
    public List<PostsResponseDto> getList(int category) {

        return communityRepository.findByCategoryOrderByIdDesc(category).stream()
                .map(community -> PostsResponseDto.from(community))
                .collect(Collectors.toList());
    }

    @Override
    public void deletePost(Long id) {
        Community community = communityRepository.findById(id).orElseThrow(PostNotFoundException::new);
        communityRepository.delete(community);
        return;
    }

    @Override
    public List<PostsResponseDto> getListAll() {
        return communityRepository.findAllByOrderByIdDesc().stream()
                .map(community -> PostsResponseDto.from(community))
                .collect(Collectors.toList());
    }

    @Override
    public List<PostsResponseDto> searchPostTitle(String title) {
        return communityRepository.findByTitleLike("%"+title+"%").stream()
                .map(community -> PostsResponseDto.from(community))
                .collect(Collectors.toList());
    }

    @Override
    public List<PostsResponseDto> searchPostWriter(String writer) {
        List<UserEntity>user = userRepository.findByNicknameLike("%"+writer+"%");
        List<PostsResponseDto> result = new ArrayList<>();
        for (UserEntity item: user) {
            result.addAll(
                    communityRepository.findByWriterOrderByIdDesc(item).stream()
                            .map(community -> PostsResponseDto.from(community))
                            .collect(Collectors.toList())
            );}
        return result;
    }

    private Map<String, String> makeFolder() {
        Map<String, String> map = new HashMap<>();
        String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        //LocalDate을 문자열로 포맷
        String folderPath = str.replace("/", File.separator);
        String dateInfo = str.replace("/", "");

        //부모 디렉토리를 파라미터로 인스턴스 생성
        File uploadPathFolder = new File(uploadPath, folderPath);

        if(uploadPathFolder.exists() == false){
            uploadPathFolder.mkdirs();
        }

        map.put("folderPath", folderPath);
        map.put("dateInfo",dateInfo);

        return map;
    }

    @Override
    public List<PostsResponseDto> getListByLike(int category) {
        return communityRepository.findByCategoryOrderByLikes(category).stream()
                .map(community -> PostsResponseDto.from(community))
                .collect(Collectors.toList());
    }

    @Override
    public List<PostsResponseDto> getListByLike() {
        return communityRepository.findAllOrderByLikes().stream()
                .map(community -> PostsResponseDto.from(community))
                .collect(Collectors.toList());
    }

    @Override
    public List<PostsResponseDto> getBestListByCategory(int category) {
        return communityRepository.findAllBestByCategory(category).stream()
                .map(community -> PostsResponseDto.from(community))
                .collect(Collectors.toList());
    }

    @Override
    public List<PostsResponseDto> getBestList() {
        return communityRepository.findAllBest().stream()
                .map(community -> PostsResponseDto.from(community))
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getMain(){
        Map<String, Object> map = new HashMap<>();

        List<PostsResponseDto> all = communityRepository.findAllByOrderByIdDesc().stream()
                .limit(6)
                .map(community -> PostsResponseDto.from(community))
                .collect(Collectors.toList());

        List<PostsResponseDto> free = communityRepository.findByCategoryOrderByIdDesc(1).stream()
                .limit(6)
                .map(community -> PostsResponseDto.from(community))
                .collect(Collectors.toList());

        List<PostsResponseDto> perfume = communityRepository.findByCategoryOrderByIdDesc(2).stream()
                .limit(6)
                .map(community -> PostsResponseDto.from(community))
                .collect(Collectors.toList());

        List<PostsResponseDto> hot = communityRepository.findAllBest().stream()
                .limit(3)
                .map(community -> PostsResponseDto.from(community))
                .collect(Collectors.toList());

        List<PostsResponseDto> notice = communityRepository.findByCategoryOrderByIdDesc(4).stream()
                .limit(6)
                .map(community -> PostsResponseDto.from(community))
                .collect(Collectors.toList());

        map.put("0", all);
        map.put("1", free);
        map.put("2", perfume);
        map.put("3", hot);
        map.put("4", notice);

        return map;
    }
}
