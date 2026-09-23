package com.hyderabadrealty.modules.sitevisit.entity;

import com.hyderabadrealty.common.BaseDocument;
import lombok.*;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "site_visits")
@CompoundIndexes({
    @CompoundIndex(name = "date_status_idx", def = "{'preferredDate': 1, 'status': 1}")
})
public class SiteVisit extends BaseDocument {

    @Indexed(unique = true)
    private String visitCode;

    private String name;

    @Indexed
    private String phone;

    @Indexed
    private String email;

    @Indexed
    private String projectId;
    private String projectName;

    @Indexed
    private String preferredDate; // "YYYY-MM-DD"
    private String preferredTimeSlot; // e.g. "10:00 AM - 12:00 PM"

    private int numberOfVisitors;
    private boolean transportationRequired;
    private String pickupAddress;

    private String specialRequests;

    @Indexed
    @Builder.Default
    private VisitStatus status = VisitStatus.PENDING;

    private String assignedAgentId;
    private String assignedAgentName;

    private String adminNotes;
}
