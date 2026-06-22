package pe.bancoconfianza.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class HomeBankingApplication {
    public static void main(String[] args) {
        SpringApplication.run(HomeBankingApplication.class, args);
    }
}
