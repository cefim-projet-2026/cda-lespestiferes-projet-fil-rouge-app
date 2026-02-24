package fr.cefim.lespestiferes.gestionpedagogique.core.services;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Matiere;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.MatiereRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatiereService {

    private final MatiereRepository matiereRepository;

    @Transactional
    public Matiere saveMatiere(Matiere matiere) {
        if (matiere.getDateCreation() == null) {
            matiere.setDateCreation(LocalDateTime.now());
        }
        return matiereRepository.save(matiere);
    }

    @Transactional(readOnly = true)
    public Optional<Matiere> getMatiereById(Integer id) {
        return matiereRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Matiere> getAllMatieres() {
        return matiereRepository.findAll();
    }

    @Transactional
    public void deleteMatiere(Integer id) {
        matiereRepository.deleteById(id);
    }
}
