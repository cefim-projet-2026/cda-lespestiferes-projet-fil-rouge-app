package fr.cefim.lespestiferes.gestionpedagogique.core.repositories;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Note;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.CatEvalEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {

    List<Note> findByEleveIdUtilisateur(Integer idEleve);

    @Query("SELECT n FROM Note n WHERE n.eleve.idUtilisateur = :idEleve AND n.evaluation.matiere.idMatiere = :idMatiere AND n.evaluation.categorie = :categorie")
    List<Note> findByEleveAndMatiereAndCategorie(
            @Param("idEleve") Integer idEleve,
            @Param("idMatiere") Integer idMatiere,
            @Param("categorie") CatEvalEnum categorie);

    @Query("SELECT n FROM Note n WHERE n.eleve.idUtilisateur = :idEleve AND n.evaluation.matiere.idMatiere = :idMatiere")
    List<Note> findByEleveAndMatiere(
            @Param("idEleve") Integer idEleve,
            @Param("idMatiere") Integer idMatiere);
}
