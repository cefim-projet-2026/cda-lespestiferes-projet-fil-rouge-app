package fr.cefim.lespestiferes.gestionpedagogique.core.services;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Utilisateur;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.RoleEnum;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.UtilisateurRepository;
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
