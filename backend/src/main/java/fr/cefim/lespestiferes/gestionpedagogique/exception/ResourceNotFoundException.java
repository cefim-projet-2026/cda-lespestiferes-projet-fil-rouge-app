package fr.cefim.lespestiferes.gestionpedagogique.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception levée quand une entité demandée n'existe pas en base.
 * Retourne automatiquement un HTTP 404.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resource, Integer id) {
        super(resource + " introuvable avec l'id : " + id);
    }
}
