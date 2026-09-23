# ---------------------------------------------
# 1. Build Stage
# ---------------------------------------------
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# ---------------------------------------------
# 2. Runtime Stage
# ---------------------------------------------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN mkdir -p /app/uploads && chown -R appuser:appgroup /app

COPY --from=builder /app/target/hyderabad-real-estate-backend-1.0.0.jar app.jar

USER appuser
EXPOSE 8085

ENV SPRING_DATA_MONGODB_URI=mongodb://mongodb:27017/venture
ENV SERVER_PORT=8085

ENTRYPOINT ["java", "-jar", "app.jar"]
