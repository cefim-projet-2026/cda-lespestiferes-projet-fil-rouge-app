package fr.cefim.lespestiferes.gestionpedagogique.core.services;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Utilisateur;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.UtilisateurRepository;
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
        if (utilisateur.getDateCreation() == null) {
            utilisateur.setDateCreation(LocalDateTime.now());
        }
        return utilisateurRepository.save(utilisateur);
    }

    @Transactional(readOnly = true)
    public Optional<Utilisateur> getUtilisateurById(Integer id) {
        return utilisateurRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Utilisateur> getUtilisateurByEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }

    @Transactional(readOnly = true)
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @Transactional
    public void deleteUtilisateur(Integer id) {
        utilisateurRepository.deleteById(id);
    }
}
