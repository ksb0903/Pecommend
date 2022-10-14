package com.perfume.perfumeservice.config;


import com.perfume.perfumeservice.service.community.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${part4.upload.path}")
    private String uploadPath;

    @Autowired
    CommunityService communityService;

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowCredentials(true)
                .allowedMethods("*")
                .maxAge(3600);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        WebMvcConfigurer.super.addResourceHandlers(registry);
        //외부에 있는 폴더를 내 프로젝트에서 찾을 수 있도록 세팅
        registry.addResourceHandler("/image/**")
                .addResourceLocations("file:///" + uploadPath)
                .setCachePeriod(60*10*6) // 서버 부하를 줄이기 위해 해당 요청을 캐시에 저장해놓는 시간 설정
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }


}