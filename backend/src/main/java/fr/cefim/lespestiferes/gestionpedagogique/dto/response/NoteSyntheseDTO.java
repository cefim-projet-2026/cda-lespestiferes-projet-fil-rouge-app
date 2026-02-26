package fr.cefim.lespestiferes.gestionpedagogique.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO pour afficher une synthèse des notes par matière.
 * Utile pour l'affichage du bulletin ou du tableau de bord.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteSyntheseDTO {

    private Integer idMatiere;
    private String nomMatiere;
    private Integer creditsEcts;
    
    private BigDecimal moyenneControleContinu;
    private BigDecimal moyennePartiel;
    private BigDecimal moyenneMatiere;
    
    private Integer nombreNotesCC;
    private Integer nombreNotesPartiel;
    
    private List<NoteResponseDTO> notes;
}
