package com.project_track.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project_track.domain.MemberDomain;
import com.project_track.repository.MemberRepository;

@Service
public class MemberService {
	@Autowired
	MemberRepository member_repository;
	
	public MemberDomain enroll(MemberDomain member_domain) {
		return member_repository.save(member_domain);
	}

	public Optional<MemberDomain> id_check(String member_id) {
		return member_repository.findById(member_id);
	}

	public MemberDomain modify(MemberDomain member_domain) {
		return member_repository.save(member_domain);
	}

	public Optional<MemberDomain> withdraw(String member_id) {
		member_repository.deleteById(member_id);
		return member_repository.findById(member_id);
	}




}
