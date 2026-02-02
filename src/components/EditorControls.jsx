import React from 'react'

export default function EditorControls({ 
  mode, 
  setMode, 
  selectedRoom,
  onDeleteRoom,
  onUpdateRoom,
  onSave,
  onLoad,
  onAddRoom
}) {
  const [editName, setEditName] = React.useState('')
  const [editColor, setEditColor] = React.useState('#9E9E9E')
  const [editWidth, setEditWidth] = React.useState(4)
  const [editHeight, setEditHeight] = React.useState(2.5)
  const [editDepth, setEditDepth] = React.useState(4)

  React.useEffect(() => {
    if (selectedRoom) {
      setEditName(selectedRoom.name)
      setEditColor(selectedRoom.color)
      setEditWidth(selectedRoom.size[0])
      setEditHeight(selectedRoom.size[1])
      setEditDepth(selectedRoom.size[2])
    }
  }, [selectedRoom])
  const handleSave = () => {
    const config = onSave()
    const dataStr = JSON.stringify(config, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'galilei3d-config.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleLoad = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result)
          onLoad(config)
        } catch (error) {
          alert('Errore nel caricamento del file: ' + error.message)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      right: 20,
      background: 'rgba(0,0,0,0.85)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      zIndex: 10,
      fontFamily: 'Arial, sans-serif',
      minWidth: '250px'
    }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>
        🛠️ Editor Piantina
      </h3>

      {/* Modalità */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontSize: '12px', color: '#999', display: 'block', marginBottom: '5px' }}>MODALITÀ</label>
        <select 
          value={mode} 
          onChange={(e) => setMode(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '5px',
            border: 'none',
            fontSize: '14px',
            cursor: 'pointer',
            background: '#333',
            color: 'white'
          }}
        >
          <option value="view">👁️ Visualizza</option>
          <option value="move">🚚 Sposta Stanze</option>
          <option value="resize">📏 Ridimensiona</option>
          <option value="door">🚪 Gestisci Porte</option>
          <option value="wall">🧱 Gestisci Muri</option>
        </select>
      </div>

      {/* Info modalità */}
      <div style={{
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '5px',
        fontSize: '12px',
        marginBottom: '15px',
        lineHeight: '1.5'
      }}>
        {mode === 'view' && '👁️ Naviga liberamente la scena'}
        {mode === 'move' && '🚚 Clicca e trascina le stanze per spostarle'}
        {mode === 'resize' && '📏 Trascina i marker blu per ridimensionare'}
        {mode === 'door' && '🚪 Clicca sui muri dove vuoi la porta. Click vicino ad una porta per rimuoverla'}
        {mode === 'wall' && '🧱 Clicca sui muri per eliminarli/riaggiungerli'}
      </div>

      {/* Stanza selezionata */}
      {selectedRoom && (
        <div style={{
          padding: '12px',
          background: 'rgba(33, 150, 243, 0.3)',
          borderRadius: '5px',
          marginBottom: '15px'
        }}>
          <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>PROPRIETÀ STANZA</div>
          
          {/* Nome */}
          <label style={{ fontSize: '11px', color: '#ccc', display: 'block', marginBottom: '3px' }}>Nome</label>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={() => onUpdateRoom(selectedRoom.id, { name: editName })}
            style={{
              width: '100%',
              padding: '6px',
              marginBottom: '8px',
              borderRadius: '4px',
              border: 'none',
              fontSize: '13px',
              background: '#333',
              color: 'white'
            }}
          />

          {/* Colore */}
          <label style={{ fontSize: '11px', color: '#ccc', display: 'block', marginBottom: '3px' }}>Colore</label>
          <input
            type="color"
            value={editColor}
            onChange={(e) => {
              setEditColor(e.target.value)
              onUpdateRoom(selectedRoom.id, { color: e.target.value })
            }}
            style={{
              width: '100%',
              padding: '4px',
              marginBottom: '8px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              height: '35px'
            }}
          />

          {/* Dimensioni */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '8px' }}>
            <div>
              <label style={{ fontSize: '10px', color: '#ccc', display: 'block', marginBottom: '2px' }}>Largh.</label>
              <input
                type="number"
                value={editWidth}
                onChange={(e) => {
                  const val = parseFloat(e.target.value)
                  setEditWidth(val)
                  onUpdateRoom(selectedRoom.id, { size: [val, editHeight, editDepth] })
                }}
                step="0.5"
                min="1"
                style={{
                  width: '100%',
                  padding: '4px',
                  borderRadius: '3px',
                  border: 'none',
                  fontSize: '12px',
                  background: '#333',
                  color: 'white'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '10px', color: '#ccc', display: 'block', marginBottom: '2px' }}>Altez.</label>
              <input
                type="number"
                value={editHeight}
                onChange={(e) => {
                  const val = parseFloat(e.target.value)
                  setEditHeight(val)
                  onUpdateRoom(selectedRoom.id, { size: [editWidth, val, editDepth] })
                }}
                step="0.5"
                min="1"
                style={{
                  width: '100%',
                  padding: '4px',
                  borderRadius: '3px',
                  border: 'none',
                  fontSize: '12px',
                  background: '#333',
                  color: 'white'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '10px', color: '#ccc', display: 'block', marginBottom: '2px' }}>Profon.</label>
              <input
                type="number"
                value={editDepth}
                onChange={(e) => {
                  const val = parseFloat(e.target.value)
                  setEditDepth(val)
                  onUpdateRoom(selectedRoom.id, { size: [editWidth, editHeight, val] })
                }}
                step="0.5"
                min="1"
                style={{
                  width: '100%',
                  padding: '4px',
                  borderRadius: '3px',
                  border: 'none',
                  fontSize: '12px',
                  background: '#333',
                  color: 'white'
                }}
              />
            </div>
          </div>

          <button
            onClick={onDeleteRoom}
            style={{
              marginTop: '4px',
              width: '100%',
              padding: '8px',
              background: '#f44336',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            🗑️ Elimina Stanza
          </button>
        </div>
      )}

      {/* Azioni */}
      <div style={{ borderTop: '1px solid #444', paddingTop: '15px' }}>
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            padding: '10px',
            background: '#4CAF50',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}
        >
          💾 Salva Configurazione
        </button>

        <label style={{
          width: '100%',
          padding: '10px',
          background: '#2196F3',
          border: 'none',
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          display: 'block',
          textAlign: 'center'
        }}>
          📂 Carica Configurazione
          <input 
            type="file" 
            accept=".json" 
            onChange={handleLoad}
            style={{ display: 'none' }}
          />
        </label>

        <button
          onClick={onAddRoom}
          style={{
            width: '100%',
            padding: '10px',
            background: '#FF9800',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            marginTop: '8px'
          }}
        >
          ➕ Nuova Stanza
        </button>
      </div>

      {/* Istruzioni */}
      <div style={{
        fontSize: '11px',
        color: '#888',
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: '1px solid #444',
        lineHeight: '1.6'
      }}>
        <div><strong>SCORCIATOIE:</strong></div>
        <div>• ESC: Deseleziona</div>
        <div>• CANC: Elimina selezionata</div>
        <div>• 1-5: Cambia modalità</div>
      </div>
    </div>
  )
}
