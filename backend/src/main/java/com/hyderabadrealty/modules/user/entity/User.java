package com.hyderabadrealty.modules.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hyderabadrealty.common.BaseDocument;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User extends BaseDocument {

    @Indexed(unique = true)
    private String email;

    @JsonIgnore
    private String password;

    private String fullName;

    private String phone;

    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    @Builder.Default
    private boolean active = true;

    private String avatarUrl;
}
