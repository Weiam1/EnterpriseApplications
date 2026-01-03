package ehb.be.enterpriseapplications.service;

import ehb.be.enterpriseapplications.dto.LoginRequest;
import ehb.be.enterpriseapplications.dto.LoginResponse;

public interface AuthService {
    LoginResponse  login(LoginRequest request);
}
