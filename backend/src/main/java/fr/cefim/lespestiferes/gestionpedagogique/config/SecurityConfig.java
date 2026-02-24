package fr.cefim.lespestiferes.gestionpedagogique.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Configuration de sécurité Spring Security.
 * Pour le moment, toutes les routes sont accessibles sans authentification
 * pour permettre le test de connexion à la base de données.
 * 
 * À configurer plus tard avec JWT et les rôles.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Désactiver CSRF pour les tests
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()  // Permettre toutes les requêtes temporairement
            );
        
        return http.build();
    }
}
