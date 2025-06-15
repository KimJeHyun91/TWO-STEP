package com.project_track.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project_track.domain.NationalParkOfficeDomain;
import com.project_track.id.NationalParkOfficeId;
import com.project_track.repository.NationalParkOfficeRepository;

@Service
public class NationalParkOfficeService {
	@Autowired
	NationalParkOfficeRepository national_park_office_repository;
	
	public List<NationalParkOfficeDomain> get_all_list() {
		return national_park_office_repository.get_all_list();
	}

	public List<NationalParkOfficeDomain> get_list_national_park(Integer national_park_no) {
		return national_park_office_repository.get_list_national_park(national_park_no);
	}

	public Optional<NationalParkOfficeDomain> get_one_object(NationalParkOfficeId national_park_office_id) {
		return national_park_office_repository.findById(national_park_office_id);
	}

	public NationalParkOfficeDomain add(NationalParkOfficeDomain national_park_office_domain) {
		return national_park_office_repository.save(national_park_office_domain);
	}

	public NationalParkOfficeDomain modify(NationalParkOfficeDomain national_park_office_domain) {
		return national_park_office_repository.save(national_park_office_domain);
	}

	public Optional<NationalParkOfficeDomain> delete(NationalParkOfficeId national_park_office_id) {
		national_park_office_repository.deleteById(national_park_office_id);
		return national_park_office_repository.findById(national_park_office_id);
	}
	
}
