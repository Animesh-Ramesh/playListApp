package com.playlist.playlist.controller;

import com.playlist.playlist.model.Song;
import com.playlist.playlist.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/api/songs")
public class SongController {
    @Autowired
    private SongService songService;

    @GetMapping
    public ResponseEntity<List<Song>> getAllSongs(@RequestParam(required = false) boolean all, Pageable pageable) {
        if (all) {
            pageable = PageRequest.of(pageable.getPageNumber(), Integer.MAX_VALUE, pageable.getSort());
        }
        List<Song> songs =songService.findAll(pageable);
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }


    @GetMapping("/title")
    public ResponseEntity<List<Song>> getSongByTitle(@RequestParam("name") String title) {
        List<Song> song =songService.findByTitle(title);
        if (song == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(song, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getSongsCount() {
        long count =songService.getSongsCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @PutMapping("id/rate")
    public ResponseEntity<Song> rateSong( @RequestBody int rating, @RequestParam("id") String id) {
        Song song =songService.rate(id, rating);
        if (song == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(song, HttpStatus.OK);
    }




}