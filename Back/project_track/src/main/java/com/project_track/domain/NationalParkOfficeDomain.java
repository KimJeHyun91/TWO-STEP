package com.project_track.domain;

import com.project_track.id.NationalParkOfficeId;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="national_park_office")
@IdClass(NationalParkOfficeId.class)
public class NationalParkOfficeDomain {
	@Id
	private Integer national_park_office_no;
	@Id
	private Integer national_park_no;
	@Column(nullable=false)
	private String national_park_office_name;
	@Column(nullable=false)
	private String national_park_office_address;
	@Column(nullable=false)
	private String national_park_office_phone;
	

}
