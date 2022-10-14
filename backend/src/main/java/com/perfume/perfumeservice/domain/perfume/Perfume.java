package com.perfume.perfumeservice.domain.perfume;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "perfume")
public class Perfume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "perfume_id")
    private long id;

    @Column(name = "perfume_name_ko")
    private String koName;

    @Column(name = "perfume_name_en")
    private String enName;

    // note 노트 정보
    @OneToMany(mappedBy = "perfume", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Note> notes = new ArrayList<>();

    // perfume_tag - 해시태그
    @OneToMany(mappedBy = "perfume", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PerfumeTag> perfumeTags = new ArrayList<>();

    // perfume_like
    @OneToMany(mappedBy = "perfume", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PerfumeLike> likes = new ArrayList<>();

    // perfume_dislike
    @OneToMany(mappedBy = "perfume", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PerfumeDislike> dislikes = new ArrayList<>();

}
