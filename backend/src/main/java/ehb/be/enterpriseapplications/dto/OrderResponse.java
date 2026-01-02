package ehb.be.enterpriseapplications.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderResponse {

    private Long orderId;
    private LocalDateTime createdAt;
    private double totalPrice;
    private List<ItemInfo> items;

    @Data
    @AllArgsConstructor
    public static class ItemInfo {
        private String productName;
        private int quantity;
        private double price;
    }
}
