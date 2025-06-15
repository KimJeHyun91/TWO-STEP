package com.project_track.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="national_park")
public class NationalParkDomain {
	@Id
	private Integer national_park_no;
	@Column(nullable=false)
	private String national_park_name;
	@Column(nullable=false)
	private String national_park_official_website;
	@Column(nullable=false)
	private String national_park_introduce;
	@Column(nullable=false)
	private Double national_park_latitude;
	@Column(nullable=false)
	private Double national_park_longitude;
	@Column(nullable=false)
	private String national_park_address_1;
	@Column(nullable=false)
	private String national_park_address_2;
	@Column(nullable=false)
	private String national_park_address_3;
	
}
