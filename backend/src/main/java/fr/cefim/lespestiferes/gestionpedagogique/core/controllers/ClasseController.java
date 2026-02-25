package fr.cefim.lespestiferes.gestionpedagogique.core.controllers;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Classe;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.ClasseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/classes")
public class ClasseController {

    @Autowired
    private ClasseRepository classeRepository;

    @RequestMapping
    public List<Classe> toutesLesClassesRest() {
        return classeRepository.findAll();
    }
}
