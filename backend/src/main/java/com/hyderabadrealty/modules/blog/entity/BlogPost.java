package com.hyderabadrealty.modules.blog.entity;

import com.hyderabadrealty.common.BaseDocument;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "blogs")
public class BlogPost extends BaseDocument {

    @Indexed
    private String title;

    @Indexed(unique = true)
    private String slug;

    @Indexed
    private String category; // e.g. "Hyderabad Real Estate", "Investment Education", "Infrastructure Updates"

    private String excerpt;
    private String content;
    private String authorName;
    private String authorTitle;
    private String readTimeMinutes;
    private String coverImageUrl;

    @Builder.Default
    private List<String> tags = new ArrayList<>();

    @Builder.Default
    private List<String> relatedProjectSlugs = new ArrayList<>();

    @Builder.Default
    private boolean published = true;
}
