package fr.cefim.lespestiferes.gestionpedagogique.dto.response;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Utilisateur;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.RoleEnum;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.StatutEleveEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO de sortie pour un utilisateur.
 * Ne contient PAS le mot de passe (sécurité).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UtilisateurResponseDTO {

    private Integer idUtilisateur;
    private String nom;
    private String prenom;
    private String email;
    private RoleEnum role;
    private Boolean estActif;
    private StatutEleveEnum statutEleve;
    private BigDecimal moyenneGenerale;
    private LocalDateTime dateCreation;

    /**
     * Convertit une entité Utilisateur en DTO de réponse.
     * Exclut le mot de passe pour des raisons de sécurité.
     */
    public static UtilisateurResponseDTO fromEntity(Utilisateur utilisateur) {
        return UtilisateurResponseDTO.builder()
                .idUtilisateur(utilisateur.getIdUtilisateur())
                .nom(utilisateur.getNom())
                .prenom(utilisateur.getPrenom())
                .email(utilisateur.getEmail())
                .role(utilisateur.getRole())
                .estActif(utilisateur.getEstActif())
                .statutEleve(utilisateur.getStatutEleve())
                .moyenneGenerale(utilisateur.getMoyenneGenerale())
                .dateCreation(utilisateur.getDateCreation())
                .build();
    }
}
