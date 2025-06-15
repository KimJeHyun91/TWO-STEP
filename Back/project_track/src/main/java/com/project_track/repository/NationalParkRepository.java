package com.project_track.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project_track.domain.NationalParkDomain;

@Repository
public interface NationalParkRepository extends JpaRepository<NationalParkDomain, Integer>{
	@Query(value="select * from national_park order by national_park_no asc", nativeQuery=true)
	List<NationalParkDomain> get_all_list();

}
