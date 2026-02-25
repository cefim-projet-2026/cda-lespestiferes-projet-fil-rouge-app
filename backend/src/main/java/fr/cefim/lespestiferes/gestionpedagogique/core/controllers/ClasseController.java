package fr.cefim.lespestiferes.gestionpedagogique.core.controllers;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Classe;
import fr.cefim.lespestiferes.gestionpedagogique.core.services.ClasseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(value = {"/{idClasse}"})
    public Classe getMatiereById(@PathVariable Integer idClasse) {
        return classeService.getClasseById(idClasse);
    }

    @PostMapping(value = {"/creer"})
    // @PreAuthorize("hasRole('RP')")
    public String creerClasse(@RequestBody Classe classe) {
        classeService.saveClasse(classe);
        return "Classe créée avec succès";
    }

    @PutMapping(value = {"/modifier/{idClasse}"})
    // @PreAuthorize("hasRole('RP')")
    public String modifierClasse(@PathVariable Integer idClasse) {
        Classe classeExistante = classeService.getClasseById(idClasse);
        //modifications
        classeService.saveClasse(classeExistante);
        return "Classe modifiée avec succès";

    }

    @DeleteMapping(value = {"/supprimer/{idClasse}"})
    // @PreAuthorize("hasRole('RP')")
    public String supprimerClasse(@PathVariable Integer idClasse) {
        classeService.deleteClasse(idClasse);
        return "Classe supprimée avec succès";
    }
}
