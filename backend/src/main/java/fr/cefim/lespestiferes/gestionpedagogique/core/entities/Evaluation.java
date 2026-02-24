package fr.cefim.lespestiferes.gestionpedagogique.core.entities;

import fr.cefim.lespestiferes.gestionpedagogique.core.enums.TypeEvalEnum;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.CatEvalEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "evaluation")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evaluation")
    private Integer idEvaluation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_matiere", nullable = false)
    private Matiere matiere;

    @Column(name = "date_evaluation")
    private LocalDate dateEvaluation;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_evaluation")
    private TypeEvalEnum typeEvaluation;

    @Enumerated(EnumType.STRING)
    @Column(name = "categorie")
    private CatEvalEnum categorie;

    @Column(name = "coefficient")
    private Float coefficient;

    @Column(name = "semestre_trimestre")
    private String semestreTrimestre;

    @Column(name = "date_creation", updatable = false)
    private LocalDateTime dateCreation;
}
