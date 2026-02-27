package fr.cefim.lespestiferes.gestionpedagogique.core.services;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Evaluation;
import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Matiere;
import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Note;
import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Utilisateur;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.CatEvalEnum;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.StatutPresenceEnum;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.EvaluationRepository;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.MatiereRepository;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.NoteRepository;
import fr.cefim.lespestiferes.gestionpedagogique.core.repositories.UtilisateurRepository;
import fr.cefim.lespestiferes.gestionpedagogique.dto.request.NoteRequestDTO;
import fr.cefim.lespestiferes.gestionpedagogique.exception.DuplicateResourceException;
import fr.cefim.lespestiferes.gestionpedagogique.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Service métier pour la gestion des notes.
 * Formateur - Saisir et consulter les notes.
 * Implémente les règles métier RM-03 (absences = note 0).
 */
@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final EvaluationRepository evaluationRepository;

    /**
     * Crée une nouvelle note à partir d'un DTO.
     * Vérifie l'absence de doublon et applique la règle RM-03.
     */
    @Transactional
    public Note createNote(NoteRequestDTO dto) {
        // Vérifier que l'évaluation existe
        Evaluation evaluation = evaluationRepository.findById(dto.getIdEvaluation())
                .orElseThrow(() -> new ResourceNotFoundException("Evaluation", dto.getIdEvaluation()));

        // Vérifier que l'élève existe
        Utilisateur eleve = utilisateurRepository.findById(dto.getIdEleve())
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur", dto.getIdEleve()));

        // Vérifier qu'une note n'existe pas déjà pour cet élève et cette évaluation
        if (noteRepository.existsByEleveAndEvaluation(dto.getIdEleve(), dto.getIdEvaluation())) {
            throw new DuplicateResourceException("Une note existe déjà pour cet élève et cette évaluation.");
        }

        Note note = Note.builder()
                .evaluation(evaluation)
                .eleve(eleve)
                .valeurNote(dto.getValeurNote())
                .statutPresence(dto.getStatutPresence())
                .commentaire(dto.getCommentaire())
                .dateSaisie(LocalDateTime.now())
                .build();

        return saveNote(note);
    }

    /**
     * Met à jour une note existante.
     */
    @Transactional
    public Note updateNote(Integer idNote, NoteRequestDTO dto) {
        Note note = getNoteById(idNote);

        // Si l'évaluation a changé, vérifier qu'elle existe
        if (!note.getEvaluation().getIdEvaluation().equals(dto.getIdEvaluation())) {
            Evaluation evaluation = evaluationRepository.findById(dto.getIdEvaluation())
                    .orElseThrow(() -> new ResourceNotFoundException("Evaluation", dto.getIdEvaluation()));
            note.setEvaluation(evaluation);
        }

        // Si l'élève a changé, vérifier qu'il existe
        if (!note.getEleve().getIdUtilisateur().equals(dto.getIdEleve())) {
            Utilisateur eleve = utilisateurRepository.findById(dto.getIdEleve())
                    .orElseThrow(() -> new ResourceNotFoundException("Utilisateur", dto.getIdEleve()));
            note.setEleve(eleve);
        }

        note.setValeurNote(dto.getValeurNote());
        note.setStatutPresence(dto.getStatutPresence());
        note.setCommentaire(dto.getCommentaire());

        return saveNote(note);
    }

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
                .orElseThrow(() -> new ResourceNotFoundException("Note", id));
    }

    @Transactional(readOnly = true)
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Note> getNotesByEleve(Integer idEleve) {
        return noteRepository.findByEleveIdUtilisateur(idEleve);
    }

    /**
     * Récupère les notes d'un élève avec tous les détails (optimisé avec FETCH JOIN).
     */
    @Transactional(readOnly = true)
    public List<Note> getNotesByEleveWithDetails(Integer idEleve) {
        return noteRepository.findByEleveWithDetails(idEleve);
    }

    /**
     * Récupère toutes les notes d'une évaluation spécifique.
     * Utile pour le formateur qui veut voir toutes les notes d'un contrôle.
     */
    @Transactional(readOnly = true)
    public List<Note> getNotesByEvaluation(Integer idEvaluation) {
        return noteRepository.findByEvaluationWithDetails(idEvaluation);
    }

    /**
     * Récupère toutes les notes d'une matière.
     */
    @Transactional(readOnly = true)
    public List<Note> getNotesByMatiere(Integer idMatiere) {
        return noteRepository.findByMatiereNative(idMatiere);
    }

    /**
     * Récupère toutes les notes saisies par un formateur (via les matières qu'il enseigne).
     */
    @Transactional(readOnly = true)
    public List<Note> getNotesByFormateur(Integer idFormateur) {
        return noteRepository.findByFormateurNative(idFormateur);
    }

    /**
     * Méthode qui retourne la liste des matières pour lesquelles un élève a des notes,
     * sans doublons
     */
    @Transactional(readOnly = true)
    public List<Matiere> getMatieresByEleves(Integer idEleve) {
        List<Note> notes = getNotesByEleve(idEleve);
        return notes.stream()
                .map(note -> note.getEvaluation().getMatiere())
                .distinct()
                .toList();
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
