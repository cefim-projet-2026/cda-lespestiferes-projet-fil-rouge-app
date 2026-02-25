package fr.cefim.lespestiferes.gestionpedagogique.core.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HomeController {

    @GetMapping
    public String index() {
        System.out.println("/ : Home page");
        return "Accueil";
    }


}
