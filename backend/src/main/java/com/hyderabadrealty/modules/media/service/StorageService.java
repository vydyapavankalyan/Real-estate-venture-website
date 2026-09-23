package com.hyderabadrealty.modules.media.service;

import com.hyderabadrealty.common.BadRequestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class StorageService {

    @Value("${app.upload.dir:./uploads}")
    private String uploadDir;

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "webp", "pdf");
    private static final long MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

    public String storeFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BadRequestException("Cannot upload empty file");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new BadRequestException("File exceeds maximum permissible size of 15MB");
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "image.jpg");
        String extension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            extension = originalFilename.substring(dotIndex + 1).toLowerCase();
        }

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new BadRequestException("Unsupported file type. Allowed formats: JPG, JPEG, PNG, WEBP, PDF");
        }

        try {
            Path rootLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
            if (!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }

            String newFilename = UUID.randomUUID() + "." + extension;
            Path destinationFile = rootLocation.resolve(newFilename).normalize();

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }

            log.info("Uploaded file stored at {}", destinationFile);
            return "/uploads/" + newFilename;
        } catch (IOException e) {
            throw new BadRequestException("Failed to store file: " + e.getMessage());
        }
    }

    public List<String> storeMultipleFiles(MultipartFile[] files) {
        List<String> urls = new ArrayList<>();
        for (MultipartFile file : files) {
            urls.add(storeFile(file));
        }
        return urls;
    }
}
