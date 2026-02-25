package fr.cefim.lespestiferes.gestionpedagogique.core.controllers;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Utilisateur;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/utilisateurs")
public class UtilisateurController {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @GetMapping("/all")
    public List<Utilisateur> tousLesUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @GetMapping
    public Optional<Utilisateur> utilisateurParMail(@RequestParam(name = "email") String email) {
        return utilisateurRepository.findByEmail(email);
    }

}
