package com.playlist.playlist.repository;

import com.playlist.playlist.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, String> {
    public List<Song> findByTitle(String title);
}
