package com.project_track.id;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NationalParkOfficeId implements Serializable{
	private Integer national_park_office_no;
	private Integer national_park_no;
}
