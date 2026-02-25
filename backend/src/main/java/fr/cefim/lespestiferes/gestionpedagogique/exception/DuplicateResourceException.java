package fr.cefim.lespestiferes.gestionpedagogique.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception levée quand une ressource en doublon est détectée.
 * Retourne automatiquement un HTTP 409 (Conflict).
 * Exemple : RM-05 — email unique par utilisateur.
 */
@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}
