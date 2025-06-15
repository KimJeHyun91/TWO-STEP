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
import com.project_track.domain.TrackDomain;
import com.project_track.id.TrackId;
import com.project_track.service.NationalParkService;
import com.project_track.service.TrackService;

@RestController
@RequestMapping("/track")
public class TrackController {
	@Autowired
	TrackService track_service;
	@Autowired
	NationalParkService national_park_service;
	
	@GetMapping("/get_all_list")
	public List<TrackDomain> get_all_track_list(){
		List<TrackDomain> result_list=track_service.get_all_list();
		if(result_list!=null) {
			return result_list;
		}
		return null;
	}
	
	@GetMapping("/get_list_national_park")
	public List<TrackDomain> get_list_national_park(@RequestParam("national_park_no") Integer national_park_no){
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
		
		List<TrackDomain> result_list=track_service.get_list_national_park(national_park_no);
		if(result_list!=null) {
			return result_list;
		}
		return null;
	}
	
	@GetMapping("/get_one_object")
	public TrackDomain get_one_object(@RequestParam("track_no") Integer track_no, @RequestParam("national_park_no") Integer national_park_no) {
		if(track_no==null||national_park_no==null) {
			return null;
		}
		List<TrackDomain> temp_all_list=track_service.get_all_list();
		int count=0;
		for(TrackDomain z:temp_all_list) {
			if(z.getTrack_no().equals(track_no)&&z.getNational_park_no().equals(national_park_no)) {
				count++;
				break;
			}
		}
		if(count!=1) {
			return null;
		}
		TrackId track_id=new TrackId();
		track_id.setNational_park_no(national_park_no);
		track_id.setTrack_no(track_no);
		Optional<TrackDomain> result=track_service.get_one_object(track_id);
		if(result.isPresent()) {
			return result.get();
		}
		return null;
	}
	
	@PostMapping("/add")
	public int add(@RequestBody TrackDomain track_domain) {
		if(
				track_domain.getTrack_no()==null||
				track_domain.getNational_park_no()==null||
				!StringUtils.hasText(track_domain.getTrack_name())||
				!StringUtils.hasText(track_domain.getTrack_detail())||
				!StringUtils.hasText(track_domain.getTrack_difficulty())||
				track_domain.getTrack_time()==null||
				track_domain.getTrack_length()==null||
				track_domain.getTrack_altitude()==null||
				track_domain.getTrack_latitude()==null||
				track_domain.getTrack_longitude()==null||
				!StringUtils.hasText(track_domain.getTrack_find())
		   ) {
			return 1900;
		}
		if(
				!(track_domain.getTrack_difficulty().equals("쉬움")||
				track_domain.getTrack_difficulty().equals("보통")||
				track_domain.getTrack_difficulty().equals("어려움"))
		  ) {
			return 1302;
		}
				
		List<TrackDomain> temp_list_track=track_service.get_all_list();
		int count=0;
		for(TrackDomain z:temp_list_track) {
			if(z.getTrack_no().equals(track_domain.getTrack_no())&&z.getNational_park_no().equals(track_domain.getNational_park_no())) {
				count++;
				break;
			}
		}
		if(count==1) {
			return 1303;
		}
		
		TrackDomain result_track=track_service.add(track_domain);
		if(result_track!=null) {
			return 1300;
		}
		return 1301;
	}
	
	@PutMapping("/modify")
	public int modify(@RequestBody TrackDomain track_domain) {
		if(track_domain.getTrack_no()==null||track_domain.getNational_park_no()==null) {
			return 1900;
		}
		List<TrackDomain> temp_list=track_service.get_all_list();
		int count=0;
		for(TrackDomain z:temp_list) {
			if(z.getTrack_no().equals(track_domain.getTrack_no())&&z.getNational_park_no().equals(track_domain.getNational_park_no())) {
				count++;
				break;
			}
		}
		if(count!=1) {
			return 1312;
		}
		TrackId track_id=new TrackId();
		track_id.setTrack_no(track_domain.getTrack_no());
		track_id.setNational_park_no(track_domain.getNational_park_no());
		Optional<TrackDomain> result_optional=track_service.get_one_object(track_id);
		if(result_optional.isPresent()) {
			TrackDomain result=result_optional.get();
			if(!StringUtils.hasText(track_domain.getTrack_name())) {
				track_domain.setTrack_name(result.getTrack_name());
			}
			if(!StringUtils.hasText(track_domain.getTrack_detail())) {
				track_domain.setTrack_detail(result.getTrack_detail());
			}
			if(!StringUtils.hasText(track_domain.getTrack_difficulty())) {
				track_domain.setTrack_difficulty(result.getTrack_difficulty());
			}else {
				if(
						!(track_domain.getTrack_difficulty().equals("쉬움")||
						track_domain.getTrack_difficulty().equals("보통")||
						track_domain.getTrack_difficulty().equals("어려움"))
				  ) {
					return 1302;
				}
			}
			if(track_domain.getTrack_time()==null) {
				track_domain.setTrack_time(result.getTrack_time());
			}
			if(track_domain.getTrack_length()==null) {
				track_domain.setTrack_length(result.getTrack_length());
			}
			if(track_domain.getTrack_altitude()==null) {
				track_domain.setTrack_altitude(result.getTrack_altitude());
			}
			if(track_domain.getTrack_latitude()==null) {
				track_domain.setTrack_latitude(result.getTrack_latitude());
			}
			if(track_domain.getTrack_longitude()==null) {
				track_domain.setTrack_longitude(result.getTrack_longitude());
			}
			if(!StringUtils.hasText(track_domain.getTrack_find())) {
				track_domain.setTrack_find(result.getTrack_find());
			}
			TrackDomain result_track=track_service.modify(track_domain);
			if(result_track!=null) {
				return 1310;
			}
			return 1311;
		}
		return 1311;
	}
	
	@DeleteMapping("/delete")
	public int delete(@RequestBody TrackDomain track_domain) {
		if(track_domain.getTrack_no()==null||track_domain.getNational_park_no()==null) {
			return 1900;
		}
		List<TrackDomain> temp_list=track_service.get_all_list();
		int count=0;
		for(TrackDomain z:temp_list) {
			if(z.getTrack_no().equals(track_domain.getTrack_no())&&z.getNational_park_no().equals(track_domain.getNational_park_no())) {
				count++;
				break;
			}
		}
		if(count!=1) {
			return 1312;
		}
		TrackId track_id=new TrackId();
		track_id.setNational_park_no(track_domain.getNational_park_no());
		track_id.setTrack_no(track_domain.getTrack_no());
		Optional<TrackDomain> result_optional=track_service.delete(track_id);
		if(result_optional.isEmpty()) {
			return 1320;
		}
		return 1321;
	}
	
	
	
	
}
