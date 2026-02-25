package fr.cefim.lespestiferes.gestionpedagogique.core.services;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Note;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.CatEvalEnum;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.StatutPresenceEnum;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.NoteRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    @Transactional
    public Note saveNote(Note note) {
        // RM-03 : une absence (justifiée ou non) = note 0
        if (note.getStatutPresence() == StatutPresenceEnum.ABSENCE_INJUSTIFIEE
                || note.getStatutPresence() == StatutPresenceEnum.ABSENCE_JUSTIFIEE) {
            note.setValeurNote(BigDecimal.ZERO);
        }

        if (note.getDateSaisie() == null) {
            note.setDateSaisie(LocalDateTime.now());
        }
        return noteRepository.save(note);
    }

    @Transactional(readOnly = true)
    public Note getNoteById(Integer id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note introuvable avec l'id : " + id));
    }

    @Transactional(readOnly = true)
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Note> getNotesByEleve(Integer idEleve) {
        return noteRepository.findByEleveIdUtilisateur(idEleve);
    }

    @Transactional(readOnly = true)
    public BigDecimal calculerMoyenneMatiere(Integer idEleve, Integer idMatiere) {
        // RM-01 : Moyenne matière = 50% CC + 50% Partiel
        List<Note> notesCC = noteRepository.findByEleveAndMatiereAndCategorie(idEleve, idMatiere,
                CatEvalEnum.CONTROLE_CONTINU);
        List<Note> notesPartiel = noteRepository.findByEleveAndMatiereAndCategorie(idEleve, idMatiere,
                CatEvalEnum.PARTIEL);

        BigDecimal moyenneCC = calculerMoyenne(notesCC);
        BigDecimal moyennePartiel = calculerMoyenne(notesPartiel);

        return moyenneCC.add(moyennePartiel).divide(BigDecimal.valueOf(2), 2, RoundingMode.HALF_UP);
    }

    private BigDecimal calculerMoyenne(List<Note> notes) {
        if (notes.isEmpty()) {
            return BigDecimal.ZERO;
        }
        BigDecimal total = BigDecimal.ZERO;
        for (Note note : notes) {
            if (note.getValeurNote() != null) {
                total = total.add(note.getValeurNote());
            }
        }
        return total.divide(BigDecimal.valueOf(notes.size()), 2, RoundingMode.HALF_UP);
    }

    @Transactional
    public void deleteNote(Integer id) {
        getNoteById(id);
        noteRepository.deleteById(id);
    }
}
