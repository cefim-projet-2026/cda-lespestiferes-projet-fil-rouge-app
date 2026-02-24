package fr.cefim.lespestiferes.gestionpedagogique.core.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "historique_import")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoriqueImport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_import")
    private Integer idImport;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_responsable", nullable = false)
    private Utilisateur responsable;

    @Column(name = "nom_fichier")
    private String nomFichier;

    @Column(name = "type_import")
    private String typeImport;

    @Column(name = "nb_lignes_total")
    private Integer nbLignesTotal;

    @Column(name = "nb_lignes_succes")
    private Integer nbLignesSucces;

    @Column(name = "nb_lignes_erreur")
    private Integer nbLignesErreur;

    @Column(name = "rapport_erreurs", columnDefinition = "jsonb")
    private String rapportErreurs;

    @Column(name = "date_import")
    private LocalDateTime dateImport;
}
