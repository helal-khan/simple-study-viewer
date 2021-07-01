package com.studyviewer.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    @Size(max = 30)
    private String personCode;

    @Column(nullable = false, length = 50)
    @NotBlank(message = "First Name required.")
    @Size(max = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    @NotBlank(message = "Last Name required.")
    @Size(max = 50)
    private String lastName;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    @NotNull(message = "Date of birth required.")
    private Date dob;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;
}

