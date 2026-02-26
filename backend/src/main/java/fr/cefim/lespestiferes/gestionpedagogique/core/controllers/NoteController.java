package fr.cefim.lespestiferes.gestionpedagogique.core.controllers;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Note;
import fr.cefim.lespestiferes.gestionpedagogique.core.services.NoteService;
import fr.cefim.lespestiferes.gestionpedagogique.dto.request.NoteRequestDTO;
import fr.cefim.lespestiferes.gestionpedagogique.dto.response.NoteResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour la gestion des notes.
 * Formateur - Saisir et consulter les notes.
 *
 * Note : @PreAuthorize commenté en attendant l'implémentation de JWT.
 */
@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    // ========================
    // GET — Lecture
    // ========================

    /**
     * Liste toutes les notes.
     * 
     * @return liste de NoteResponseDTO
     */
    @GetMapping
    // @PreAuthorize("hasRole('FORMATEUR') or hasRole('RP')")
    public ResponseEntity<List<NoteResponseDTO>> getAllNotes() {
        List<NoteResponseDTO> notes = noteService.getAllNotes()
                .stream()
                .map(NoteResponseDTO::fromEntity)
                .toList();
        return ResponseEntity.ok(notes);
    }

    /**
     * Récupère une note par son ID.
     * 
     * @param id identifiant de la note
     * @return NoteResponseDTO ou 404
     */
    @GetMapping("/{id}")
    // @PreAuthorize("hasRole('FORMATEUR') or hasRole('RP')")
    public ResponseEntity<NoteResponseDTO> getNoteById(@PathVariable Integer id) {
        Note note = noteService.getNoteById(id);
        return ResponseEntity.ok(NoteResponseDTO.fromEntity(note));
    }

    /**
     * Récupère toutes les notes d'un élève.
     * Exemple : GET /api/notes/eleve/5
     * 
     * @param idEleve identifiant de l'élève
     * @return liste des notes de l'élève
     */
    @GetMapping("/eleve/{idEleve}")
    // @PreAuthorize("hasRole('FORMATEUR') or hasRole('RP') or hasRole('ELEVE')")
    public ResponseEntity<List<NoteResponseDTO>> getNotesByEleve(@PathVariable Integer idEleve) {
        List<NoteResponseDTO> notes = noteService.getNotesByEleveWithDetails(idEleve)
                .stream()
                .map(NoteResponseDTO::fromEntity)
                .toList();
        return ResponseEntity.ok(notes);
    }

    /**
     * Récupère toutes les notes d'une évaluation spécifique.
     * Utile pour le formateur qui veut voir toutes les notes d'un contrôle.
     * Exemple : GET /api/notes/evaluation/12
     * 
     * @param idEvaluation identifiant de l'évaluation
     * @return liste des notes de l'évaluation
     */
    @GetMapping("/evaluation/{idEvaluation}")
    // @PreAuthorize("hasRole('FORMATEUR') or hasRole('RP')")
    public ResponseEntity<List<NoteResponseDTO>> getNotesByEvaluation(@PathVariable Integer idEvaluation) {
        List<NoteResponseDTO> notes = noteService.getNotesByEvaluation(idEvaluation)
                .stream()
                .map(NoteResponseDTO::fromEntity)
                .toList();
        return ResponseEntity.ok(notes);
    }

    /**
     * Récupère toutes les notes d'une matière.
     * Exemple : GET /api/notes/matiere/3
     * 
     * @param idMatiere identifiant de la matière
     * @return liste des notes de la matière
     */
    @GetMapping("/matiere/{idMatiere}")
    // @PreAuthorize("hasRole('FORMATEUR') or hasRole('RP')")
    public ResponseEntity<List<NoteResponseDTO>> getNotesByMatiere(@PathVariable Integer idMatiere) {
        List<NoteResponseDTO> notes = noteService.getNotesByMatiere(idMatiere)
                .stream()
                .map(NoteResponseDTO::fromEntity)
                .toList();
        return ResponseEntity.ok(notes);
    }

    /**
     * Récupère toutes les notes saisies par un formateur (via les matières qu'il enseigne).
     * Exemple : GET /api/notes/formateur/7
     * 
     * @param idFormateur identifiant du formateur
     * @return liste des notes du formateur
     */
    @GetMapping("/formateur/{idFormateur}")
    // @PreAuthorize("hasRole('FORMATEUR') or hasRole('RP')")
    public ResponseEntity<List<NoteResponseDTO>> getNotesByFormateur(@PathVariable Integer idFormateur) {
        List<NoteResponseDTO> notes = noteService.getNotesByFormateur(idFormateur)
                .stream()
                .map(NoteResponseDTO::fromEntity)
                .toList();
        return ResponseEntity.ok(notes);
    }

    // ========================
    // POST — Création
    // ========================

    /**
     * Crée une nouvelle note.
     * RM-03 : les absences (justifiées ou non) sont automatiquement notées 0.
     * 
     * @param dto données validées de la note
     * @return NoteResponseDTO avec HTTP 201
     */
    @PostMapping
    // @PreAuthorize("hasRole('FORMATEUR') or hasRole('RP')")
    public ResponseEntity<NoteResponseDTO> createNote(@Valid @RequestBody NoteRequestDTO dto) {
        Note note = noteService.createNote(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(NoteResponseDTO.fromEntity(note));
    }

    // ========================
    // PUT — Modification
    // ========================

    /**
     * Met à jour une note existante.
     * 
     * @param id  identifiant de la note à modifier
     * @param dto nouvelles données validées
     * @return NoteResponseDTO mis à jour
     */
    @PutMapping("/{id}")
    // @PreAuthorize("hasRole('FORMATEUR') or hasRole('RP')")
    public ResponseEntity<NoteResponseDTO> updateNote(
            @PathVariable Integer id,
            @Valid @RequestBody NoteRequestDTO dto) {
        Note updated = noteService.updateNote(id, dto);
        return ResponseEntity.ok(NoteResponseDTO.fromEntity(updated));
    }

    // ========================
    // DELETE — Suppression
    // ========================

    /**
     * Supprime une note.
     * 
     * @param id identifiant de la note
     * @return HTTP 204 No Content
     */
    @DeleteMapping("/{id}")
    // @PreAuthorize("hasRole('FORMATEUR') or hasRole('RP')")
    public ResponseEntity<Void> deleteNote(@PathVariable Integer id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}
