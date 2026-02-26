package fr.cefim.lespestiferes.gestionpedagogique.core.controllers;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Utilisateur;
import fr.cefim.lespestiferes.gestionpedagogique.core.services.NoteService;
import fr.cefim.lespestiferes.gestionpedagogique.core.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/utilisateurs")
public class UtilisateurController {
    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private NoteService noteService;

    @GetMapping(value = {"/{Id}"})
    public Utilisateur utilisateurParMail(@PathVariable() Integer Id) {
        return utilisateurService.getUtilisateurById(Id);
    }

    @GetMapping(value = {"/{Id}/notes"})
    public String notesUtilisateur(Model model, @PathVariable() Integer Id) {
        model.addAttribute("notes", noteService.getNotesByEleve(Id));
        model.addAttribute("matieres", noteService.getMatieresByEleves(Id));
        return "Notes de l'élève avec ses matières ";
    }

    @PostMapping(value = {"/creer"})
    // @PreAuthorize("hasRole('RP')")
    public String createUtilisateur(@RequestBody Utilisateur utilisateur) {
        utilisateurService.saveUtilisateur(utilisateur);
        return "Utilisateur créé avec succès";
    }

    @PutMapping(value = "/modifier/{idUtilisateur}")
    // @PreAuthorize("hasRole('RP')")
    public String updateUtilisateur(@PathVariable Integer idUtilisateur) {
        Utilisateur utilisateurExistante = utilisateurService.getUtilisateurById(idUtilisateur);
        //modifications
        utilisateurService.saveUtilisateur(utilisateurExistante);
        return "Utilisateur modifié avec succès";
    }

    @DeleteMapping(value = "/supprimer/{idUtilisateur}")
    // @PreAuthorize("hasRole('RP')")
    public String deleteUtilisateur(@PathVariable Integer idUtilisateur) {
        utilisateurService.deleteUtilisateur(idUtilisateur);
        return "Utilisateur supprimé avec succès";
    }

}
