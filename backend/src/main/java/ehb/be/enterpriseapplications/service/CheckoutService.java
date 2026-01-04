package ehb.be.enterpriseapplications.service;

import ehb.be.enterpriseapplications.dto.CheckoutResponse;
import ehb.be.enterpriseapplications.model.User;

public interface CheckoutService {
    CheckoutResponse checkout(User user);
}
