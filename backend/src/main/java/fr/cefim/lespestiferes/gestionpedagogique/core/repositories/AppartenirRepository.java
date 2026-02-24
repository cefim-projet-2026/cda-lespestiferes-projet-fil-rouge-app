package fr.cefim.lespestiferes.gestionpedagogique.core.repositories;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Appartenir;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppartenirRepository extends JpaRepository<Appartenir, Appartenir.AppartenirId> {
}
