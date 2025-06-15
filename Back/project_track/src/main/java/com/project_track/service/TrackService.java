package com.project_track.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project_track.domain.TrackDomain;
import com.project_track.id.TrackId;
import com.project_track.repository.TrackRepository;

@Service
public class TrackService {
	@Autowired
	TrackRepository track_repository;

	public List<TrackDomain> get_list_national_park(Integer national_park_no) {
		return track_repository.get_list_national_park(national_park_no);
	}

	public Optional<TrackDomain> get_one_object(TrackId track_id) {
		return track_repository.findById(track_id);
	}

	public TrackDomain add(TrackDomain track_domain) {
		return track_repository.save(track_domain);
	}

	public TrackDomain modify(TrackDomain track_domain) {
		return track_repository.save(track_domain);
	}

	public Optional<TrackDomain> delete(TrackId track_id) {
		track_repository.deleteById(track_id);
		return track_repository.findById(track_id);
	}

	public List<TrackDomain> get_all_list() {
		return track_repository.get_all_list();
	}
	

}
