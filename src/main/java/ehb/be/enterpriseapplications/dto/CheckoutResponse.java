package ehb.be.enterpriseapplications.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CheckoutResponse {
    private Long orderId;
    private double totalPrice;
    private String message;
}
