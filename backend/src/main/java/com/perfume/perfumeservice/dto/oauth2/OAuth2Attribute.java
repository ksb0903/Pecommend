package com.perfume.perfumeservice.dto.oauth2;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Builder
@AllArgsConstructor
public class OAuth2Attribute {
    private Map<String, Object> attributes;
    private String attributeKey;
    private String email;

    public static OAuth2Attribute of(String provider, String attributeKey, Map<String, Object> attributes){
        switch (provider){
            case "google":
                return ofGoogle(attributeKey, attributes);
            case "naver":
                return ofNaver(attributeKey, attributes);
            default:
                throw new RuntimeException();
        }
    }

    private static OAuth2Attribute ofGoogle(String attributeKey, Map<String, Object> attributes){
        return OAuth2Attribute.builder()
                .email((String)attributes.get("email"))
                .attributes(attributes)
                .attributeKey(attributeKey)
                .build();
    }

    private static OAuth2Attribute ofNaver(String attributeKey, Map<String, Object> attributes){
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuth2Attribute.builder()
                .email((String)response.get("email"))
                .attributes(attributes)
                .attributeKey(attributeKey)
                .build();
    }
}
