package com.hyderabadrealty.modules.lead.entity;

import com.hyderabadrealty.common.BaseDocument;
import lombok.*;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "leads")
@CompoundIndexes({
    @CompoundIndex(name = "status_assigned_idx", def = "{'status': 1, 'assignedAgentId': 1}"),
    @CompoundIndex(name = "created_status_idx", def = "{'createdAt': -1, 'status': 1}")
})
public class Lead extends BaseDocument {

    @Indexed(unique = true)
    private String leadCode; // e.g. "HYD-LEAD-1042"

    private String name;

    @Indexed
    private String phone;

    @Indexed
    private String email;

    private String preferredLocation;
    private String propertyType;
    private String budget;

    private String projectId;
    private String projectName;

    private String message;
    private String source; // "HOMEPAGE_SEARCH", "PROJECT_DETAIL", "SCHEDULE_VISIT", "CONTACT_PAGE"

    @Indexed
    @Builder.Default
    private LeadStatus status = LeadStatus.NEW;

    private String assignedAgentId;
    private String assignedAgentName;

    @Builder.Default
    private List<LeadNote> notes = new ArrayList<>();

    private String nextFollowUpDate;
}
