package ehb.be.enterpriseapplications.dto;

public record ItemInfo(
        Long productId,
        String productName,
        double price,
        int quantity
) {}
