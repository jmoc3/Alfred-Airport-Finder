# ✈️ Alfred Airport Finder

Una aplicación moderna para buscar y explorar información detallada de aeropuertos de todo el mundo. Construida con Next.js 15, TypeScript y Zustand.

## 🚀 Cómo correr el proyecto

### Requisitos previos
- Node.js 18+ instalado
- pnpm (recomendado) o npm

### Instalación y ejecución

1. **Clona el repositorio**
```bash
git clone https://github.com/jmoc3/alfred_pt.git
cd alfred_pt
```

2. **Instala las dependencias**
```bash
pnpm install
# o si prefieres npm
npm install
```

3. **Configura las variables de entorno**
Crea un archivo `.env.local` en la raíz del proyecto:
```env
AVIATION_STACK_API_KEY=tu_api_key_aqui
AVIATION_API_BASE_URL=http://api.aviationstack.com/v1
APP_URL=http://localhost:3000
```
> Obtén tu API key gratis en <a href="https://aviationstack.com/" target="_blank" rel="noopener noreferrer">AviationStack</a>

4. **Arranca el servidor de desarrollo**
```bash
pnpm dev
# o
npm run dev
```

5. **Abre tu navegador** en <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000</a>

¡Y listo! 🎉

## ✨ Lo que hace especial a este proyecto

- **🎨 UI/UX moderna**: Diseño limpio con animaciones suaves y transiciones elegantes
- **🌓 Modo oscuro**: Porque tus ojos también merecen descanso
- **📱 Responsive**: Se ve genial en cualquier dispositivo (móvil, tablet, desktop)
- **⚡ Rendimiento optimizado**: 
  - Caché inteligente de datos
  - Paginación del lado del cliente con Zustand
  - Búsqueda con debounce para evitar llamadas innecesarias
- **🗺️ Mapas interactivos**: Visualiza la ubicación exacta de cada aeropuerto con Leaflet
- **📜 Historial de búsqueda**: Accede rápidamente a aeropuertos visitados recientemente
- **🧪 Testing**: Pruebas unitarias con Jest y React Testing Library
- **📦 Estado global con Zustand**: Gestión de estado simple y eficiente

## 📝 Nota importante sobre la búsqueda

> ⚠️ **Sobre el buscador**: La implementación actual del buscador **no utiliza la API** para filtrar por nombre. Esto se debe a una limitación del plan gratuito de AviationStack API, que solo permite búsquedas por código IATA, no por nombre de aeropuerto o ciudad.
> 
> **Solución implementada**: El filtrado por nombre se realiza localmente en el cliente después de obtener todos los aeropuertos. Esto garantiza una experiencia de búsqueda fluida y completa sin restricciones.

## 🛠️ Stack tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado global**: Zustand
- **Mapas**: Leaflet + React-Leaflet
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint
- **API**: AviationStack

## 📂 Estructura del proyecto

```
src/
├──__tests__/       # Tests unitarios
│   └── api/        # Tests de API routes
├── app/              # Rutas y páginas (App Router)
├── components/       # Componentes reutilizables
│   ├── features/    # Componentes de características
│   └── ui/          # Componentes de UI
├── hooks/           # Custom hooks
├── services/        # Servicios y llamadas a API
├── store/           # Estado global (Zustand)
└── types/           # Definiciones de tipos TypeScript
```

## 🧪 Testing

Ejecuta las pruebas con:
```bash
pnpm test
# o
npm test
```

## 📦 Build para producción

```bash
pnpm build
pnpm start
```
---

Hecho con 😴 y ❤️
