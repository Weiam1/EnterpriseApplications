package ehb.be.enterpriseapplications.controller;

import ehb.be.enterpriseapplications.dto.UserRegisterRequest;
import ehb.be.enterpriseapplications.model.User;
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
}
