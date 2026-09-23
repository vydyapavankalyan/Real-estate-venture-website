package com.hyderabadrealty.modules.sitevisit.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class BookSiteVisitRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9+ -]{10,15}$", message = "Invalid phone number")
    private String phone;

    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Project ID is required")
    private String projectId;
    private String projectName;

    @NotBlank(message = "Preferred date is required")
    private String preferredDate;

    @NotBlank(message = "Time slot is required")
    private String preferredTimeSlot;

    @NotNull(message = "Number of visitors is required")
    private Integer numberOfVisitors;

    private boolean transportationRequired;
    private String pickupAddress;
    private String specialRequests;
}
