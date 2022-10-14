package com.perfume.perfumeservice.controller;

import com.perfume.perfumeservice.domain.perfume.*;
import com.perfume.perfumeservice.dto.perfume.*;
import com.perfume.perfumeservice.service.perfume.NoteService;
import com.perfume.perfumeservice.service.perfume.PerfumeLikeService;
import com.perfume.perfumeservice.service.perfume.PerfumeService;
import com.perfume.perfumeservice.service.perfume.PerfumeTagService;
import com.perfume.perfumeservice.service.user.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/perfume")
public class PerfumeController {
    private final PerfumeService perfumeService;
    private final NoteService noteService;
    private final PerfumeTagService perfumeTagService;
    private final PerfumeLikeService perfumeLikeService;
    private final UserService userService;


    @GetMapping("/list.do/page/{page}")
    @ApiOperation(value = "전체 향수 목록, 향수 개수, 페이지 수 가져오기 - Page (페이징, 개수 변경 불가능, 페이징 번호 제한X)")
    public ResponseEntity<Map<String, Object>> getListPages(@PathVariable int page){ // 페이징 있는 버전, 1부터 pageCnt까지 데이터 있음
        Map<String, Object> perfumes = perfumeService.getListAllPage(page-1);
        // 해시태그
        List<PerfumeResponseDto> pDto = (List<PerfumeResponseDto>) perfumes.get("pDto"); //perfumeDto
        long totalCnt = (long) perfumes.get("totalCnt"); // totalCnt
        long pageCnt = (long) perfumes.get("pageCnt"); // pageCnt
        List<Map<String, Object>> dtoList = new LinkedList<>();
        for (PerfumeResponseDto pd: pDto){
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("pDto",pd);
            List<PerfumeTagResponseDto> td = perfumeTagService.getThreePerfumeTags(pd.getPerfumeId());
            map.put("tDto", td);
            dtoList.add(map);
        }
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("totalCnt", totalCnt);
        map.put("pageCnt", pageCnt);
        map.put("dtoList", dtoList);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }


    @GetMapping("/list.do/{keyword}/page/{page}")
    @ApiOperation(value = "향수 이름으로 검색 - page (페이징, 개수 변경 불가능, 페이징 번호 제한X)")
    public ResponseEntity<Map<String, Object>> getListPages(@PathVariable String keyword, @PathVariable int page){ // 페이징 있는 버전, 1부터 pageCnt까지 데이터 있음
        Map<String, Object> perfumes = perfumeService.getListKeywordPage(keyword, page-1);
        List<PerfumeResponseDto> pDto = (List<PerfumeResponseDto>) perfumes.get("pDto"); //perfumeDto
        long totalCnt = (long) perfumes.get("totalCnt"); // totalCnt
        long pageCnt = (long) perfumes.get("pageCnt"); // pageCnt
        // 해시태그
        List<Map<String, Object>> dtoList = new LinkedList<>();
        for (PerfumeResponseDto pd: pDto){
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("pDto",pd);
            List<PerfumeTagResponseDto> td = perfumeTagService.getThreePerfumeTags(pd.getPerfumeId());
            map.put("tDto", td);
            dtoList.add(map);
        }
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("totalCnt", totalCnt);
        map.put("pageCnt", pageCnt);
        map.put("dtoList", dtoList);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/list.do/filter")
    @ApiOperation(value = "필터로 향수 목록 가져오기 (해시태그 있음)")
    public ResponseEntity<List<Map<String, Object>>> getListFilter(@RequestBody Map<String, Object> map){
        List<Integer> ages = (List<Integer>) map.get("ages");
        List<String> genders = (List<String>) map.get("gender");
        List<String> mbtis = (List<String>) map.get("mbti");

        List<Long> users = userService.getUserByMbtiAndGenderAndAge(mbtis, genders, ages); // 조건에 맞는 유저 가져오기

        List<PerfumeResponseDto> perfumeDtoList = perfumeService.getByUserList(users);
        List<Map<String, Object>> dtoList = new LinkedList<>(); // 결과
        for(PerfumeResponseDto pd: perfumeDtoList){
            Map<String, Object> temp = new LinkedHashMap<>();
            temp.put("pDto",pd);
            List<PerfumeTagResponseDto> td = perfumeTagService.getThreePerfumeTags(pd.getPerfumeId());
            temp.put("tDto", td);
            dtoList.add(temp);
        }
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @PostMapping("/list.do/filter/page/{page}")
    @ApiOperation(value = "필터로 향수 목록 가져오기 - Page 페이징 (해시태그 있음)")
    public ResponseEntity<Map<String, Object>> getListFilterPage(@RequestBody Map<String, Object> map, @PathVariable int page){ // 페이징 있는 버전, 1부터 pageCnt까지 데이터 있음
        List<Integer> ages = (List<Integer>) map.get("ages"); // 나이
        List<String> genders = (List<String>) map.get("gender"); // 성별
        List<String> mbtis = (List<String>) map.get("mbti"); // mbti

        List<Long> users = userService.getUserByMbtiAndGenderAndAge(mbtis, genders, ages); // 조건에 맞는 유저 가져오기
        for (Long user: users){
            System.out.print(user+", ");
        }

        // 페이징 해서 결과 가져오기
        Map<String, Object> perfumes = perfumeService.getByUserListPage(users, page-1);
        List<PerfumeResponseDto> pDto = (List<PerfumeResponseDto>) perfumes.get("pDto"); //perfumeDto
        long totalCnt = (long) perfumes.get("totalCnt"); // totalCnt
        long pageCnt = (long) perfumes.get("pageCnt"); // pageCnt

        // 해시태그
        List<Map<String, Object>> dtoList = new LinkedList<>();
        for (PerfumeResponseDto pd: pDto){
            Map<String, Object> temp = new LinkedHashMap<>();
            temp.put("pDto",pd);
            List<PerfumeTagResponseDto> td = perfumeTagService.getThreePerfumeTags(pd.getPerfumeId());
            temp.put("tDto", td);
            dtoList.add(temp);
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("totalCnt", totalCnt);
        result.put("pageCnt", pageCnt);
        result.put("dtoList", dtoList);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @GetMapping("/list.do/hashtag")
    @ApiOperation(value = "해시태그로 향수 검색")
    public ResponseEntity<List<Map<String, Object>>> getListHashTag(@RequestParam List<Long> tags){
        List<PerfumeResponseDto> perfumeDtoList = perfumeService.getListHashTag(tags);
        List<Map<String, Object>> dtoList = new LinkedList<>();
        for(PerfumeResponseDto pd: perfumeDtoList){
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("pDto", pd);
            List<PerfumeTagResponseDto> td = perfumeTagService.getThreePerfumeTags(pd.getPerfumeId());
            map.put("tDto", td);
            dtoList.add(map);
        }

        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @GetMapping("/detail.do/{id}")
    @ApiOperation(value = "향수 디테일 가져오기(노트, 태그, 좋아요/싫어요 목록, 좋아요/싫어요 비율, 좋아요수/싫어요수만 추가)")
    public ResponseEntity<Map<String, Object>> getPerfume(@PathVariable Long id){
        PerfumeResponseDto pDto = PerfumeResponseDto.from(perfumeService.getPerfume(id));
        List<NoteResponseDto> nDto = noteService.getNotes(id);
        List<PerfumeTagResponseDto> ptDto = perfumeTagService.getPerfumeTags(id);
        List<PerfumeLikeResponseDto> plDto = perfumeLikeService.getLikePerfume(id);
        List<PerfumeDislikeResponseDto> pdDto = perfumeLikeService.getDislikePerfume(id);
        // 좋아요 비율
        int likeRatio = 0;
        if(plDto.size() != 0 && (double) plDto.size() + (double) pdDto.size() != 0){
            likeRatio = (int) Math.round(plDto.size() / ((double) plDto.size() + (double) pdDto.size()) * 100);
        }

        Map<String, Object> map = new HashMap<String, Object>();

        map.put("nDto",nDto);
        map.put("pDto",pDto);
        map.put("ptDto", ptDto);
        map.put("plDto", plDto);
        map.put("pdDto", pdDto);
        map.put("likeRatio", likeRatio);// 좋아요 비율
        map.put("likeCnt", plDto.size());
        map.put("dislikeCnt", pdDto.size());

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/like")
    @ApiOperation(value = "향수 좋아요 등록/좋아요 해제")
    public ResponseEntity<String> addLike(@RequestBody Map<String, Long> map){
        Long perfumeId = map.get("perfumeId");
        Long userId = map.get("userId");

        String result = perfumeLikeService.addLike(perfumeId, userId);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @PostMapping("/dislike")
    @ApiOperation(value = "향수 싫어요 등록/싫어요 해제")
    public ResponseEntity<String> addDislike(@RequestBody Map<String, Long> map){
        Long perfumeId = map.get("perfumeId");
        Long userId = map.get("userId");

        String result = perfumeLikeService.addDislike(perfumeId, userId);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @GetMapping("/ldlist.do/{id}")
    @ApiOperation(value = "좋아요싫어요좋아요싫어요 리스트(4개 모두)")
    public ResponseEntity<Map<String, Object>> getLDList(@PathVariable Long id){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        // 좋아요좋아요
        List<PerfumeLDCount> queryResult = perfumeLikeService.getLikeLike(id); // 상위 10개
        Collections.shuffle(queryResult);
        List<PerfumeLDCount> shuffleResult = queryResult.subList(0, Math.min(queryResult.size(), 4));
        List<Map<String, Object>> llResult = new LinkedList<>();
        for(PerfumeLDCount plc: shuffleResult){
            Map<String, Object> map = new LinkedHashMap<>();
            long pid = plc.getPerfumeId();
            // perfume name 구하기
            Perfume p = perfumeService.getPerfume(pid);
            String pNameKo = p.getKoName();
            String pNameEn = p.getEnName();
            map.put("pId", plc);
            map.put("pNameKo", pNameKo);
            map.put("pNameEn", pNameEn);
            llResult.add(map);
        }
        resultMap.put("likelike", llResult);

        // 싫어요좋아요
        queryResult = perfumeLikeService.getDislikeLike(id); // 상위 10개
        Collections.shuffle(queryResult);
        shuffleResult = queryResult.subList(0, Math.min(queryResult.size(), 4));
        List<Map<String, Object>> dlResult = new LinkedList<>();
        for(PerfumeLDCount plc: shuffleResult){
            Map<String, Object> map = new LinkedHashMap<>();
            long pid = plc.getPerfumeId();
            // perfume name 구하기
            Perfume p = perfumeService.getPerfume(pid);
            String pNameKo = p.getKoName();
            String pNameEn = p.getEnName();
            map.put("pId", plc);
            map.put("pNameKo", pNameKo);
            map.put("pNameEn", pNameEn);
            dlResult.add(map);
        }
        resultMap.put("dislikelike", dlResult);
        // 좋아요싫어요
        queryResult = perfumeLikeService.getLikeDislike(id); // 상위 10개
        Collections.shuffle(queryResult);
        shuffleResult = queryResult.subList(0, Math.min(queryResult.size(), 4));
        List<Map<String, Object>> ldResult = new LinkedList<>();
        for(PerfumeLDCount plc: shuffleResult){
            Map<String, Object> map = new LinkedHashMap<>();
            long pid = plc.getPerfumeId();
            // perfume name 구하기
            Perfume p = perfumeService.getPerfume(pid);
            String pNameKo = p.getKoName();
            String pNameEn = p.getEnName();
            map.put("pId", plc);
            map.put("pNameKo", pNameKo);
            map.put("pNameEn", pNameEn);
            ldResult.add(map);
        }
        resultMap.put("likedislike", ldResult);

        // 싫어요싫어요
        queryResult = perfumeLikeService.getDislikeDislike(id); // 상위 10개
        Collections.shuffle(queryResult);
        shuffleResult = queryResult.subList(0, Math.min(queryResult.size(), 4));
        List<Map<String, Object>> ddResult = new LinkedList<>();
        for(PerfumeLDCount plc: shuffleResult){
            Map<String, Object> map = new LinkedHashMap<>();
            long pid = plc.getPerfumeId();
            // perfume name 구하기
            Perfume p = perfumeService.getPerfume(pid);
            String pNameKo = p.getKoName();
            String pNameEn = p.getEnName();
            map.put("pId", plc);
            map.put("pNameKo", pNameKo);
            map.put("pNameEn", pNameEn);
            ddResult.add(map);
        }
        resultMap.put("dislikedislike", ddResult);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    // 인기 해시태그 가져오기
    @GetMapping("/hottag.do")
    @ApiOperation(value = "인기 해시태그 리스트")
    public ResponseEntity<List<Map<String, Object>>> getHotTagAll(){
        List<PerfumeTagCount> queryResult = perfumeTagService.getHotTagAll(); // 해시태그 인기순
        List<Map<String, Object>> result = new LinkedList<>();
        for(PerfumeTagCount ptc: queryResult){
            Map<String, Object> map = new LinkedHashMap<>();
            long tid = ptc.getTagId();
            String tname = perfumeTagService.getPerfumeTagName(tid);
            map.put("tId", ptc);
            map.put("tName", tname);
            result.add(map);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @GetMapping("/getimg.do/{name}")
    @ApiOperation(value = "향수 이미지 가져오기")
    public ResponseEntity<Resource> getImg(@PathVariable String name){
        String img = name.replaceAll(" ", "_");
        String path = perfumeService.getImg(img);
        Resource resource = new FileSystemResource(path);
        HttpHeaders header = new HttpHeaders();
        Path filePath = null;

        try {
            filePath = Paths.get(path);
            header.add("Content-Type", Files.probeContentType(filePath));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(resource, header, HttpStatus.OK);
    }

    @GetMapping("/likelist.do/{userId}")
    @ApiOperation(value = "선호 리스트")
    public ResponseEntity<List<PerfumeResponseDto>> getLikeList(@PathVariable Long userId){
        return new ResponseEntity<>(perfumeLikeService.getLikeList(userId), HttpStatus.OK);
    }

    @GetMapping("/dislikelist.do/{userId}")
    @ApiOperation(value = "비선호 리스트")
    public ResponseEntity<List<PerfumeResponseDto>> getDisLikeList(@PathVariable Long userId){
        return new ResponseEntity<>(perfumeLikeService.getDisLikeList(userId), HttpStatus.OK);
    }

    @GetMapping("/best.do")
    @ApiOperation(value = "인기 향수 리스트 12개")
    public ResponseEntity<List<Map<String, Object>>> getBestList(){
        List<PerfumeResponseDto> perfumeDtoList = perfumeService.getBestList();
        List<Map<String, Object>> dtoList = new LinkedList<>();
        for(PerfumeResponseDto pd: perfumeDtoList){
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("pDto", pd);
            List<PerfumeTagResponseDto> td = perfumeTagService.getThreePerfumeTags(pd.getPerfumeId());
            map.put("tDto", td);
            dtoList.add(map);
        }

        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @GetMapping("/check/like")
    @ApiOperation(value = "이 향수를 좋아/싫어 하는지 체크")
    public ResponseEntity<Integer> checkLike(@RequestParam Long userId, Long perfumeId){
        return new ResponseEntity<>(perfumeLikeService.checkLike(userId, perfumeId), HttpStatus.OK);
    }
}
