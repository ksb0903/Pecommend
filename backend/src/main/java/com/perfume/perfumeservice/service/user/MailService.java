package com.perfume.perfumeservice.service.user;

public interface MailService {
    String sendSimpleMessage(String to, String cmd)throws Exception;
}

