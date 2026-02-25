package fr.cefim.lespestiferes.gestionpedagogique.core.controllers;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Classe;
import fr.cefim.lespestiferes.gestionpedagogique.core.services.ClasseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/classes")
public class ClasseController {

    @Autowired
    private ClasseService classeService;

    @RequestMapping
    public List<Classe> toutesLesClasses() {
        return classeService.getAllClasses();
    }

    @GetMapping(value={"/{idClasse}"})
    public Classe getMatiereById(@PathVariable Integer idClasse ) {
        return classeService.getClasseById(idClasse);
    }
}
