package com.project_track.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project_track.domain.MemberDomain;

@Repository
public interface MemberRepository extends JpaRepository<MemberDomain, String>{
	@Query(value="select * from member where member_id=:z and member_password=:y", nativeQuery=true)
	Optional<MemberDomain> login(@Param("z")String member_id, @Param("y")String member_password);

}
