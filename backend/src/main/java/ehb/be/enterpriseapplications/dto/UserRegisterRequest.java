package ehb.be.enterpriseapplications.dto;

import lombok.Data;

@Data
public class UserRegisterRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}
