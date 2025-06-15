package com.project_track.domain;

import com.project_track.id.TrackId;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="track")
@IdClass(TrackId.class)
public class TrackDomain {
	@Id
	private Integer track_no;
	@Id
	private Integer national_park_no;
	@Column(nullable=false)
	private String track_name;
	@Column(nullable=false)
	private String track_detail;
	@Column(nullable=false)
	private String track_difficulty; //check 제약조건 : 쉬움/보통/어려움
	@Column(nullable=false)
	private Integer track_time; // 분
	@Column(nullable=false)
	private Double track_length; // km
	@Column(nullable=false)
	private Integer track_altitude; // m
	@Column(nullable=false)
	private Double track_latitude;
	@Column(nullable=false)
	private Double track_longitude;
	@Column(nullable=false)
	private String track_find;
	
}
