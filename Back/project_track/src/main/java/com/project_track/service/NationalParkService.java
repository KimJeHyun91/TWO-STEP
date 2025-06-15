package com.project_track.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project_track.domain.NationalParkDomain;
import com.project_track.repository.NationalParkRepository;

@Service
public class NationalParkService {
	@Autowired
	NationalParkRepository national_park_repository;
	
	public List<NationalParkDomain> get_all_list() {
		return national_park_repository.get_all_list();
	}

	public Optional<NationalParkDomain> get_one_object(Integer national_park_no) {
		return national_park_repository.findById(national_park_no);
	}

	public NationalParkDomain add(NationalParkDomain national_park_domain) {
		return national_park_repository.save(national_park_domain);
	}

	public NationalParkDomain modify(NationalParkDomain national_park_domain) {
		return national_park_repository.save(national_park_domain);
	}

	public Optional<NationalParkDomain> delete(Integer national_park_no) {
		national_park_repository.deleteById(national_park_no);
		return national_park_repository.findById(national_park_no);
	}

}
