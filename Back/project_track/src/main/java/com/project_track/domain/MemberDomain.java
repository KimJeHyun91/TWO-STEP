package com.project_track.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="member")
@EntityListeners(AuditingEntityListener.class)
@DynamicInsert
public class MemberDomain {
	@Id
	private String member_id;
	@Column
	private String member_password;
	@Column
	@ColumnDefault("'M'")
	private Character member_authority;
	@Column
	private String member_name;
	@Column
	private String member_phone;
	@Column
	private String member_email;
	@Column
	private String member_address;
	@CreatedDate
	private LocalDateTime member_created_date;
	@LastModifiedDate
	private LocalDateTime member_last_modified_date;
	
	
}
