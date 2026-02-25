package fr.cefim.lespestiferes.gestionpedagogique.core.controllers;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Matiere;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.MatiereRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/matieres")
public class MatiereController {

    @Autowired
    private MatiereRepository matiereRepository;

    @GetMapping
    public List<Matiere> index() {
        return matiereRepository.findAll();
    }

    @GetMapping(value="{idMatiere}")
    public Optional<Matiere> getMatiereById(@PathVariable int idMatiere ) {
        return matiereRepository.findById(idMatiere);
    }
}
