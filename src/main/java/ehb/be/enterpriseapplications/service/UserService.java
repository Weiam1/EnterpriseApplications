package ehb.be.enterpriseapplications.service;

import ehb.be.enterpriseapplications.dto.UserRegisterRequest;
import ehb.be.enterpriseapplications.model.User;

public interface UserService {
    User register(UserRegisterRequest request);
}
