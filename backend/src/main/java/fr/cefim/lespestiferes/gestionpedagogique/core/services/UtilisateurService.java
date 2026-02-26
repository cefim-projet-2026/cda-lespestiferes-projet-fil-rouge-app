package fr.cefim.lespestiferes.gestionpedagogique.core.services;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Utilisateur;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.RoleEnum;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.UtilisateurRepository;
import fr.cefim.lespestiferes.gestionpedagogique.dto.request.UtilisateurRequestDTO;
import fr.cefim.lespestiferes.gestionpedagogique.exception.BusinessRuleException;
import fr.cefim.lespestiferes.gestionpedagogique.exception.DuplicateResourceException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    @Transactional
    public Utilisateur saveUtilisateur(Utilisateur utilisateur) {
        Optional<Utilisateur> existant = utilisateurRepository.findByEmail(utilisateur.getEmail());
        if (existant.isPresent() && !existant.get().getIdUtilisateur().equals(utilisateur.getIdUtilisateur())) {
            throw new DuplicateResourceException("Cet email est déjà utilisé par un autre compte.");
        }
        if (utilisateur.getDateCreation() == null) {
            utilisateur.setDateCreation(LocalDateTime.now());
        }
        return utilisateurRepository.save(utilisateur);
    }

    @Transactional(readOnly = true)
    public Utilisateur getUtilisateurById(Integer id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur introuvable avec l'id : " + id));
    }

    @Transactional(readOnly = true)
    public Utilisateur getUtilisateurByEmail(String email) {
        return utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur introuvable avec l'email : " + email));
    }

    @Transactional(readOnly = true)
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    /**
     * US-06 : Filtre les utilisateurs par rôle.
     */
    @Transactional(readOnly = true)
    public List<Utilisateur> getUtilisateursByRole(RoleEnum role) {
        return utilisateurRepository.findByRole(role);
    }

    /**
     * US-06 : Récupère uniquement les utilisateurs actifs.
     */
    @Transactional(readOnly = true)
    public List<Utilisateur> getUtilisateursActifs() {
        return utilisateurRepository.findByEstActif(true);
    }

    /**
     * US-06 : Met à jour un utilisateur existant à partir d'un DTO.
     * Vérifie l'unicité de l'email avant la mise à jour.
     */
    @Transactional
    public Utilisateur updateUtilisateur(Integer id, UtilisateurRequestDTO dto) {
        Utilisateur utilisateur = getUtilisateurById(id);

        // Vérification unicité email (si changé)
        if (!utilisateur.getEmail().equals(dto.getEmail())) {
            Optional<Utilisateur> existant = utilisateurRepository.findByEmail(dto.getEmail());
            if (existant.isPresent()) {
                throw new DuplicateResourceException("Cet email est déjà utilisé par un autre compte.");
            }
        }

        utilisateur.setNom(dto.getNom());
        utilisateur.setPrenom(dto.getPrenom());
        utilisateur.setEmail(dto.getEmail());
        utilisateur.setMotDePasse(dto.getMotDePasse());
        utilisateur.setRole(dto.getRole());
        utilisateur.setStatutEleve(dto.getStatutEleve());
        if (dto.getEstActif() != null) {
            utilisateur.setEstActif(dto.getEstActif());
        }

        return utilisateurRepository.save(utilisateur);
    }

    @Transactional
    public void deleteUtilisateur(Integer id) {
        Utilisateur utilisateur = getUtilisateurById(id);
        // RM-04 : un formateur ne peut pas être supprimé, seulement désactivé
        if (utilisateur.getRole() == RoleEnum.FORMATEUR) {
            throw new BusinessRuleException("Un formateur ne peut pas être supprimé. Désactivez-le à la place.");
        }
        utilisateurRepository.deleteById(id);
    }

    @Transactional
    public Utilisateur desactiverUtilisateur(Integer id) {
        Utilisateur utilisateur = getUtilisateurById(id);
        utilisateur.setEstActif(false);
        return utilisateurRepository.save(utilisateur);
    }
}
