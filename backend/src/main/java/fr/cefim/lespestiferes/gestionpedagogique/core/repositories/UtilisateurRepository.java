package fr.cefim.lespestiferes.gestionpedagogique.core.repositories;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Utilisateur;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {

    // Requête utile pour la connexion utilisateur et la vérification d'unicité
    // (RM-05)
    Optional<Utilisateur> findByEmail(String email);

    // US-06 : filtrage par rôle (RP, Formateur, Eleve)
    List<Utilisateur> findByRole(RoleEnum role);

    // US-06 : filtrage par statut actif/inactif
    List<Utilisateur> findByEstActif(Boolean estActif);
}
