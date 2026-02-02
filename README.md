# Galilei 3D - Piantina Scolastica Interattiva

Modello 3D interattivo della piantina scolastica realizzato con React e Three.js.

## 🚀 Installazione e Avvio

1. **Installa le dipendenze:**
   ```bash
   npm install
   ```

2. **Avvia il server di sviluppo:**
   ```bash
   npm run dev
   ```

3. **Apri nel browser:**
   Il progetto sarà disponibile su `http://localhost:5173`

## 🎮 Come usare

- **Ruota la vista:** Trascina con il mouse
- **Zoom:** Usa la rotellina del mouse
- **Hover:** Passa sopra le stanze per vedere il nome e l'effetto di evidenziazione

## 🏗️ Struttura del Progetto

```
galilei3d/
├── src/
│   ├── components/
│   │   ├── FloorPlan.jsx  # Definizione della piantina con tutte le stanze
│   │   └── Room.jsx        # Componente singola stanza con interattività
│   ├── App.jsx             # Componente principale con Canvas 3D
│   └── main.jsx            # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Caratteristiche

- **Visualizzazione 3D:** Modello tridimensionale navigabile della piantina
- **Colori codificati:** Ogni tipo di stanza ha un colore distintivo
  - 🟠 Arancione: Aule (T04-T12)
  - 🟡 Giallo: Laboratori
  - 🔵 Azzurro: Bagno
  - 🟢 Verde: Palestre e Auditorium
  - 🟣 Viola: Sala Docenti
  - 🔴 Rosa: Bar
  - 🟤 Marrone: Depositi
  - ⚪ Grigio: Spazi non definiti
- **Interattività:** Hover con effetto di elevazione e cambio colore
- **Etichette:** Nome di ogni stanza visibile in 3D
- **Controlli:** Camera orbitale con limiti configurati

## 🛠️ Tecnologie Utilizzate

- **React 18** - Framework UI
- **Three.js** - Libreria 3D
- **React Three Fiber** - React renderer per Three.js
- **React Three Drei** - Helpers per R3F
- **Vite** - Build tool e dev server
