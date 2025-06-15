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
import com.project_track.domain.NationalParkOfficeDomain;
import com.project_track.id.NationalParkOfficeId;
import com.project_track.service.NationalParkOfficeService;
import com.project_track.service.NationalParkService;

@RestController
@RequestMapping("/national_park_office")
public class NationalParkOfficeController {
	@Autowired
	NationalParkOfficeService national_park_office_service;
	@Autowired
	NationalParkService national_park_service;
	
	@GetMapping("/get_all_list")
	public List<NationalParkOfficeDomain> get_all_list(){
		List<NationalParkOfficeDomain> result_list=national_park_office_service.get_all_list();
		if(result_list!=null) {
			return result_list;
		}
		return null;
	}
	
	@GetMapping("/get_list_national_park")
	public List<NationalParkOfficeDomain> get_list_national_park(@RequestParam("national_park_no") Integer national_park_no){
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
		List<NationalParkOfficeDomain> result_list=national_park_office_service.get_list_national_park(national_park_no);
		if(result_list!=null) {
			return result_list;
		}
		return null;
	}
	
	@GetMapping("/get_one_object")
	public NationalParkOfficeDomain get_one_object(@RequestParam("national_park_no") Integer national_park_no, @RequestParam("national_park_office_no") Integer national_park_office_no) {
		if(national_park_no==null||national_park_office_no==null) {
			return null;
		}
		List<NationalParkOfficeDomain> temp_list=national_park_office_service.get_all_list();
		int count=0;
		for(NationalParkOfficeDomain z:temp_list) {
			if(z.getNational_park_no().equals(national_park_no)&&z.getNational_park_office_no().equals(national_park_office_no)) {
				count++;
				break;
			}
		}
		if(count!=1) {
			return null;
		}
		NationalParkOfficeId national_park_office_id=new NationalParkOfficeId();
		national_park_office_id.setNational_park_no(national_park_no);
		national_park_office_id.setNational_park_office_no(national_park_office_no);	
		Optional<NationalParkOfficeDomain> result=national_park_office_service.get_one_object(national_park_office_id);
		if(result.isPresent()) {
			return result.get();
		}
		return null;
	}
	
	@PostMapping("/add")
	public int add(@RequestBody NationalParkOfficeDomain national_park_office_domain) {
		if(
				national_park_office_domain.getNational_park_office_no()==null||
				national_park_office_domain.getNational_park_no()==null||
				!StringUtils.hasText(national_park_office_domain.getNational_park_office_name())||
				!StringUtils.hasText(national_park_office_domain.getNational_park_office_address())||
				!StringUtils.hasText(national_park_office_domain.getNational_park_office_phone())
		) {
			return 1900;
		}
		List<NationalParkOfficeDomain> temp_list_national_park_office=national_park_office_service.get_all_list();
		int count=0;
		for(NationalParkOfficeDomain z:temp_list_national_park_office) {
			if(z.getNational_park_no().equals(national_park_office_domain.getNational_park_no())&&z.getNational_park_office_no().equals(national_park_office_domain.getNational_park_office_no())) {
				count++;
				break;
			}
		}
		if(count==1) {
			return 1202;
		}
		NationalParkOfficeDomain result=national_park_office_service.add(national_park_office_domain);
		if(result!=null) {
			return 1200;
		}
		return 1201;
	}
	
	@PutMapping("/modify")
	public int modify(@RequestBody NationalParkOfficeDomain national_park_office_domain) {
		if(national_park_office_domain.getNational_park_office_no()==null||national_park_office_domain.getNational_park_no()==null) {
			return 1900;
		}
		List<NationalParkOfficeDomain> temp_list=national_park_office_service.get_all_list();
		int count=0;
		for(NationalParkOfficeDomain z:temp_list) {
			if(z.getNational_park_no().equals(national_park_office_domain.getNational_park_no())&&z.getNational_park_office_no().equals(national_park_office_domain.getNational_park_office_no())) {
				count++;
				break;
			}
		}
		if(count!=1) {
			return 1212;
		}
		NationalParkOfficeId national_park_office_id=new NationalParkOfficeId();
		national_park_office_id.setNational_park_office_no(national_park_office_domain.getNational_park_office_no());
		national_park_office_id.setNational_park_no(national_park_office_domain.getNational_park_no());
		Optional<NationalParkOfficeDomain> result_optional=national_park_office_service.get_one_object(national_park_office_id);
		if(result_optional.isPresent()) {
			NationalParkOfficeDomain result=result_optional.get();
			if(!StringUtils.hasText(national_park_office_domain.getNational_park_office_name())) {
				national_park_office_domain.setNational_park_office_name(result.getNational_park_office_name());
			}
			if(!StringUtils.hasText(national_park_office_domain.getNational_park_office_address())) {
				national_park_office_domain.setNational_park_office_address(result.getNational_park_office_address());
			}
			if(!StringUtils.hasText(national_park_office_domain.getNational_park_office_phone())) {
				national_park_office_domain.setNational_park_office_phone(result.getNational_park_office_phone());
			}
			NationalParkOfficeDomain final_result=national_park_office_service.modify(national_park_office_domain);
			if(final_result!=null) {
				return 1210;
			}
			return 1211;
		}
		return 1211;
	}
	
	@DeleteMapping("/delete")
	public int delete(@RequestBody NationalParkOfficeDomain national_park_office_domain) {
		if(national_park_office_domain.getNational_park_no()==null||national_park_office_domain.getNational_park_office_no()==null) {
			return 1900;
		}
		List<NationalParkOfficeDomain> temp_list=national_park_office_service.get_all_list();
		int count=0;
		for(NationalParkOfficeDomain z:temp_list) {
			if(z.getNational_park_no().equals(national_park_office_domain.getNational_park_no())&&z.getNational_park_office_no().equals(national_park_office_domain.getNational_park_office_no())) {
				count++;
				break;
			}
		}
		if(count!=1) {
			return 1212;
		}
		NationalParkOfficeId national_park_office_id=new NationalParkOfficeId();
		national_park_office_id.setNational_park_no(national_park_office_domain.getNational_park_no());
		national_park_office_id.setNational_park_office_no(national_park_office_domain.getNational_park_office_no());		
		Optional<NationalParkOfficeDomain> result=national_park_office_service.delete(national_park_office_id);
		if(result.isEmpty()) {
			return 1220;
		}
		return 1221;
	}
}
