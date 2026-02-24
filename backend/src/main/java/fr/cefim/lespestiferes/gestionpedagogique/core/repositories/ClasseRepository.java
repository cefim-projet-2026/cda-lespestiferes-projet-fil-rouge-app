package fr.cefim.lespestiferes.gestionpedagogique.core.repositories;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Classe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClasseRepository extends JpaRepository<Classe, Integer> {
}
