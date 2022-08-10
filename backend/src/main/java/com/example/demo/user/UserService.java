package com.example.demo.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void createNewUser(UserCreationData userCreationData) {
        if (!userCreationData.getPassword().equals(userCreationData.getPasswordRepeat())) {
            throw new IllegalArgumentException("passwords do not match");
        }

        if (userCreationData.getUsername() == null || userCreationData.getUsername().isBlank()) {
            throw new IllegalArgumentException("username is blank");
        }

        User user = new User();
        user.setUsername(userCreationData.getUsername());
        user.setPassword(passwordEncoder.encode(userCreationData.getPassword()));
        user.setRoles(List.of("user"));

        userRepository.save(user);
    }
    public Optional<User> findById(String id){
        return userRepository.findById(id);
    }

    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }
}
