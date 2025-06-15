package com.project_track.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project_track.domain.ReviewDomain;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewDomain, Integer>{
	@Query(value="select * from review where national_park_no=:z and track_no=:y order by review_no asc, national_park_no asc, track_no asc", nativeQuery=true)
	List<ReviewDomain> get_list_track(@Param("z") Integer national_park_no, @Param("y") Integer track_no);

	@Query(value="select * from review where member_id=:z order by review_no asc, national_park_no asc, track_no asc", nativeQuery=true)
	List<ReviewDomain> get_list_member(@Param("z") String member_id);

	@Query(value="select * from review where national_park_no=:z order by review_no asc, national_park_no asc, track_no asc", nativeQuery=true)
	List<ReviewDomain> get_list_national_park(@Param("z") Integer national_park_no);
	
	@Query(value="select * from review order by review_no asc, national_park_no asc, track_no asc", nativeQuery=true)
	List<ReviewDomain> get_all_list();

}
