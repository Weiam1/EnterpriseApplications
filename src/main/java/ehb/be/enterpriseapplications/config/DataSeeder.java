package ehb.be.enterpriseapplications.config;

import ehb.be.enterpriseapplications.model.Category;
import ehb.be.enterpriseapplications.model.Product;
import ehb.be.enterpriseapplications.repository.CategoryRepository;
import ehb.be.enterpriseapplications.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(CategoryRepository categoryRepository,
                                   ProductRepository productRepository) {
        return args -> {

            // Only seed if database is empty
            if (categoryRepository.count() == 0) {

                // Create Categories
                Category lighting = categoryRepository.save(
                        Category.builder()
                                .name("Lighting")
                                .description("Studio and stage lighting equipment")
                                .build()
                );

                Category cables = categoryRepository.save(
                        Category.builder()
                                .name("Cables")
                                .description("Power, audio, and data cables")
                                .build()
                );

                Category panels = categoryRepository.save(
                        Category.builder()
                                .name("Panels")
                                .description("LED and control panels")
                                .build()
                );

                // Create Products for Lighting
                productRepository.save(
                        Product.builder()
                                .name("Softbox Light")
                                .description("High-intensity soft lighting for studios")
                                .price(49.99)
                                .stock(10)
                                .imageUrl("https://example.com/light1.jpg")
                                .category(lighting)
                                .build()
                );

                productRepository.save(
                        Product.builder()
                                .name("LED Spotlight")
                                .description("Professional LED spotlight for filming")
                                .price(89.99)
                                .stock(5)
                                .imageUrl("https://example.com/light2.jpg")
                                .category(lighting)
                                .build()
                );

                // Create Products for Cables
                productRepository.save(
                        Product.builder()
                                .name("HDMI Cable 2m")
                                .description("Durable 4K HDMI cable")
                                .price(12.50)
                                .stock(50)
                                .imageUrl("https://example.com/hdmi.jpg")
                                .category(cables)
                                .build()
                );

                productRepository.save(
                        Product.builder()
                                .name("XLR Audio Cable")
                                .description("Professional microphone cable")
                                .price(15.00)
                                .stock(40)
                                .imageUrl("https://example.com/xlr.jpg")
                                .category(cables)
                                .build()
                );

                // Create Products for Panels
                productRepository.save(
                        Product.builder()
                                .name("LED Display Panel")
                                .description("Modular LED display panel for events")
                                .price(199.99)
                                .stock(8)
                                .imageUrl("https://example.com/panel1.jpg")
                                .category(panels)
                                .build()
                );

                productRepository.save(
                        Product.builder()
                                .name("Control Panel")
                                .description("Audio/visual control panel for productions")
                                .price(299.99)
                                .stock(4)
                                .imageUrl("https://example.com/panel2.jpg")
                                .category(panels)
                                .build()
                );
            }
        };
    }
}
