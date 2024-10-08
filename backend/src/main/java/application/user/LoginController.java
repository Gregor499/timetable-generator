package application.user;

import application.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping("/login")
    ResponseEntity<LoginResponse> login(@RequestBody LoginData loginData) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginData.getUsername(), loginData.getPassword()));
            User user = userService.findByUsername(loginData.getUsername()).orElseThrow();
            HashMap<String, Object> roles = new HashMap<>();
            roles.put("userRole", user.getRoles());
            //roles.put("adminRole", "admin");
            String jwt = jwtService.createJwt(roles, user.getId());
            return ResponseEntity.ok(new LoginResponse(jwt));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/refresh")
    ResponseEntity<LoginResponse> refreshToken(Principal principal) {
        User user = userService.findByUsername(principal.getName()).orElseThrow();
        String jwt = jwtService.createJwt(new HashMap<>(), user.getId());
        return ResponseEntity.ok(new LoginResponse(jwt));
    }
}
