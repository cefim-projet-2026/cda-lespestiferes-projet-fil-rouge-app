package fr.cefim.lespestiferes.gestionpedagogique.core.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "classe")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Classe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_classe")
    private Integer idClasse;

    @Column(name = "nom_filiere")
    private String nomFiliere;

    @Column(name = "nom_promotion")
    private String nomPromotion;

    @Column(name = "nom_classe")
    private String nomClasse;

    @Column(name = "annee_scolaire")
    private Integer anneeScolaire;

    @Column(name = "moyenne_classe", precision = 5, scale = 2)
    private BigDecimal moyenneClasse;

    @Column(name = "date_creation", updatable = false)
    private LocalDateTime dateCreation;
}
