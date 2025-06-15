package com.project_track.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project_track.domain.MemberDomain;
import com.project_track.service.MemberService;

@RestController
@RequestMapping("/member")
public class MemberController {
	@Autowired
	MemberService member_service;
	@Autowired
	PasswordEncoder password_encoder;
	
	@PostMapping("/enroll")
	public int enroll(@RequestBody MemberDomain member_domain) {
		if(!StringUtils.hasText(member_domain.getMember_id())||!StringUtils.hasText(member_domain.getMember_password())||!StringUtils.hasText(member_domain.getMember_name())) {
			return 1900;
		}
		Optional<MemberDomain> result_id_check=member_service.id_check(member_domain.getMember_id());
		if(result_id_check.isPresent()) {
			return 1021;
		}
		String temp_password=password_encoder.encode(member_domain.getMember_password());
		member_domain.setMember_password(temp_password);
		MemberDomain result_member=member_service.enroll(member_domain);
		if(result_member!=null) {
			return 1000;
		}
		return 1001;
	}
	
	@GetMapping("/id_check")
	public int id_check(@RequestParam("member_id") String member_id) {
		if(!StringUtils.hasText(member_id)) {
			return 1900;
		}
		Optional<MemberDomain> result=member_service.id_check(member_id);
		if(result.isEmpty()) {
			return 1020;
		}
		return 1021;
	}
	
	@GetMapping("/login")
	public int login(@RequestParam("member_id") String member_id, @RequestParam("member_password") String member_password) {		
		if(!StringUtils.hasText(member_id)||!StringUtils.hasText(member_password)) {
			return 1900;
		}
		Optional<MemberDomain> result=member_service.id_check(member_id);
		if(result.isPresent()) {
			MemberDomain result_member=result.get();
			boolean result_flag=password_encoder.matches(member_password, result_member.getMember_password());
			if(result_flag) {
				return 1010;
			}
			return 1012;
		}else {
			return 1032;
		}
	}
	
	@PutMapping("/modify")
	public int modify_info(@RequestBody MemberDomain member_domain) {
		if(!StringUtils.hasText(member_domain.getMember_id())) {
			return 1900;
		}
		Optional<MemberDomain> result_id_check=member_service.id_check(member_domain.getMember_id());
		if(result_id_check.isPresent()) {
			MemberDomain result_member=result_id_check.get();
			if(!StringUtils.hasText(member_domain.getMember_password())) {
				member_domain.setMember_password(result_member.getMember_password());
			}else {
				if(password_encoder.matches(member_domain.getMember_password(), result_member.getMember_password())) {
					return 1033;
				}
			}
			if(!StringUtils.hasText(member_domain.getMember_name())) {
				member_domain.setMember_name(result_member.getMember_name());
			}
			else {
				if(member_domain.getMember_name().equals(result_member.getMember_name())) {
					return 1034;
				}
			}
			if(!StringUtils.hasText(member_domain.getMember_address())) {
				member_domain.setMember_address(result_member.getMember_address());
			}else {
				if(member_domain.getMember_address().equals(result_member.getMember_address())) {
					return 1035;
				}
			}
			if(!StringUtils.hasText(member_domain.getMember_phone())) {
				member_domain.setMember_phone(result_member.getMember_phone());
			}else {
				if(member_domain.getMember_phone().equals(result_member.getMember_phone())) {
					return 1036;
				}
			}
			if(!StringUtils.hasText(member_domain.getMember_email())) {
				member_domain.setMember_email(result_member.getMember_email());
			}else {
				if(member_domain.getMember_email().equals(result_member.getMember_email())) {
					return 1037;
				}
			}
			member_domain.setMember_created_date(result_member.getMember_created_date());
			member_domain.setMember_authority(result_member.getMember_authority());
			String temp_password=password_encoder.encode(member_domain.getMember_password());
			member_domain.setMember_password(temp_password);
			MemberDomain final_result=member_service.modify(member_domain);
			if(final_result!=null) {
				return 1030;
			}
			return 1031;
		}else {
			return 1032;
		}
	}
	
	@DeleteMapping("/withdraw")
	public int delete_member(@RequestBody MemberDomain member_domain) {
		if(!StringUtils.hasText(member_domain.getMember_id())) {
			return 1900;
		}
		Optional<MemberDomain> result_optional=member_service.id_check(member_domain.getMember_id());
		if(result_optional.isEmpty()) {
			return 1032;
		}
		Optional<MemberDomain> result=member_service.withdraw(member_domain.getMember_id());
		if(result.isEmpty()) {
			return 1040;
		}
		return 1041;
	}
	

	
}







