package com.project_track.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="weather")
public class WeatherDomain {
	@Id
	private Integer weather_no;
	@Column(nullable=false)
	private Integer national_park_no;
	@Column(nullable=false)
	private Integer weather_location_x;
	@Column(nullable=false)
	private Integer weather_location_y;
}
