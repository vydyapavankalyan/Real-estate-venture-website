package com.hyderabadrealty.modules.location.service;

import com.hyderabadrealty.common.ResourceNotFoundException;
import com.hyderabadrealty.modules.location.dto.LocationDto;
import com.hyderabadrealty.modules.location.entity.Location;
import com.hyderabadrealty.modules.location.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public static String toSlug(String input) {
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    public List<LocationDto> getAllActiveLocations() {
        return locationRepository.findByActiveTrue().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<LocationDto> getFeaturedLocations() {
        return locationRepository.findByFeaturedTrueAndActiveTrue().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public LocationDto getLocationBySlug(String slug) {
        Location location = locationRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Location", "slug", slug));
        return mapToDto(location);
    }

    public LocationDto createLocation(LocationDto dto) {
        String slug = dto.getSlug() != null && !dto.getSlug().isBlank()
                ? toSlug(dto.getSlug()) : toSlug(dto.getName());

        Location location = Location.builder()
                .name(dto.getName())
                .slug(slug)
                .zone(dto.getZone())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .description(dto.getDescription())
                .overview(dto.getOverview())
                .connectivityHighlights(dto.getConnectivityHighlights())
                .nearbyHubs(dto.getNearbyHubs())
                .pricePerSqFtRange(dto.getPricePerSqFtRange())
                .growthProspects(dto.getGrowthProspects())
                .heroImageUrl(dto.getHeroImageUrl())
                .featured(dto.isFeatured())
                .active(true)
                .build();

        return mapToDto(locationRepository.save(location));
    }

    public LocationDto updateLocation(String id, LocationDto dto) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Location", "id", id));

        location.setName(dto.getName());
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) {
            location.setSlug(toSlug(dto.getSlug()));
        }
        location.setZone(dto.getZone());
        location.setLatitude(dto.getLatitude());
        location.setLongitude(dto.getLongitude());
        location.setDescription(dto.getDescription());
        location.setOverview(dto.getOverview());
        location.setConnectivityHighlights(dto.getConnectivityHighlights());
        location.setNearbyHubs(dto.getNearbyHubs());
        location.setPricePerSqFtRange(dto.getPricePerSqFtRange());
        location.setGrowthProspects(dto.getGrowthProspects());
        location.setHeroImageUrl(dto.getHeroImageUrl());
        location.setFeatured(dto.isFeatured());
        location.setActive(dto.isActive());

        return mapToDto(locationRepository.save(location));
    }

    public void deleteLocation(String id) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Location", "id", id));
        location.setActive(false);
        locationRepository.save(location);
    }

    public LocationDto mapToDto(Location entity) {
        return LocationDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .slug(entity.getSlug())
                .zone(entity.getZone())
                .latitude(entity.getLatitude())
                .longitude(entity.getLongitude())
                .description(entity.getDescription())
                .overview(entity.getOverview())
                .connectivityHighlights(entity.getConnectivityHighlights())
                .nearbyHubs(entity.getNearbyHubs())
                .pricePerSqFtRange(entity.getPricePerSqFtRange())
                .growthProspects(entity.getGrowthProspects())
                .heroImageUrl(entity.getHeroImageUrl())
                .featured(entity.isFeatured())
                .active(entity.isActive())
                .build();
    }
}
