package fr.cefim.lespestiferes.gestionpedagogique.core.controllers;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Matiere;
import fr.cefim.lespestiferes.gestionpedagogique.core.services.MatiereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/matieres")
public class MatiereController {

    @Autowired
    private MatiereService matiereService;

    @GetMapping
    public List<Matiere> index() {
        return matiereService.getAllMatieres();
    }

    @GetMapping(value = {"/{idMatiere}"})
    public Matiere getMatiereById(@PathVariable Integer idMatiere) {
        return matiereService.getMatiereById(idMatiere);
    }

    @PostMapping(value = {"/creer"})
    // @PreAuthorize("hasRole('RP')")
    public String createMatiere(@RequestBody Matiere matiere) {
        matiereService.saveMatiere(matiere);
        return "Matière créée avec succès";
    }

    @PutMapping(value = "/modifier/{idMatiere}")
    // @PreAuthorize("hasRole('RP')")
    public String updateMatiere(@PathVariable Integer idMatiere) {
        Matiere matiereExistante = matiereService.getMatiereById(idMatiere);
        //modifications
        matiereService.saveMatiere(matiereExistante);
        return "Matière modifiée avec succès";
    }

    @DeleteMapping(value = "/supprimer/{idMatiere}")
    // @PreAuthorize("hasRole('RP')")
    public String deleteMatiere(@PathVariable Integer idMatiere) {
        matiereService.deleteMatiere(idMatiere);
        return "Matière supprimée avec succès";
    }
}
