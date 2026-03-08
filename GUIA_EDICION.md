# 🎮 Guía de Edición - The Forgotten Playroom

## 📁 Estructura de Archivos

```
TheForgottenPlayroom/
├── index.html              ← Página principal (menús, HUD)
├── css/
│   ├── style.css          ← Estilos del juego
│   └── menu.css           ← Estilos de menús
└── js/
    ├── constants.js        ← Configuración global
    ├── game.js             ← Motor del juego
    ├── characters/         ← Monstruos y personajes
    └── levels/             ← Niveles del juego
```

---

## 👹 CÓMO AÑADIR UN NUEVO MONSTRUO

### Paso 1: Crear el archivo

Crea un archivo en `js/characters/mimonstro.js`:

```javascript
// MiMonstro - Capítulo X
class MiMonstro extends Enemy {
    constructor(x, y) {
        super(x, y, CHARACTER_TYPES.MIMONSTRO);
        
        this.emoji = '🐉';        // Emoji del monstruo
        this.color = '#FF0000';   // Color
        
        this.speed = 2;           // Velocidad normal
        this.chaseSpeed = 4;      // Velocidad persiguiendo
        
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.damage = 20;         // Daño al jugador
        
        // Comportamiento especial
        this.specialAbility = true;
    }
    
    update(deltaTime, player, tiles, tileSize, audio) {
        if (!this.isAlive) return;
        
        // Tu lógica personalizada aquí
        const distToPlayer = distance(this.x, this.y, player.x, player.y);
        
        if (this.canSeePlayer(player, tiles, tileSize)) {
            this.isChasing = true;
            this.chase(deltaTime, player.x, player.y, tiles, tileSize);
            
            if (distToPlayer <= this.attackRange) {
                this.tryAttack(player, audio);
            }
        }
        
        // Animación
        this.animationTimer += deltaTime;
        if (this.animationTimer > 200) {
            this.animationTimer = 0;
            this.animationFrame = (this.animationFrame + 1) % 4;
        }
    }
    
    playSound(audio) {
        audio.play('mi_sonido');
    }
    
    drawSprite(ctx) {
        drawEmoji(ctx, this.emoji, this.x + this.width / 2, this.y + this.height / 2, 32);
    }
}
```

### Paso 2: Añadir a constants.js

En `js/constants.js`, añade:

```javascript
CHARACTER_TYPES: {
    // ... existentes
    MIMONSTRO: 'mimonstro'
}
```

### Paso 3: Añadir al nivel

En `js/levels/chapterX.js`:

```javascript
createEnemies() {
    const enemies = [
        // ... existentes
        new MiMonstro(10 * GAME_CONFIG.TILE_SIZE, 5 * GAME_CONFIG.TILE_SIZE)
    ];
    return enemies;
}
```

### Paso 4: Añadir script en index.html

```html
<script src="js/characters/mimonstro.js"></script>
```

---

## 🗺️ CÓMO EDITAR NIVELES

### Estructura de un nivel

Los niveles están en `js/levels/chapterX.js`:

```javascript
class Chapter1 extends Level {
    constructor() {
        super(1, 'Capítulo 1: La Entrada');
    }
    
    generate() {
        const map = [];
        
        // Crear mapa 40x30 tiles
        for (let y = 0; y < 30; y++) {
            const row = [];
            for (let x = 0; x < 40; x++) {
                // Borde = pared
                if (x === 0 || x === 39 || y === 0 || y === 29) {
                    row.push(TILES.WALL);
                }
                // Suelo normal
                else {
                    row.push(TILES.FLOOR);
                }
            }
            map.push(row);
        }
        
        // Spawn del jugador
        map[2][2] = TILES.SPAWN;
        
        // Salida del nivel
        map[27][37] = TILES.END_ZONE;
        
        // Puertas
        map[10][10] = TILES.DOOR;
        
        // Items
        map[5][15] = TILES.ITEM;
        
        // Spawn de monstruos
        map[8][12] = TILES.ENEMY_SPAWN;
        
        return map;
    }
    
    createEnemies() {
        return [
            new Boogo(12 * GAME_CONFIG.TILE_SIZE, 8 * GAME_CONFIG.TILE_SIZE),
            new Catstar(30 * GAME_CONFIG.TILE_SIZE, 18 * GAME_CONFIG.TILE_SIZE)
        ];
    }
}
```

### Tipos de Tiles

| Tile | Código | Descripción |
|------|--------|-------------|
| `TILES.FLOOR` | 0 | Suelo caminable |
| `TILES.WALL` | 1 | Pared (bloquea) |
| `TILES.DOOR` | 2 | Puerta (abrible con E) |
| `TILES.ITEM` | 3 | Objeto recogible |
| `TILES.SPAWN` | 4 | Spawn del jugador |
| `TILES.ENEMY_SPAWN` | 5 | Spawn de enemigos |
| `TILES.END_ZONE` | 6 | Zona de salida |

---

## ⚙️ CONFIGURACIÓN GLOBAL

En `js/constants.js`:

```javascript
GAME_CONFIG: {
    TILE_SIZE: 32,           // Tamaño de cada tile
    PLAYER_SPEED: 3,         // Velocidad normal
    PLAYER_RUN_SPEED: 5,     // Velocidad corriendo
    PLAYER_MAX_HEALTH: 100,   // Vida máxima
    PLAYER_MAX_STAMINA: 100, // Stamina máxima
    FLASHLIGHT_RADIUS: 150,  // Radio de la linterna
    FLASHLIGHT_BATTERY_MAX: 100,
    FLASHLIGHT_BATTERY_DRAIN: 0.1,
    FLASHLIGHT_RECHARGE: 0.2,
    SLIMER_SLOW_AMOUNT: 0.5  // Ralentización de Slimer
}
```

---

## 🎨 CÓMO CAMBIAR COLORES Y ESTILOS

### Colores del juego (css/style.css)

```css
/* Fondo oscuro */
background: #0a0a0a;

/* HUD */
#hud { background: rgba(0, 0, 0, 0.8); }

#health-bar { background: linear-gradient(to right, #ff0000, #00ff00); }
#stamina-bar { background: #0088ff; }
#flashlight-bar { background: linear-gradient(to right, #ffff00, #ff8800); }
```

### Menús (css/menu.css)

```css
/* Título */
.game-title { color: #FFD700; }

/* Botones */
.menu-btn { background: linear-gradient(135deg, #1a1a2e, #16213e); }

/* Efecto hover */
.menu-btn:hover { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
```

---

## 📝 MENSAJES DE DIÁLOGO

En cada nivel, añade diálogos:

```javascript
getDialogs() {
    return [
        { speaker: 'Sistema', text: 'Capítulo 1: La Entrada' },
        { speaker: '👤 Tú', text: '¿Dónde estoy...?' },
        { speaker: '🧸 Boogo', text: '¿Quieres jugar conmigo...?' },
        { speaker: 'Sistema', text: '¡ADVERTENCIA: Entidad hostil detectada!' }
    ];
}
```

---

## 🔊 SONIDOS

Los sonidos se generan con Web Audio API en `js/audio.js`:

```javascript
createBeep(frequency, duration)  // Tono simple
createHeartbeat()                  // Latido
createWhisper()                    // Susurro
createLaugh()                      // Risita
createNoise(duration)              // Ruido ambiente
```

---

## 🎮 CONTROLES PERSONALIZADOS

En `js/constants.js`:

```javascript
KEYS: {
    W: 87,      // Arriba
    A: 65,      // Izquierda
    S: 83,      // Abajo
    D: 68,      // Derecha
    F: 70,      // Linterna
    E: 69,      // Interactuar
    SPACE: 32,  // Correr
    ESC: 27     // Pausa
}
```

---

## 📊 CREAR NUEVO CAPÍTULO

1. Crea `js/levels/chapter5.js`
2. Añade en `index.html`: `<script src="js/levels/chapter5.js"></script>`
3. Importa en `js/game.js`

```javascript
case 5:
    this.currentLevel = new Chapter5();
    break;
```

---

## 🧪 CONSEJOS DE DISEÑO

### Dificultad progresiva:
- **Capítulo 1:** 1-2 monstruos, mapa pequeño
- **Capítulo 2:** 3-4 monstruos, mapa mediano
- **Capítulo 3:** 5-6 monstruos, mapa grande
- **Capítulo 4:** Boss final (Emily)

### Balance:
- Vida jugador: 100
- Daño monstruos: 15-40
- Velocidad monstruos: 2-6
- Batería linterna: 100 unidades

---

## 📞 SOPORTE

Si necesitas ayuda:
1. Abre la consola del navegador (F12)
2. Mira los errores en rojo
3. Comprueba que todos los scripts estén cargados

---

**¡Buena suerte creando tu propio horror! 🧸**