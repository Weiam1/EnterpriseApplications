package ehb.be.enterpriseapplications.service;

import ehb.be.enterpriseapplications.dto.CheckoutResponse;

public interface CheckoutService {
    CheckoutResponse checkout(Long userId);
}
