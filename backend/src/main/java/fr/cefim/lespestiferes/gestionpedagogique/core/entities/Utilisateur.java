package fr.cefim.lespestiferes.gestionpedagogique.core.entities;

import fr.cefim.lespestiferes.gestionpedagogique.core.enums.RoleEnum;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.StatutEleveEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "utilisateur")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_utilisateur")
    private Integer idUtilisateur;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "email")
    private String email;

    @Column(name = "mot_de_passe")
    private String motDePasse;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private RoleEnum role;

    @Column(name = "est_actif")
    private Boolean estActif;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut_eleve")
    private StatutEleveEnum statutEleve;

    @Column(name = "moyenne_generale", precision = 5, scale = 2)
    private BigDecimal moyenneGenerale;

    @Column(name = "date_creation", updatable = false)
    private LocalDateTime dateCreation;

    // Table de liaison Intervenir
    @ManyToMany
    @JoinTable(name = "intervenir", joinColumns = @JoinColumn(name = "id_formateur"), inverseJoinColumns = @JoinColumn(name = "id_classe"))
    private Set<Classe> classesIntervention = new HashSet<>();

    // Table de liaison Enseigner
    @ManyToMany
    @JoinTable(name = "enseigner", joinColumns = @JoinColumn(name = "id_formateur"), inverseJoinColumns = @JoinColumn(name = "id_matiere"))
    private Set<Matiere> matieresEnseignees = new HashSet<>();
}
