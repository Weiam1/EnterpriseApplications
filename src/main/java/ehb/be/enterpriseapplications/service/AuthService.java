package ehb.be.enterpriseapplications.service;

import ehb.be.enterpriseapplications.dto.LoginRequest;

public interface AuthService {
    String login(LoginRequest request);
}
