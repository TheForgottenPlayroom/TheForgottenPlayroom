# The Forgotten Playroom 🧸

> Un juego de terror web-based ambientado en una fábrica de juguetes abandonada.

## 🎮 Jugar

**URL del juego:** https://theforgottenplayroom.github.io/TheForgottenPlayroom/

(Activar GitHub Pages en Settings → Pages → Source: main branch)

## 📖 Historia

Eres un detective que explora una antigua fábrica de juguetes abandonada. Lo que empieza como una investigación rutinaria se convierte en una pesadilla cuando descubres que los juguetes tienen vida propia...

## 👹 Personajes

### Monstruos

| Personaje | Capítulo | Comportamiento |
|-----------|----------|----------------|
| 🧸 **Boogo** | 1 | Teletransporta cuando no lo miras |
| 🦁 **Catstar** | 1 | Ataca desde las alturas |
| 🤖 **1028** | 2 | Robot traidor que fija ayudar |
| 🐀 **Ratuile** | 2 | Rata con 3 emociones (😊😟😠) |
| 🟢 **Slimer** | 2 | Slime que deja rastro ralentizador |
| 👧 **Emily** | 4 | Boss final, controla todos los monstruos |

### Aliado

| Personaje | Capítulo | Función |
|-----------|----------|---------|
| 📺 **Tecno Player** | 2+ | Robot aliado con cabeza de TV, ayuda al jugador |

## 🎮 Controles

- **WASD / Flechas**: Mover
- **F**: Linterna (batería limitada)
- **E**: Interactuar
- **Space**: Correr (consume stamina)
- **ESC**: Pausa
- **Click**: Apuntar

## 🗺️ Capítulos

1. **La Entrada** - Boogo y Catstar
2. **El Almacén** - 1028, Ratuile, Slimer + Tecno Player aparece
3. **El Laboratorio** - Todos los monstruos
4. **La Sala de Emily** - Boss Final

## ⚠️ Advertencia

Este juego contiene:
- Terror y sustos
- Atmosfera oscura
- Contenido recomendado para mayores de 12 años

## 🛠️ Tecnologías

- HTML5 Canvas
- JavaScript puro (sin frameworks)
- CSS3 para estilos
- Web Audio API para sonidos

## 📁 Estructura

```
TheForgottenPlayroom/
├── index.html          # Archivo principal
├── css/
│   ├── style.css       # Estilos del juego
│   └── menu.css        # Estilos de menús
└── js/
    ├── constants.js    # Configuración del juego
    ├── utils.js        # Utilidades
    ├── input.js        # Manejo de entrada
    ├── audio.js        # Sistema de audio
    ├── player.js       # Clase del jugador
    ├── game.js         # Motor del juego
    ├── main.js         # Punto de entrada
    ├── characters/     # Clases de personajes
    │   ├── enemy.js
    │   ├── boogo.js
    │   ├── catstar.js
    │   ├── robot1028.js
    │   ├── ratuile.js
    │   ├── slimer.js
    │   ├── tecnoplayer.js
    │   └── emily.js
    └── levels/        # Niveles del juego
        ├── level.js
        ├── chapter1.js
        ├── chapter2.js
        ├── chapter3.js
        └── chapter4.js
```

## 🎨 Personalización

El código es 100% editable con cualquier editor de texto:
- Visual Studio Code
- Sublime Text
- Notepad++

Solo edita los archivos `.js` y `.css` para cambiar:
- Velocidad de personajes
- Niveles y mapas
- Diálogos y textos
- Estilos visuales

## 📝 Licencia

Creado como proyecto de juego educativo.

---

**Desarrollado con ❤️ para la comunidad de desarrollo de juegos indie.**