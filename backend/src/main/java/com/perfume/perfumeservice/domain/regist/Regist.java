package com.perfume.perfumeservice.domain.regist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
public class Regist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "regist_id")
    private Long id;
    @Column(name = "user_name")
    private String userName;
    private String name;
    private String company;
    @Column(name = "describes")
    private String describe;
    private int status;  // 0->검토중 1->추가 완료 2->반려됨
    private String img;

    public void update(int status){
        this.status = status;
    }
}
