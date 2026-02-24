package fr.cefim.lespestiferes.gestionpedagogique.core.repositories;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.HistoriqueImport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoriqueImportRepository extends JpaRepository<HistoriqueImport, Integer> {
}
