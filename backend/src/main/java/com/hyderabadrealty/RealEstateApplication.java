package com.hyderabadrealty;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class RealEstateApplication {
    public static void main(String[] args) {
        SpringApplication.run(RealEstateApplication.class, args);
    }
}
