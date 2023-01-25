package com.playlist.playlist.model;
import jakarta.persistence.*;


@Entity
@Table(name = "songs")
public class Song {
    @Id
    private String id;
    private String title;
    private double danceability;
    private double energy;
    private long mode;
    private double acousticness;
    private double tempo;
    private long duration_ms;
    private long  num_sections;
    private long num_segments;
    private int star_rating;

    // Getters and Setters
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public double getDanceability() {
        return danceability;
    }
    public void setDanceability(double danceability) {
        this.danceability = danceability;
    }
    public double getEnergy() {
        return energy;
    }
    public void setEnergy(double energy) {
        this.energy = energy;
    }
    public long getMode() {
        return mode;
    }
    public void setMode(int mode) {
        this.mode = mode;
    }
    public double getAcousticness() {
        return acousticness;
    }
    public void setAcousticness(double acousticness) {
        this.acousticness = acousticness;
    }
    public double getTempo() {
        return tempo;
    }
    public void setTempo(double tempo) {
        this.tempo = tempo;
    }
    public long getDuration_ms() {
        return duration_ms;
    }
    public void setDuration_ms(int duration_ms) {
        this.duration_ms = duration_ms;
    }
    public long getNum_sections() {
        return num_sections;
    }
    public void setNum_sections(int num_sections) {
        this.num_sections = num_sections;
    }
    public long getNum_segments() {
        return num_segments;
    }
    public void setNum_segments(int num_segments) {
        this.num_segments = num_segments;
    }
    public int getStarRating() {
        return star_rating;
    }
    public void setStarRating(int star_rating) {
        this.star_rating = star_rating;
    }
}