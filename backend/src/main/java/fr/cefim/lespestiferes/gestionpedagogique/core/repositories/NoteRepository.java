package fr.cefim.lespestiferes.gestionpedagogique.core.repositories;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Note;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.CatEvalEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour l'entité Note.
 * Utilise des requêtes JPQL et natives pour exploiter les jointures SQL.
 */
@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {

    /**
     * Récupère toutes les notes d'un élève.
     */
    List<Note> findByEleveIdUtilisateur(Integer idEleve);

    /**
     * Récupère les notes d'un élève pour une matière et une catégorie spécifiques.
     * Utilise JPQL avec jointures implicites.
     */
    @Query("SELECT n FROM Note n WHERE n.eleve.idUtilisateur = :idEleve AND n.evaluation.matiere.idMatiere = :idMatiere AND n.evaluation.categorie = :categorie")
    List<Note> findByEleveAndMatiereAndCategorie(
            @Param("idEleve") Integer idEleve,
            @Param("idMatiere") Integer idMatiere,
            @Param("categorie") CatEvalEnum categorie);

    /**
     * Récupère toutes les notes d'un élève pour une matière.
     */
    @Query("SELECT n FROM Note n WHERE n.eleve.idUtilisateur = :idEleve AND n.evaluation.matiere.idMatiere = :idMatiere")
    List<Note> findByEleveAndMatiere(
            @Param("idEleve") Integer idEleve,
            @Param("idMatiere") Integer idMatiere);

    /**
     * Récupère toutes les notes d'une évaluation spécifique avec les informations de l'élève.
     * Requête native SQL avec jointures explicites pour optimisation.
     */
    @Query(value = """
            SELECT n.* 
            FROM note n
            INNER JOIN utilisateur u ON n.id_eleve = u.id_utilisateur
            INNER JOIN evaluation e ON n.id_evaluation = e.id_evaluation
            WHERE n.id_evaluation = :idEvaluation
            ORDER BY u.nom, u.prenom
            """, nativeQuery = true)
    List<Note> findByEvaluationWithDetails(@Param("idEvaluation") Integer idEvaluation);

    /**
     * Récupère toutes les notes d'une matière avec jointures.
     * Requête native pour utiliser les capacités SQL de PostgreSQL.
     */
    @Query(value = """
            SELECT n.* 
            FROM note n
            INNER JOIN evaluation e ON n.id_evaluation = e.id_evaluation
            INNER JOIN matiere m ON e.id_matiere = m.id_matiere
            WHERE m.id_matiere = :idMatiere
            ORDER BY n.date_saisie DESC
            """, nativeQuery = true)
    List<Note> findByMatiereNative(@Param("idMatiere") Integer idMatiere);

    /**
     * Récupère les notes d'un formateur (via les matières qu'il enseigne).
     * Requête native avec jointures multiples.
     */
    @Query(value = """
            SELECT DISTINCT n.* 
            FROM note n
            INNER JOIN evaluation e ON n.id_evaluation = e.id_evaluation
            INNER JOIN matiere m ON e.id_matiere = m.id_matiere
            INNER JOIN enseigner ens ON m.id_matiere = ens.id_matiere
            WHERE ens.id_formateur = :idFormateur
            ORDER BY n.date_saisie DESC
            """, nativeQuery = true)
    List<Note> findByFormateurNative(@Param("idFormateur") Integer idFormateur);

    /**
     * Vérifie si une note existe déjà pour un élève et une évaluation.
     * Utile pour éviter les doublons.
     */
    @Query("SELECT COUNT(n) > 0 FROM Note n WHERE n.eleve.idUtilisateur = :idEleve AND n.evaluation.idEvaluation = :idEvaluation")
    boolean existsByEleveAndEvaluation(
            @Param("idEleve") Integer idEleve,
            @Param("idEvaluation") Integer idEvaluation);

    /**
     * Récupère les notes d'un élève avec détails de l'évaluation et de la matière.
     * Requête JPQL avec FETCH JOIN pour optimiser les chargements.
     */
    @Query("SELECT n FROM Note n " +
           "JOIN FETCH n.evaluation e " +
           "JOIN FETCH e.matiere m " +
           "JOIN FETCH n.eleve u " +
           "WHERE u.idUtilisateur = :idEleve " +
           "ORDER BY e.dateEvaluation DESC")
    List<Note> findByEleveWithDetails(@Param("idEleve") Integer idEleve);
}
