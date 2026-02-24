package fr.cefim.lespestiferes.gestionpedagogique;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;
import java.sql.Connection;

@SpringBootApplication
public class GestionPedagogiqueApplication {

	@Autowired
	private DataSource dataSource;

	public static void main(String[] args) {
		SpringApplication.run(GestionPedagogiqueApplication.class, args);
	}

	/**
	 * Test de connexion à la base de données au démarrage.
	 * Affiche un message de succès ou d'erreur dans les logs.
	 */
	@Bean
	public CommandLineRunner testDatabaseConnection() {
		return args -> {
			System.out.println("\n=================================================");
			System.out.println("🔍 TEST DE CONNEXION À LA BASE DE DONNÉES");
			System.out.println("=================================================");
			
			try (Connection connection = dataSource.getConnection()) {
				if (connection.isValid(5)) {
					System.out.println("✅ CONNEXION RÉUSSIE !");
					System.out.println("📊 Base de données : " + connection.getMetaData().getDatabaseProductName());
					System.out.println("📌 Version : " + connection.getMetaData().getDatabaseProductVersion());
					System.out.println("🔗 URL : " + connection.getMetaData().getURL());
					System.out.println("👤 Utilisateur : " + connection.getMetaData().getUserName());
				} else {
					System.err.println("❌ CONNEXION ÉCHOUÉE : La connexion n'est pas valide");
				}
			} catch (Exception e) {
				System.err.println("❌ ERREUR DE CONNEXION À LA BASE DE DONNÉES");
				System.err.println("Message : " + e.getMessage());
				e.printStackTrace();
			}
			
			System.out.println("=================================================\n");
		};
	}
}
