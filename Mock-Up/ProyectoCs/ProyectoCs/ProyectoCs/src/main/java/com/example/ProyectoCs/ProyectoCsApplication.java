package com.example.ProyectoCs;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProyectoCsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProyectoCsApplication.class, args);
	}
	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI()
				.info(new Info()
				.title("ProyectoCs").version("1.0.0").description("Ejemplo swagger").termsOfService("https://swageer.io/terms")
						.license(new License().name("Apache 2.0").url("http://springdoc.org")));
	}
}
