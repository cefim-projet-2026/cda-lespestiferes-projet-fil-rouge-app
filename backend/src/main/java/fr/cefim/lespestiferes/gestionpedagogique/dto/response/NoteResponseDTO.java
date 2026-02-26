package fr.cefim.lespestiferes.gestionpedagogique.dto.response;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Note;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.StatutPresenceEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO de sortie pour une note.
 * Inclut les informations de l'évaluation et de l'élève pour faciliter l'affichage.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteResponseDTO {

    private Integer idNote;
    private BigDecimal valeurNote;
    private StatutPresenceEnum statutPresence;
    private String commentaire;
    private LocalDateTime dateSaisie;

    // Informations de l'évaluation
    private Integer idEvaluation;
    private String nomMatiere;
    private String typeEvaluation;
    private String categorieEvaluation;

    // Informations de l'élève
    private Integer idEleve;
    private String nomEleve;
    private String prenomEleve;

    /**
     * Convertit une entité Note en DTO de réponse.
     * Inclut les informations liées (évaluation, matière, élève).
     */
    public static NoteResponseDTO fromEntity(Note note) {
        return NoteResponseDTO.builder()
                .idNote(note.getIdNote())
                .valeurNote(note.getValeurNote())
                .statutPresence(note.getStatutPresence())
                .commentaire(note.getCommentaire())
                .dateSaisie(note.getDateSaisie())
                .idEvaluation(note.getEvaluation() != null ? note.getEvaluation().getIdEvaluation() : null)
                .nomMatiere(note.getEvaluation() != null && note.getEvaluation().getMatiere() != null 
                        ? note.getEvaluation().getMatiere().getNomMatiere() : null)
                .typeEvaluation(note.getEvaluation() != null && note.getEvaluation().getTypeEvaluation() != null
                        ? note.getEvaluation().getTypeEvaluation().name() : null)
                .categorieEvaluation(note.getEvaluation() != null && note.getEvaluation().getCategorie() != null
                        ? note.getEvaluation().getCategorie().name() : null)
                .idEleve(note.getEleve() != null ? note.getEleve().getIdUtilisateur() : null)
                .nomEleve(note.getEleve() != null ? note.getEleve().getNom() : null)
                .prenomEleve(note.getEleve() != null ? note.getEleve().getPrenom() : null)
                .build();
    }
}
