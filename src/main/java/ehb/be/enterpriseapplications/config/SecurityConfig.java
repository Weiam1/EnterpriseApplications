package ehb.be.enterpriseapplications.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable()) // disable CSRF temporarily
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/products/**", "/api/categories/**").permitAll() // allow catalog
                        .anyRequest().authenticated() // everything else stays protected
                )
                .httpBasic(Customizer.withDefaults()); // default temp login

        return http.build();
    }
}
