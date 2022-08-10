package com.example.demo.timetableGenerator;

import com.example.demo.timetable.TimeUnit;
import com.example.demo.user.LoginData;
import com.example.demo.user.LoginResponse;
import com.example.demo.user.UserCreationData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.data.mongodb.core.messaging.Task;
import org.springframework.http.*;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TimeTableGeneratorIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void integrationTest() {
        ResponseEntity<Void> userCreationResponse = restTemplate.postForEntity("/api/users", new UserCreationData("user", "pw", "pw"), Void.class);
        assertThat(userCreationResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        ResponseEntity<LoginResponse> loginResponse = restTemplate.postForEntity("/api/auth/login", new LoginData("user", "pw"), LoginResponse.class);
        String jwt = loginResponse.getBody().getJwt();

        ResponseEntity <TimeUnit[]> createResponse = restTemplate.exchange(
                "/api/time",
                HttpMethod.POST,
                new HttpEntity<>(new TimeUnit(null, "01:00", 1, "02:00", 0), createHeaders(jwt)),
                TimeUnit[].class
        );

        TimeUnit timeUnit = createResponse.getBody()[0];

        assertThat(timeUnit.getTime()).isEqualTo("01:00");
        assertThat(timeUnit.getLength()).isEqualTo(1);
        assertThat(timeUnit.getEnd()).isEqualTo("02:00");
        assertThat(timeUnit.getTimeInMinutes()).isEqualTo(60);
    }

    private HttpHeaders createHeaders(String jwt) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwt);
        return headers;
    }

    private String refreshToken(String jwt) {
        ResponseEntity<LoginResponse> refreshResponse = restTemplate.exchange(
                "/api/auth/refresh",
                HttpMethod.POST,
                new HttpEntity<>(createHeaders(jwt)),
                LoginResponse.class
        );
        assertThat(refreshResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        return refreshResponse.getBody().getJwt();
    }
}
