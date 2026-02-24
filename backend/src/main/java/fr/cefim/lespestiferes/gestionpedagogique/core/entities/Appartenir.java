package fr.cefim.lespestiferes.gestionpedagogique.core.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "appartenir")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appartenir {

    @EmbeddedId
    private AppartenirId id = new AppartenirId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idEleve")
    @JoinColumn(name = "id_eleve")
    private Utilisateur eleve;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idClasse")
    @JoinColumn(name = "id_classe")
    private Classe classe;

    @Column(name = "date_inscription")
    private LocalDateTime dateInscription;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AppartenirId implements Serializable {
        private Integer idEleve;
        private Integer idClasse;
    }
}
