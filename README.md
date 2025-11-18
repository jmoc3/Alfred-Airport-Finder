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
> Obtén tu API key gratis en [AviationStack](https://aviationstack.com/)

> ⚠️ **Importante**: Tu cuenta de AviationStack debe tener **al menos 51 peticiones disponibles** para poder ejecutar el build exitosamente. Esto es necesario porque durante el proceso de build se pre-renderizan las páginas de los 50 aeropuertos más populares como parte de la optimización de rendimiento (ISR - Incremental Static Regeneration). Si no tienes suficientes peticiones, el build fallará.

4. **Construye y arranca el proyecto en modo producción**
```bash
pnpm build
pnpm start
# o si prefieres npm
npm run build
npm start
```

5. **Abre tu navegador** en [http://localhost:3000](http://localhost:3000)

¡Y listo! 🎉

> 💡 **Tip**: Para desarrollo, puedes usar `pnpm dev` (o `npm run dev`), pero para experimentar el verdadero rendimiento con ISR y caché optimizado, se recomienda probar con `build + start`.

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

## 📊 Performance

La aplicación está optimizada para ofrecer la mejor experiencia de usuario posible. Según las métricas de Lighthouse:

![Lighthouse Performance Metrics](public/images/lighthouse-metrics.png)

### Métricas principales:
- **Performance**: 97/100 ⚡
- **Accessibility**: 98/100 ♿
- **Best Practices**: 100/100 ✅
- **SEO**: 100/100 🔍

### Optimizaciones implementadas:

#### 🚀 Caché y Revalidación (ISR)
- **Caché de páginas estáticas**: Las rutas `/airports` y `/airport/[iata]` se cachean (24h - 1h)
- **Revalidación automática**: Los datos se actualizan en background sin afectar la experiencia del usuario
- **Caché de fetch**: Next.js cachea las respuestas de la API externa para reducir llamadas innecesarias

#### ⚡ Optimizaciones de carga
- **Lazy loading de mapas**: El componente de Leaflet solo se carga cuando el usuario accede a la pestaña de ubicación
- **Generación estática de páginas populares**: Los 50 aeropuertos más visitados se pre-generan en build time
- **Debounce en búsqueda**: Evita llamadas excesivas mientras el usuario escribe (500ms de retraso)

#### 🎯 Optimizaciones de estado
- **Zustand**: Estado global ligero sin re-renders innecesarios
- **Paginación eficiente**: Solo se renderizan 6 aeropuertos por página
- **Filtrado local**: Las búsquedas se filtran en memoria para evitar latencia de red

#### 📦 Assets optimizados
- **Imágenes optimizadas**: Next.js Image component con lazy loading automático
- **CSS modular**: Tailwind con purge para eliminar CSS no utilizado
- **Compresión**: Gzip/Brotli habilitado en producción

### Resultado:
Una aplicación rápida, accesible y optimizada que carga en menos de 2 segundos y ofrece una experiencia fluida incluso con miles de aeropuertos.

---

Hecho con 😴 y ❤️
