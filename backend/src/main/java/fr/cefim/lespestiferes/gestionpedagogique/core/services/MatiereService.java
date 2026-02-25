package fr.cefim.lespestiferes.gestionpedagogique.core.services;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Matiere;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.MatiereRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatiereService {

    private final MatiereRepository matiereRepository;
    private final NoteService noteService;

    @Transactional
    public Matiere saveMatiere(Matiere matiere) {
        if (matiere.getDateCreation() == null) {
            matiere.setDateCreation(LocalDateTime.now());
        }
        return matiereRepository.save(matiere);
    }

    @Transactional(readOnly = true)
    public Matiere getMatiereById(Integer id) {
        return matiereRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Matière introuvable avec l'id : " + id));
    }

    @Transactional(readOnly = true)
    public List<Matiere> getAllMatieres() {
        return matiereRepository.findAll();
    }

    @Transactional(readOnly = true)
    public boolean ectsValides(Integer idEleve, Integer idMatiere) {
        // RM-02 : les ECTS sont validés si la moyenne de la matière est >= 10
        BigDecimal moyenne = noteService.calculerMoyenneMatiere(idEleve, idMatiere);
        return moyenne.compareTo(BigDecimal.TEN) >= 0;
    }

    @Transactional
    public void deleteMatiere(Integer id) {
        getMatiereById(id);
        matiereRepository.deleteById(id);
    }
}
