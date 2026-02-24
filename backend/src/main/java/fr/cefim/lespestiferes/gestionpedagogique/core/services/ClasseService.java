package fr.cefim.lespestiferes.gestionpedagogique.core.services;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Classe;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.ClasseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
    public Optional<Classe> getClasseById(Integer id) {
        return classeRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Classe> getAllClasses() {
        return classeRepository.findAll();
    }

    @Transactional
    public void deleteClasse(Integer id) {
        classeRepository.deleteById(id);
    }
}
