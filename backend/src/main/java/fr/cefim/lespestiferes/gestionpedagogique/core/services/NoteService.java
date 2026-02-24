package fr.cefim.lespestiferes.gestionpedagogique.core.services;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Note;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    @Transactional
    public Note saveNote(Note note) {
        if (note.getDateSaisie() == null) {
            note.setDateSaisie(LocalDateTime.now());
        }
        return noteRepository.save(note);
    }

    @Transactional(readOnly = true)
    public Optional<Note> getNoteById(Integer id) {
        return noteRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    @Transactional
    public void deleteNote(Integer id) {
        noteRepository.deleteById(id);
    }
}
