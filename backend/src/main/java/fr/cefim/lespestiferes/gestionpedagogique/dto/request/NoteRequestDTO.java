package fr.cefim.lespestiferes.gestionpedagogique.dto.request;

import fr.cefim.lespestiferes.gestionpedagogique.core.enums.StatutPresenceEnum;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO d'entrée pour la création/modification d'une note.
 * Formateur - Saisir et consulter les notes.
 * Validation Jakarta appliquée via @Valid dans le controller.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteRequestDTO {

    @NotNull(message = "L'ID de l'évaluation est obligatoire")
    private Integer idEvaluation;

    @NotNull(message = "L'ID de l'élève est obligatoire")
    private Integer idEleve;

    @DecimalMin(value = "0.00", message = "La note ne peut pas être négative")
    @DecimalMax(value = "20.00", message = "La note ne peut pas dépasser 20")
    private BigDecimal valeurNote;

    @NotNull(message = "Le statut de présence est obligatoire")
    private StatutPresenceEnum statutPresence;

    private String commentaire;
}
