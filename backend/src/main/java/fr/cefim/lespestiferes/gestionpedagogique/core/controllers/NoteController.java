package fr.cefim.lespestiferes.gestionpedagogique.core.controllers;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Note;
import fr.cefim.lespestiferes.gestionpedagogique.core.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public List<Note> index() {
        return noteService.getAllNotes();
    }

    @GetMapping (value = {"/{IdEleve}"})
    public List<Note> getNotesParEleve(@PathVariable Integer IdEleve) {
        return noteService.getNotesByEleve(IdEleve);
    }

    @PostMapping(value = {"/creer"})
    // @PreAuthorize("hasRole('FORMATEUR') or hasRole('RP')")
    public String createNote(@RequestBody Note note) {
        noteService.saveNote(note);
        return "Note créée avec succès";
    }

    @PutMapping(value = "/modifier/{idNote}")
    // @PreAuthorize("hasRole('FORMATEUR') or hasRole('RP')")
    public String updateNote(@PathVariable Integer idNote) {
        Note noteExistante = noteService.getNoteById(idNote);
        //modifications
        noteService.saveNote(noteExistante);
        return "Note modifiée avec succès";
    }

    @DeleteMapping(value = "/supprimer/{idNote}")
    // @PreAuthorize("hasRole('FORMATEUR') or hasRole('RP')")
    public String deleteNote(@PathVariable Integer idNote) {
        noteService.deleteNote(idNote);
        return "Note supprimée avec succès";
    }
}
