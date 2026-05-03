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
Los tests validan:
- Status codes  
- Estructura del response  
- Tipos de datos  
- Valores específicos según el caso  

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


### 2. Instalar browsers

npx playwright install


### 3. Ejecutar tests

npx playwright test


---

## Key Points

- Separación de responsabilidades (clients / tests / validators)  
- Código reutilizable  
- Tests claros y mantenibles  
- Integración continua configurada  

---

## Author
QA Automation Project – Portfolio
