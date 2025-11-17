package ehb.be.enterpriseapplications.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for API usage
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/register",
                                "/api/auth/login"
                        ).permitAll()     // Allow these endpoints
                        .anyRequest().permitAll() // temporary until we add JWT
                )
                .httpBasic(Customizer.withDefaults())
                .formLogin(form -> form.disable()); // Disable Spring login page

        return http.build();
    }
}
