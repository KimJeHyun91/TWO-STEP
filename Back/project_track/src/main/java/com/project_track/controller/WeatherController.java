package com.project_track.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project_track.domain.NationalParkDomain;
import com.project_track.domain.WeatherDomain;
import com.project_track.service.NationalParkService;
import com.project_track.service.WeatherService;

@RestController
@RequestMapping("/weather")
public class WeatherController {
	@Autowired
	WeatherService weather_service;
	@Autowired
	NationalParkService national_park_service;
	
	@GetMapping("/get_all_list")
	public List<WeatherDomain> get_all_list(){
		List<WeatherDomain> result_list=weather_service.get_all_list();
		if(result_list!=null) {
			return result_list;
		}
		return null;
	}
	
	@GetMapping("/get_one_object_national_park_no")
	public WeatherDomain get_one_object_national_park_no(@RequestParam("national_park_no") Integer national_park_no) {
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
		WeatherDomain result_weather=weather_service.get_one_object_national_park_no(national_park_no);
		if(result_weather!=null) {
			return result_weather;
		}
		return null;
	}
	
	@GetMapping("/get_one_object")
	public WeatherDomain get_one_object(@RequestParam("weather_no") Integer weather_no) {
		if(weather_no==null) {
			return null;
		}
		List<WeatherDomain> temp_list=weather_service.get_all_list();
		int count=0;
		for(WeatherDomain z:temp_list) {
			if(z.getWeather_no().equals(weather_no)) {
				count++;
				break;
			}
		}
		if(count!=1) {
			return null;
		}
		
		Optional<WeatherDomain> result_optional=weather_service.get_one_object(weather_no);
		if(result_optional.isPresent()) {
			return result_optional.get();
		}
		return null;
	}
	
	@PostMapping("/add")
	public int add(@RequestBody WeatherDomain weather_domain) {
		if(
				weather_domain.getWeather_no()==null||
				weather_domain.getNational_park_no()==null||
				weather_domain.getWeather_location_x()==null||
				weather_domain.getWeather_location_y()==null
				) {
			return 1900;
		}
		List<NationalParkDomain> temp_list=national_park_service.get_all_list();
		int count1=0;
		for(NationalParkDomain z:temp_list) {
			if(z.getNational_park_no().equals(weather_domain.getNational_park_no())) {
				count1++;
				break;
			}
		}
		if(count1!=1) {
			return 1112;
		}
		List<WeatherDomain> temp_list_weather=weather_service.get_all_list();
		int count=0;
		for(WeatherDomain z:temp_list_weather) {
			if(z.getWeather_no().equals(weather_domain.getWeather_no())) {
				count++;
				break;
			}
		}
		if(count==1) {
			return 1502;
		}
		WeatherDomain result=weather_service.add(weather_domain);
		if(result!=null) {
			return 1500;
		}
		return 1501;
	}
	
	@PutMapping("/modify")
	public int modify(@RequestBody WeatherDomain weather_domain) {
		if(weather_domain.getWeather_no()==null) {
			return 1900;
		}
						
		List<WeatherDomain> temp_list_weather=weather_service.get_all_list();
		int count=0;
		for(WeatherDomain z:temp_list_weather) {
			if(z.getWeather_no().equals(weather_domain.getWeather_no())) {
				count++;
				break;
			}
		}
		if(count!=1) {
			return 1512;
		}
		
		Optional<WeatherDomain> result_optional=weather_service.get_one_object(weather_domain.getWeather_no());
		if(result_optional.isPresent()) {
			WeatherDomain result=result_optional.get();
			if(weather_domain.getNational_park_no()==null) {
				weather_domain.setNational_park_no(result.getNational_park_no());
			}else {
				List<NationalParkDomain> temp_list=national_park_service.get_all_list();
				int count1=0;
				for(NationalParkDomain z:temp_list) {
					if(z.getNational_park_no().equals(weather_domain.getNational_park_no())) {
						count1++;
						break;
					}
				}
				if(count1!=1) {
					return 1112;
				}
			}	
			if(weather_domain.getWeather_location_x()==null) {
				weather_domain.setWeather_location_x(result.getWeather_location_x());
			}
			if(weather_domain.getWeather_location_y()==null) {
				weather_domain.setWeather_location_y(result.getWeather_location_y());
			}
			WeatherDomain result_weather=weather_service.modify(weather_domain);
			if(result_weather!=null) {
				return 1510;
			}
			return 1511;
		}
		return 1511;
	}
	
	@DeleteMapping("/delete")
	public int delete(@RequestBody WeatherDomain weather_domain) {
		if(weather_domain.getWeather_no()==null) {
			return 1900;
		}
		List<WeatherDomain> temp_list_weather=weather_service.get_all_list();
		int count=0;
		for(WeatherDomain z:temp_list_weather) {
			if(z.getWeather_no().equals(weather_domain.getWeather_no())) {
				count++;
				break;
			}
		}
		if(count!=1) {
			return 1512;
		}
		Optional<WeatherDomain> result_optional=weather_service.delete(weather_domain.getWeather_no());
		if(result_optional.isEmpty()) {
			return 1520;
		}
		return 1521;
	}
	
	
}
