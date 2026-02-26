package fr.cefim.lespestiferes.gestionpedagogique.core.controllers;

import fr.cefim.lespestiferes.gestionpedagogique.core.entities.Utilisateur;
import fr.cefim.lespestiferes.gestionpedagogique.core.enums.RoleEnum;
import fr.cefim.lespestiferes.gestionpedagogique.core.services.UtilisateurService;
import fr.cefim.lespestiferes.gestionpedagogique.dto.request.UtilisateurRequestDTO;
import fr.cefim.lespestiferes.gestionpedagogique.dto.response.UtilisateurResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour la gestion des utilisateurs.
 * US-06 : CRUD réservé aux Responsables Pédagogiques (RP).
 *
 * Note : @PreAuthorize commenté en attendant l'implémentation de JWT
 * (US-09/US-10).
 */
@RestController
@RequestMapping("/api/utilisateurs")
@RequiredArgsConstructor
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    // ========================
    // GET — Lecture
    // ========================

    /**
     * Liste tous les utilisateurs.
     * 
     * @return liste de UtilisateurResponseDTO
     */
    @GetMapping
    // @PreAuthorize("hasRole('RP')")
    public ResponseEntity<List<UtilisateurResponseDTO>> getAllUtilisateurs() {
        List<UtilisateurResponseDTO> utilisateurs = utilisateurService.getAllUtilisateurs()
                .stream()
                .map(UtilisateurResponseDTO::fromEntity)
                .toList();
        return ResponseEntity.ok(utilisateurs);
    }

    /**
     * Récupère un utilisateur par son ID.
     * 
     * @param id identifiant de l'utilisateur
     * @return UtilisateurResponseDTO ou 404
     */
    @GetMapping("/{id}")
    // @PreAuthorize("hasRole('RP')")
    public ResponseEntity<UtilisateurResponseDTO> getUtilisateurById(@PathVariable Integer id) {
        Utilisateur utilisateur = utilisateurService.getUtilisateurById(id);
        return ResponseEntity.ok(UtilisateurResponseDTO.fromEntity(utilisateur));
    }

    /**
     * Filtre les utilisateurs par rôle.
     * Exemple : GET /api/utilisateurs/role/ELEVE
     * 
     * @param role le rôle à filtrer
     * @return liste filtrée
     */
    @GetMapping("/role/{role}")
    // @PreAuthorize("hasRole('RP')")
    public ResponseEntity<List<UtilisateurResponseDTO>> getUtilisateursByRole(@PathVariable RoleEnum role) {
        List<UtilisateurResponseDTO> utilisateurs = utilisateurService.getUtilisateursByRole(role)
                .stream()
                .map(UtilisateurResponseDTO::fromEntity)
                .toList();
        return ResponseEntity.ok(utilisateurs);
    }

    // ========================
    // POST — Création
    // ========================

    /**
     * Crée un nouvel utilisateur.
     * RM-05 : les comptes sont créés par le RP uniquement.
     * 
     * @param dto données validées de l'utilisateur
     * @return UtilisateurResponseDTO avec HTTP 201
     */
    @PostMapping
    // @PreAuthorize("hasRole('RP')")
    public ResponseEntity<UtilisateurResponseDTO> createUtilisateur(@Valid @RequestBody UtilisateurRequestDTO dto) {
        Utilisateur utilisateur = Utilisateur.builder()
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .email(dto.getEmail())
                .motDePasse(dto.getMotDePasse())
                .role(dto.getRole())
                .statutEleve(dto.getStatutEleve())
                .estActif(dto.getEstActif() != null ? dto.getEstActif() : true)
                .build();

        Utilisateur saved = utilisateurService.saveUtilisateur(utilisateur);
        return ResponseEntity.status(HttpStatus.CREATED).body(UtilisateurResponseDTO.fromEntity(saved));
    }

    // ========================
    // PUT — Modification
    // ========================

    /**
     * Met à jour un utilisateur existant.
     * 
     * @param id  identifiant de l'utilisateur à modifier
     * @param dto nouvelles données validées
     * @return UtilisateurResponseDTO mis à jour
     */
    @PutMapping("/{id}")
    // @PreAuthorize("hasRole('RP')")
    public ResponseEntity<UtilisateurResponseDTO> updateUtilisateur(
            @PathVariable Integer id,
            @Valid @RequestBody UtilisateurRequestDTO dto) {
        Utilisateur updated = utilisateurService.updateUtilisateur(id, dto);
        return ResponseEntity.ok(UtilisateurResponseDTO.fromEntity(updated));
    }

    /**
     * Désactive un utilisateur (met est_actif à false).
     * RM-04 : alternative à la suppression pour les formateurs.
     * 
     * @param id identifiant de l'utilisateur
     * @return UtilisateurResponseDTO mis à jour
     */
    @PutMapping("/{id}/desactiver")
    // @PreAuthorize("hasRole('RP')")
    public ResponseEntity<UtilisateurResponseDTO> desactiverUtilisateur(@PathVariable Integer id) {
        Utilisateur desactive = utilisateurService.desactiverUtilisateur(id);
        return ResponseEntity.ok(UtilisateurResponseDTO.fromEntity(desactive));
    }

    // ========================
    // DELETE — Suppression
    // ========================

    /**
     * Supprime un utilisateur.
     * RM-04 : un formateur ne peut pas être supprimé, seulement désactivé → 422.
     * 
     * @param id identifiant de l'utilisateur
     * @return HTTP 204 No Content
     */
    @DeleteMapping("/{id}")
    // @PreAuthorize("hasRole('RP')")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Integer id) {
        utilisateurService.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }
}
