# GitHub Users Explorer

Una aplicación web para explorar usuarios de GitHub y sus repositorios, construida con Next.js.

## Stack Tecnológico

### Core
- **Framework**: Next.js 15 (Pages Router)
- **Lenguaje**: TypeScript
- **Estado**: React Query + Zustand

### Estilos
- **CSS Modules**
- **SASS**
- **clsx**: Manejo de clases condicionales

### Desarrollo
- **Package Manager**: pnpm
- **Linting/Formatting**: Biome
- **Control de Versiones**: Git

### Testing
- **Unit Testing**: Jest
- **Integration Testing**: React Testing Library

### Despliegue
- **Plataforma**: Vercel

## Requisitos Previos

- Node.js (versión 20 o superior)
- pnpm (versión 8 o superior)

## Configuración del Entorno de Desarrollo

1. Clonar el repositorio:
```bash
git clone https://github.com/juancatorr/github-users.git
cd github-users
```

2. Instalar dependencias:
```bash
pnpm install
```

3. Crear archivo de variables de entorno:
```bash
cp .env.example .env.local
```

4. Iniciar el servidor de desarrollo:
```bash
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Decisiones de Desarrollo

- Se configuró el ambiente de desarrollo con Biome en lugar de Prettier y ESLint, y con pnpm en lugar de npm, priorizando el rendimiento y la velocidad.
- Se aplicó CSS Modules, como solicita el enunciado, y para hacer el código más legible y práctico se implementó SASS.
- Se evitó el uso de librerías externas de estilos o no esenciales, priorizando la performance. En caso de ser necesario, se implementaría mediante lazy loading.
- Se utilizó clsx para combinar clases CSS de forma óptima.
- Para el manejo de estado global de la aplicación se implementó Zustand.
- Para el manejo de errores se optó por utilizar las alternativas que ofrece Next.js (404.tsx y _error.tsx).
- Se aplicó SSR únicamente en la página de detalles de usuario, tal como lo indica el enunciado.
- La aplicación se despliega en Vercel, por su practicidad e integración con GitHub.
- Aplicación 100% responsive.
- Se agregaron las metaetiquetas necesarias para el SEO.
- Se agrega test unitarios solo en el punto mas critico de la aplicacion que es el apiClient.ts por cuestiones de tiempo.

- Se utiliza React Query para el manejo de estado asíncrono y caché de datos de la API.
- Zustand para el estado global de la aplicación.
- La hidratación del estado se realiza en el servidor para mejorar el rendimiento inicial.

## Scripts Disponibles

- `pnpm dev`: Inicia el servidor de desarrollo
- `pnpm build`: Construye la aplicación para producción
- `pnpm start`: Inicia la aplicación en modo producción
- `pnpm lint`: Ejecuta el linter
- `pnpm test`: Ejecuta las pruebas
