package com.project_track.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project_track.domain.WeatherDomain;

@Repository
public interface WeatherRepository extends JpaRepository<WeatherDomain, Integer>{
	@Query(value="select * from weather where national_park_no=:z", nativeQuery=true)
	WeatherDomain get_one_object_national_park_no(@Param("z") Integer national_park_no);

}
