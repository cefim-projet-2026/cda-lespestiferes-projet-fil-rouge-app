package fr.cefim.lespestiferes.gestionpedagogique.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception levée quand une règle métier est violée.
 * Retourne automatiquement un HTTP 422 (Unprocessable Entity).
 * Exemple : RM-04 — un formateur ne peut pas être supprimé.
 */
@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class BusinessRuleException extends RuntimeException {

    public BusinessRuleException(String message) {
        super(message);
    }
}
