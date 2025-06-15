package com.project_track.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project_track.domain.TrackDomain;
import com.project_track.id.TrackId;

@Repository
public interface TrackRepository extends JpaRepository<TrackDomain, TrackId>{
	@Query(value="select * from track where national_park_no=:z order by national_park_no asc, track_no asc", nativeQuery=true)
	List<TrackDomain> get_list_national_park(@Param("z") Integer national_park_no);
	
	@Query(value="select * from track order by national_park_no asc, track_no asc", nativeQuery=true)
	List<TrackDomain> get_all_list();

}
