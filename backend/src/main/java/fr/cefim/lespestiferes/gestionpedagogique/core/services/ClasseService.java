package fr.cefim.lespestiferes.gestionpedagogique.core.services;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Classe;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.ClasseRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClasseService {

    private final ClasseRepository classeRepository;

    @Transactional
    public Classe saveClasse(Classe classe) {
        if (classe.getDateCreation() == null) {
            classe.setDateCreation(LocalDateTime.now());
        }
        return classeRepository.save(classe);
    }

    @Transactional(readOnly = true)
    public Classe getClasseById(Integer id) {
        return classeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Classe introuvable avec l'id : " + id));
    }

    @Transactional(readOnly = true)
    public List<Classe> getAllClasses() {
        return classeRepository.findAll();
    }

    @Transactional
    public void deleteClasse(Integer id) {
        getClasseById(id);
        classeRepository.deleteById(id);
    }
}
