package fr.cefim.lespestiferes.gestionpedagogique.core.controllers;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Evaluation;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.EvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/evaluations")
public class EvaluationCrontroller {

    @Autowired
    private EvaluationRepository evaluationRepository;

    @GetMapping
    public List<Evaluation> toutesLesEvaluations() {
        return evaluationRepository.findAll();
    }
}
