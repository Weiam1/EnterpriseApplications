package ehb.be.enterpriseapplications.controller;

import ehb.be.enterpriseapplications.dto.LoginRequest;
import ehb.be.enterpriseapplications.dto.UserRegisterRequest;
import ehb.be.enterpriseapplications.model.User;
import ehb.be.enterpriseapplications.service.AuthService;
import ehb.be.enterpriseapplications.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")  // React frontend
public class AuthController {

    private final UserService userService;
    private final AuthService authService;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterRequest request) {
        try {
            User user = userService.register(request);

            // Remove password from response
            user.setPassword(null);

            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.login(request);
            return ResponseEntity.ok(token);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

}
