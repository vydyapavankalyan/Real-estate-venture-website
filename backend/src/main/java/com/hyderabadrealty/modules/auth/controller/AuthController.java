package com.hyderabadrealty.modules.auth.controller;

import com.hyderabadrealty.common.ApiResponse;
import com.hyderabadrealty.modules.auth.dto.JwtAuthResponse;
import com.hyderabadrealty.modules.auth.dto.LoginRequest;
import com.hyderabadrealty.modules.auth.dto.RefreshTokenRequest;
import com.hyderabadrealty.modules.auth.dto.RegisterRequest;
import com.hyderabadrealty.modules.auth.service.AuthService;
import com.hyderabadrealty.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for user authentication, registration and token refresh")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Login with email and password")
    public ResponseEntity<ApiResponse<JwtAuthResponse>> login(@Valid @RequestBody LoginRequest loginRequest) {
        JwtAuthResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new user account")
    public ResponseEntity<ApiResponse<JwtAuthResponse>> register(@Valid @RequestBody RegisterRequest registerRequest) {
        JwtAuthResponse response = authService.register(registerRequest);
        return ResponseEntity.ok(ApiResponse.success("Registration successful", response));
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Refresh expired access token using refresh token")
    public ResponseEntity<ApiResponse<JwtAuthResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        JwtAuthResponse response = authService.refreshToken(request);
        return ResponseEntity.ok(ApiResponse.success("Token refreshed", response));
    }

    @GetMapping("/me")
    @Operation(summary = "Get currently authenticated user profile")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getCurrentUser(@AuthenticationPrincipal UserPrincipal currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Not authenticated"));
        }
        Map<String, Object> userData = Map.of(
                "id", currentUser.getId(),
                "email", currentUser.getEmail(),
                "fullName", currentUser.getFullName(),
                "roles", currentUser.getAuthorities()
        );
        return ResponseEntity.ok(ApiResponse.success(userData));
    }
}
