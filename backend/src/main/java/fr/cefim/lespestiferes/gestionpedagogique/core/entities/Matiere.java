package fr.cefim.lespestiferes.gestionpedagogique.core.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "matiere")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Matiere {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_matiere")
    private Integer idMatiere;

    @Column(name = "nom_matiere")
    private String nomMatiere;

    @Column(name = "credits_ects")
    private Integer creditsEcts;

    @Column(name = "date_creation", updatable = false)
    private LocalDateTime dateCreation;
}
