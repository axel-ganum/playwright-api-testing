# Playwright API Testing
[![Playwright Tests](https://github.com/axel-ganum/playwright-api-testing/actions/workflows/playwright.yml/badge.svg)](https://github.com/axel-ganum/playwright-api-testing/actions)

## Overview
Proyecto de automatización de APIs utilizando Playwright con TypeScript.  
Incluye validación de endpoints REST, cobertura de operaciones CRUD y aplicación de buenas prácticas de diseño para mantener los tests escalables y mantenibles.

---

## Tech Stack
- Playwright  
- TypeScript  
- Node.js  
- GitHub Actions (CI/CD)

---

## Project Structure

clients/ → manejo de requests (API Client pattern)  
tests/ → escenarios de prueba  
utils/validators.ts → validaciones reutilizables  
playwright.config.ts → configuración global  

---

## Design Approach

### API Client Pattern
Se implementa una capa de clients (`UsersClient`, `PostsClient`) para encapsular las llamadas HTTP y evitar acoplar lógica de requests dentro de los tests.

### Validators
Las validaciones de estructura y tipos se abstraen en funciones reutilizables (`validateUser`, `validatePost`), reduciendo duplicación y mejorando mantenibilidad.

### Test Strategy

Los tests cubren tanto escenarios positivos como negativos, validando el comportamiento de la API en condiciones reales.

Se validan:

- Status codes esperados (200, 201, 404, etc.)
- Estructura completa del response
- Tipos de datos
- Valores específicos según reglas de negocio
- Integridad de datos en operaciones CRUD

También se incluyen:

- Casos negativos (ej: recursos inexistentes, payloads inválidos)
- Validación de listas completas (no solo el primer elemento)
- Verificación de consistencia en respuestas

El enfoque prioriza endpoints críticos y operaciones más representativas de una API REST.

---

## Covered Scenarios

### Users
- GET /users  
- GET /users/{id}  

### Posts
- POST /posts  
- PUT /posts/{id}  
- DELETE /posts/{id}  

---

## Negative Testing

Se incluyen escenarios negativos para validar el manejo de errores de la API:

- GET de recurso inexistente (ej: `/users/999`)
- POST con payload inválido
- PUT sobre recurso inexistente
- DELETE de recurso inexistente

Nota: La API utilizada (JSONPlaceholder) es una API mock, por lo que algunos endpoints no devuelven errores reales (ej: siempre retornan 200).  
En un entorno productivo, estos casos validarían códigos como 400, 401 o 404 de forma estricta.

---

## CI/CD

El proyecto utiliza GitHub Actions para ejecutar los tests automáticamente en cada push y pull request.

Archivo:  
.github/workflows/playwright.yml

Pipeline:
- Instalación de dependencias  
- Instalación de browsers  
- Ejecución de tests  
- Generación de reportes  

---

## How to Run

### 1. Instalar dependencias

npm install

# 2. Instalar browsers
npx playwright install

# 3. Ejecutar tests
npx playwright test

## Key Points
- Separación de responsabilidades clara (clients / tests / validators)
- Uso de patrones de diseño para escalabilidad (API Client Pattern)
- Validaciones reutilizables y mantenibles
- Cobertura de escenarios positivos y negativos
- Integración continua con GitHub Actions
- Enfoque en buenas prácticas de testing y diseño de tests

## Design Decisions
- Se utiliza API Client Pattern para desacoplar la lógica de requests de los tests y facilitar escalabilidad.
- Las validaciones se centralizan en funciones reutilizables (validators) para evitar duplicación.
- Los tests priorizan claridad y mantenibilidad sobre complejidad.
- Se evita lógica dentro de los tests, delegando responsabilidades a clients y utils.

## Limitations
Este proyecto no cubre:

- Autenticación / autorización
- Performance testing
- Rate limiting
- Manejo de estados persistentes (la API es mock)

Estas limitaciones se deben a que la API utilizada es pública y no representa un entorno productivo real.

## Example Test
```ts
test('GET /users returns a valid list of users', async ({ request }) => {
  const usersClient = new UsersClient(request);

  const res = await usersClient.getAllUsers();
  expect(res.status()).toBe(200);

  const body = await res.json();

  body.forEach(user => {
    validateUser(user);
  });
});

## Author
QA Automation Project – Portfolio



