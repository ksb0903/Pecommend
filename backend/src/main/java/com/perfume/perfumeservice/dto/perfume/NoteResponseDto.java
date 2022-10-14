package com.perfume.perfumeservice.dto.perfume;

import com.perfume.perfumeservice.domain.perfume.Note;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "NoteResponseDto", description = "노트 정보 응답 Dto")
public class NoteResponseDto {
    private long noteId;
    private String noteCl;
    private long perfumeId;
    private long materialId;
    private String materialName;

    public static NoteResponseDto from(Note note){
        if(note == null) return null;

        return NoteResponseDto.builder()
                .noteId(note.getId())
                .perfumeId(note.getPerfume().getId())
                .materialId(note.getMaterial().getId())
                .materialName(note.getMaterial().getName())
                .noteCl(note.getNote())
                .build();
    }
}
