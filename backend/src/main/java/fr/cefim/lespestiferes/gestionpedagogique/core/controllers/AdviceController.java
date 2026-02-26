package fr.cefim.lespestiferes.gestionpedagogique.core.controllers;

import fr.cefim.lespestiferes.gestionpedagogique.exception.BusinessRuleException;
import fr.cefim.lespestiferes.gestionpedagogique.exception.DuplicateResourceException;
import fr.cefim.lespestiferes.gestionpedagogique.exception.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Gestionnaire global d'exceptions.
 * Retourne des réponses JSON structurées avec timestamp, status et message.
 */
@ControllerAdvice
public class AdviceController {

    // ========================
    // 400 — Erreurs de validation
    // ========================

    /**
     * Gère les erreurs de validation Jakarta (@Valid).
     * Retourne la liste des champs en erreur.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> erreurs = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(error -> erreurs.put(error.getField(), error.getDefaultMessage()));

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("erreur", "Erreurs de validation");
        body.put("details", erreurs);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    // ========================
    // 404 — Ressource non trouvée
    // ========================

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleResourceNotFound(ResourceNotFoundException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleEntityNotFound(EntityNotFoundException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // ========================
    // 409 — Conflit (doublon)
    // ========================

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateResource(DuplicateResourceException ex) {
        return buildErrorResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    // ========================
    // 422 — Règle métier violée
    // ========================

    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<Map<String, Object>> handleBusinessRule(BusinessRuleException ex) {
        return buildErrorResponse(HttpStatus.valueOf(422), ex.getMessage());
    }

    // ========================
    // Utilitaire
    // ========================

    private ResponseEntity<Map<String, Object>> buildErrorResponse(HttpStatus status, String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", status.value());
        body.put("erreur", status.getReasonPhrase());
        body.put("message", message);
        return ResponseEntity.status(status).body(body);
    }
}
