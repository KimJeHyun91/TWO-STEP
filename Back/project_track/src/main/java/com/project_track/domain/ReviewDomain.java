package com.project_track.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="review")
@EntityListeners(AuditingEntityListener.class)
public class ReviewDomain {
	@Id
	@SequenceGenerator(
			name="z"
			, sequenceName="review_sequence"
			, initialValue=1
			, allocationSize=1
	)
	@GeneratedValue(generator="z")
	private Integer review_no;
	@Column(nullable=false)
	private String member_id;
	@Column(nullable=false)
	private Integer track_no;
	@Column(nullable=false)
	private Integer national_park_no;
	@Column(nullable=false)
	private String review_content;
	@CreatedDate
	private LocalDateTime review_created_date;
	@LastModifiedDate
	private LocalDateTime review_last_modified_date;
}
