package fr.cefim.lespestiferes.gestionpedagogique.core.entities;

import fr.cefim.lespestiferes.gestionpedagogique.core.enums.StatutPresenceEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "note")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_note")
    private Integer idNote;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_evaluation", nullable = false)
    private Evaluation evaluation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_eleve", nullable = false)
    private Utilisateur eleve;

    @Column(name = "valeur_note", precision = 5, scale = 2)
    private BigDecimal valeurNote;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut_presence")
    private StatutPresenceEnum statutPresence;

    @Column(name = "commentaire", columnDefinition = "TEXT")
    private String commentaire;

    @Column(name = "date_saisie")
    private LocalDateTime dateSaisie;
}
