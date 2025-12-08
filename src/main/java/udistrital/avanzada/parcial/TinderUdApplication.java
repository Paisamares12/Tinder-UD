package udistrital.avanzada.parcial;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class TinderUdApplication {

    public static void main(String[] args) {
        SpringApplication.run(TinderUdApplication.class, args);
    }

    @Bean
//metodo para configurar el acceso al proyecto desde otros dominio o puertos
//este metodo permite resolver el problema con las politicas CORS de los navegadores
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                //la direccion/api/** es para que se permita conectar a todos los servicios de /api/
                //allowedMethods("*").allowedHeaders("*")  deja pasar los metodos y los headers
                // si el backend esta en el mismo dominio y puerto del frontend, no hay necesidad de este metodo
                //o en su defecto se coloca la misma direccion y puerto
                registry.addMapping("/api/**").allowedOrigins("http://localhost:8383").allowedMethods("*").allowedHeaders("*");
            }
        };
    }
}
