package com.hyderabadrealty.modules.testimonial.entity;

import com.hyderabadrealty.common.BaseDocument;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "testimonials")
public class Testimonial extends BaseDocument {
    private String clientName;
    private String clientRole; // e.g. "Senior Vice President, Global Tech Firm"
    private String projectName; // e.g. "Skyline Heights, Kokapet"
    private String reviewText;
    private int rating; // 1 to 5
    private String avatarUrl;
    @Builder.Default
    private boolean verifiedBuyer = true;
    @Builder.Default
    private boolean active = true;
}
