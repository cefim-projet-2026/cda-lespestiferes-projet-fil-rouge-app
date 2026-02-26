package fr.cefim.lespestiferes.gestionpedagogique.dto.request;

import fr.cefim.lespestiferes.gestionpedagogique.core.enums.RoleEnum;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.StatutEleveEnum;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO d'entrée pour la création/modification d'un utilisateur.
 * Validation Jakarta appliquée via @Valid dans le controller.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UtilisateurRequestDTO {

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    private String prenom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit être valide")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    private String motDePasse;

    @NotNull(message = "Le rôle est obligatoire")
    private RoleEnum role;

    private StatutEleveEnum statutEleve;

    @Builder.Default
    private Boolean estActif = true;
}
