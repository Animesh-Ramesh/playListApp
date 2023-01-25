package com.playlist.playlist.serviceImpl;

import com.playlist.playlist.model.Song;
import com.playlist.playlist.repository.SongRepository;
import com.playlist.playlist.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongServiceImpl implements SongService {
    @Autowired
    private SongRepository songRepository;

    public SongServiceImpl(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    public List<Song> findAll(Pageable pageable) {
        return songRepository.findAll(pageable).getContent();
    }

    @Override
    public List<Song> findByTitle(String title) {
        return songRepository.findByTitle(title);
    }

    @Override
    public Song rate(String id, int rating) {
        Song song = songRepository.findById(id).orElse(null);
        if (song != null) {
            song.setStarRating(rating);
            songRepository.save(song);
        }
        return song;
    }

    @Override
    public long getSongsCount() {
        return songRepository.count();
    }
}
