package com.project_track.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project_track.domain.NationalParkDomain;
import com.project_track.service.NationalParkService;

@RestController
@RequestMapping("/national_park")
public class NationalParkController {
	@Autowired
	NationalParkService national_park_service;
	
	@GetMapping("/get_all_list")
	public List<NationalParkDomain> get_all_list(){
		List<NationalParkDomain> result_list=national_park_service.get_all_list();
		if(result_list!=null) {
			return result_list;
		}
		return null;
	}
	
	@GetMapping("/get_one_object")
	public NationalParkDomain get_one_object(@RequestParam("national_park_no") Integer national_park_no) {
		if(national_park_no==null) {
			return null;
		}
		List<NationalParkDomain> temp_list=national_park_service.get_all_list();
		int count=0;
		for(NationalParkDomain z:temp_list) {
			if(z.getNational_park_no().equals(national_park_no)) {
				count++;
				break;
			}
		}
		if(count!=1) {
			return null;
		}
		Optional<NationalParkDomain> result=national_park_service.get_one_object(national_park_no);
		if(result.isPresent()) {
			return result.get();
		}
		return null;
	}
	
	@PostMapping("/add")
	public int add(@RequestBody NationalParkDomain national_park_domain) {
		if(
				national_park_domain.getNational_park_no()==null||
				!StringUtils.hasText(national_park_domain.getNational_park_name())||
				!StringUtils.hasText(national_park_domain.getNational_park_official_website())||
				!StringUtils.hasText(national_park_domain.getNational_park_introduce())||
				national_park_domain.getNational_park_latitude()==null||
				national_park_domain.getNational_park_longitude()==null||
				!StringUtils.hasText(national_park_domain.getNational_park_address_1())||
				!StringUtils.hasText(national_park_domain.getNational_park_address_2())||
				!StringUtils.hasText(national_park_domain.getNational_park_address_3())
		  ) {
			return 1900;
		}
		List<NationalParkDomain> temp_list=national_park_service.get_all_list();
		int count=0;
		for(NationalParkDomain z:temp_list) {
			if(z.getNational_park_no().equals(national_park_domain.getNational_park_no())) {
				count++;
				break;
			}
		}
		if(count==1) {
			return 1102;
		}
		NationalParkDomain result_national_park=national_park_service.add(national_park_domain);
		if(result_national_park!=null) {
			return 1100;
		}
		return 1101;
	}
	
	@PutMapping("/modify")
	public int modify(@RequestBody NationalParkDomain national_park_domain) {
		if(national_park_domain.getNational_park_no()==null) {
			return 1900;
		}
		List<NationalParkDomain> temp_list=national_park_service.get_all_list();
		int count=0;
		for(NationalParkDomain z:temp_list) {
			if(z.getNational_park_no().equals(national_park_domain.getNational_park_no())) {
				count++;
				break;
			}
		}
		if(count!=1) {
			return 1112;
		}
		Optional<NationalParkDomain> result_optional_national_park=national_park_service.get_one_object(national_park_domain.getNational_park_no());
		if(result_optional_national_park.isPresent()) {
			NationalParkDomain result=result_optional_national_park.get();
			if(!StringUtils.hasText(national_park_domain.getNational_park_name())) {
				national_park_domain.setNational_park_name(result.getNational_park_name());
			}
			if(!StringUtils.hasText(national_park_domain.getNational_park_official_website())) {
				national_park_domain.setNational_park_official_website(result.getNational_park_official_website());
			}
			if(!StringUtils.hasText(national_park_domain.getNational_park_introduce())) {
				national_park_domain.setNational_park_introduce(result.getNational_park_introduce());
			}
			if(national_park_domain.getNational_park_latitude()==null) {
				national_park_domain.setNational_park_latitude(result.getNational_park_latitude());
			}
			if(national_park_domain.getNational_park_longitude()==null) {
				national_park_domain.setNational_park_longitude(result.getNational_park_longitude());
			}
			if(!StringUtils.hasText(national_park_domain.getNational_park_address_1())) {
				national_park_domain.setNational_park_address_1(result.getNational_park_address_1());
			}
			if(!StringUtils.hasText(national_park_domain.getNational_park_address_2())) {
				national_park_domain.setNational_park_address_2(result.getNational_park_address_2());
			}
			if(!StringUtils.hasText(national_park_domain.getNational_park_address_3())) {
				national_park_domain.setNational_park_address_3(result.getNational_park_address_3());
			}
			NationalParkDomain result_national_park=national_park_service.modify(national_park_domain);
			if(result_national_park!=null) {
				return 1110;
			}
			return 1111;	
		}else {
			return 1111;
		}
	}
	
	@DeleteMapping("/delete")
	public int delete(@RequestBody NationalParkDomain national_park_domain) {
		if(national_park_domain.getNational_park_no()==null) {
			return 1900;
		}
		List<NationalParkDomain> temp_list=national_park_service.get_all_list();
		int count=0;
		for(NationalParkDomain z:temp_list) {
			if(z.getNational_park_no().equals(national_park_domain.getNational_park_no())) {
				count++;
				break;
			}
		}
		if(count!=1) {
			return 1112;
		}
		Optional<NationalParkDomain> result_national_park=national_park_service.delete(national_park_domain.getNational_park_no());
		if(result_national_park.isEmpty()) {
			return 1120;
		}
		return 1121;
	}
}
