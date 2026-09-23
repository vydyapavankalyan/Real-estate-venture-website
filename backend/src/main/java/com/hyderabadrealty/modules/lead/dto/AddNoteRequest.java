package com.hyderabadrealty.modules.lead.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddNoteRequest {
    @NotBlank(message = "Note content cannot be empty")
    private String note;
}
