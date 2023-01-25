package com.playlist.playlist.service;

import com.playlist.playlist.model.Song;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SongService {
    List<Song> findAll(Pageable pageable);
    List<Song> findByTitle(String title);
    Song rate(String id, int rating);
    long getSongsCount();
}