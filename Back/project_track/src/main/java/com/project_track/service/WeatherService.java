package com.project_track.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project_track.domain.WeatherDomain;
import com.project_track.repository.WeatherRepository;

@Service
public class WeatherService {
	@Autowired
	WeatherRepository weather_repository;

	public List<WeatherDomain> get_all_list() {
		return weather_repository.findAll();
	}

	public WeatherDomain get_one_object_national_park_no(Integer national_park_no) {
		return weather_repository.get_one_object_national_park_no(national_park_no);
	}

	public Optional<WeatherDomain> get_one_object(Integer weather_no) {
		return weather_repository.findById(weather_no);
	}

	public WeatherDomain add(WeatherDomain weather_domain) {
		return weather_repository.save(weather_domain);
	}

	public WeatherDomain modify(WeatherDomain weather_domain) {
		return weather_repository.save(weather_domain);
	}

	public Optional<WeatherDomain> delete(Integer weather_no) {
		weather_repository.deleteById(weather_no);
		return weather_repository.findById(weather_no);
	}
}
