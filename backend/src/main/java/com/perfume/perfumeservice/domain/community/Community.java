package com.perfume.perfumeservice.domain.community;
import com.perfume.perfumeservice.domain.baseTime.BaseTime;
import com.perfume.perfumeservice.domain.comment.Comment;
import com.perfume.perfumeservice.domain.user.UserEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
public class Community extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_id")
    private Long id;
    private int category;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity writer;
    private String title;
    private String content;
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Comment> comments = new ArrayList<>();
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<CommunityLike> likes = new LinkedHashSet<>();

    public void patch(Community community){
        if(community.title != null)
            this.title = community.title;
        if(community.content != null)
            this.content = community.content;
        if(community.category != 0)
            this.category = community.category;
    }
}
