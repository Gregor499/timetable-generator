package com.example.demo.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String id;
    @Indexed(unique = true)
    private String username;
    private String password;
}
