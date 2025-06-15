package com.project_track.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project_track.domain.ReviewDomain;
import com.project_track.id.TrackId;
import com.project_track.repository.ReviewRepository;

@Service
public class ReviewService {
	@Autowired
	ReviewRepository review_repository;

	public List<ReviewDomain> get_all_list() {
		return review_repository.get_all_list();
	}

	public List<ReviewDomain> get_list_track(TrackId track_id) {
		return review_repository.get_list_track(track_id.getNational_park_no(), track_id.getTrack_no());
	}

	public List<ReviewDomain> get_list_member(String member_id) {
		return review_repository.get_list_member(member_id);
	}

	public List<ReviewDomain> get_list_national_park(Integer national_park_no) {
		return review_repository.get_list_national_park(national_park_no);
	}

	public Optional<ReviewDomain> get_one_object(Integer review_no) {
		return review_repository.findById(review_no);
	}

	public ReviewDomain add(ReviewDomain review_domain) {
		return review_repository.save(review_domain);
	}

	public ReviewDomain modify(ReviewDomain review_domain) {
		return review_repository.save(review_domain);
	}

	public Optional<ReviewDomain> delete(Integer review_no) {
		review_repository.deleteById(review_no);
		return review_repository.findById(review_no);
	}

}
