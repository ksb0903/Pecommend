package com.perfume.perfumeservice.service.perfume;

import com.perfume.perfumeservice.domain.perfume.Note;
import com.perfume.perfumeservice.domain.perfume.Perfume;
import com.perfume.perfumeservice.dto.perfume.NoteResponseDto;

import java.util.List;

public interface NoteService {
    List<NoteResponseDto> getNotes(Long id);
}
