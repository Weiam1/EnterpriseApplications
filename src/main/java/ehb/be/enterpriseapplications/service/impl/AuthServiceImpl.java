package ehb.be.enterpriseapplications.service.impl;

import ehb.be.enterpriseapplications.config.JwtUtil;
import ehb.be.enterpriseapplications.dto.LoginRequest;
import ehb.be.enterpriseapplications.model.User;
import ehb.be.enterpriseapplications.repository.UserRepository;
import ehb.be.enterpriseapplications.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password.");
        }

        return jwtUtil.generateToken(user.getEmail());
    }
}
