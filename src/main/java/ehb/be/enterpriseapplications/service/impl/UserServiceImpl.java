package ehb.be.enterpriseapplications.service.impl;

import ehb.be.enterpriseapplications.dto.UserRegisterRequest;
import ehb.be.enterpriseapplications.model.Role;
import ehb.be.enterpriseapplications.model.User;
import ehb.be.enterpriseapplications.repository.UserRepository;
import ehb.be.enterpriseapplications.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User register(UserRegisterRequest request) {

        // 1. Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use.");
        }

        // 2. Create new user
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))  // Hash password
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(Role.USER)                    // Default role
                .createdAt(LocalDateTime.now())     // Timestamp
                .build();

        // 3. Save user in database
        return userRepository.save(user);
    }
}
