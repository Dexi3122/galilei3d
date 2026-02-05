import React, { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Move3d, ZoomIn, MapPin, Video, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import Room from './components/Room'
import EditableRoom from './components/EditableRoom'
import EditorControls from './components/EditorControls'
import Home from './components/Home'

// Mappatura dei media per laboratori e planetario
const roomMedia = {
  'Planetario': [
    { type: 'video', url: '/assets/Planetario3.mp4', title: 'Tour Planetario' },
  ],
  'Lab Linguistico': [
    { type: 'video', url: '/assets/LabLing.mp4', title: 'Tour Lab Linguistico' },
  ],
  'Lab Fisica': [
    { type: 'video', url: '/assets/LabFisica1.mp4', title: 'Esperimenti Fisica' },
    { type: 'video', url: '/assets/LabFisica2.mp4', title: 'Strumentazione' },
  ],
  'Lab Chimica': [
    { type: 'video', url: '/assets/LabChimica2.mp4', title: 'Tour Lab Chimica' },
  ],
  'Lab Informatica': [
    { type: 'video', url: '/assets/LabInfo.mp4', title: 'Aula Computer' },
  ],
  'Lab Biologia': [
    { type: 'video', url: '/assets/LabBio.mp4', title: 'Tour Lab Biologia' },
  ],
  'Palestra Interna': [
    { type: 'video', url: '/assets/Palestra interna.mp4', title: 'Tour Palestra Interna' },
  ],
  'Palestra Scoperta superiore': [
    { type: 'image', url: '/assets/Palestraest.png', title: 'Palestra Esterna' },
  ],
  'Auditorium': [
    { type: 'video', url: '/assets/Auditorium.mp4', title: 'Tour Auditorium' },
  ],
  'Bar': [
    { type: 'video', url: '/assets/Bar.mp4', title: 'Tour Bar' },
  ],
  'Biblioteca': [
    { type: 'video', url: '/assets/Biblioteca.mp4', title: 'Tour Biblioteca' },
  ],
  'Orto': [
    { type: 'video', url: '/assets/Orto.mp4', title: 'Tour Orto' },
  ],
  
}

// Configurazione della pianta - Galileo Galilei
const rooms = [
  {
    "id": 1,
    "name": "T10",
    "position": [-15.70395272459021, 0, -17.712439051099206],
    "size": [4, 2.5, 4],
    "color": "#FFB74D",
    "doors": [{"wall": "west", "position": 0.4854351934940633}]
  },
  {
    "id": 42,
    "name": "Orto",
    "position": [-21.70395272459021, 0, -17.712439051099206],
    "size": [3, 2.5, 4],
    "color": "#1eff00",
    "doors": [
      {"wall": "north", "position": 0.5, "exists": false},
      {"wall": "south", "position": 0.5, "exists": false},
      {"wall": "east", "position": 0.5, "exists": false},
      {"wall": "west", "position": 0.5, "exists": false}
    ]
  },
  {
    "id": 2,
    "name": "T09",
    "position": [-15.72588511116688, 0, -13.895969180769569],
    "size": [4, 2.5, 3.5],
    "color": "#FFB74D",
    "doors": [{"wall": "west", "position": 0.4479524109542576}]
  },
  {
    "id": 3,
    "name": "Bagno",
    "position": [-15.742373036697655, 0, -8.93419137790676],
    "size": [4, 2.5, 2],
    "color": "#90CAF9",
    "doors": [{"wall": "east", "position": 0.5}]
  },
  {
    "id": 4,
    "name": "T04",
    "position": [-15.81751057636908, 0, -3.2199455637985235],
    "size": [4, 2.5, 3],
    "color": "#FFB74D",
    "doors": [
      {"wall": "west", "position": 0.5474696299822194},
      {"wall": "east", "position": 0.1},
      {"wall": "east", "position": 0.27040038634610797}
    ]
  },
  {
    "id": 5,
    "name": "T05",
    "position": [-15.729422652603134, 0, -6.282209170615245],
    "size": [4, 2.5, 3],
    "color": "#FFB74D",
    "doors": [
      {"wall": "south", "position": 0.7115072855366047},
      {"wall": "west", "position": 0.4364384518762645}
    ]
  },
  {
    "id": 6,
    "name": "Bagno",
    "position": [-11.215908051344591, 0, -13.941779344412266],
    "size": [5, 2.5, 3.5],
    "color": "#3df0e4",
    "doors": [{"wall": "south", "position": 0.5}]
  },
  {
    "id": 7,
    "name": "T07",
    "position": [-0.9589661907766533, 0, -13.80599368118904],
    "size": [6, 2.5, 4],
    "color": "#FFB74D",
    "doors": [
      {"wall": "south", "position": 0.23430995221383047},
      {"wall": "south", "position": 0.633945482009952}
    ]
  },
  {
    "id": 8,
    "name": "T06",
    "position": [0.41136434628575813, 0, -9.759790957389198],
    "size": [3, 2.5, 4],
    "color": "#FFB74D",
    "doors": [{"wall": "west", "position": 0.48828829425694575}]
  },
  {
    "id": 9,
    "name": "T08",
    "position": [-5.667881672596701, 0, -13.755604146239207],
    "size": [3, 2.5, 4],
    "color": "#FFB74D",
    "doors": [{"wall": "south", "position": 0.5}]
  },
  {
    "id": 10,
    "name": "Corridoio",
    "position": [-15.17611469975205, 0, -0.03367834486880028],
    "size": [12, 2.5, 3],
    "color": "#BDBDBD",
    "doors": [
      {"wall": "east", "position": 0.7774647365338865},
      {"wall": "north", "position": 0.16481926129702987},
      {"wall": "north", "position": 0.7492991286158193}
    ]
  },
  {
    "id": 11,
    "name": "Planetario",
    "position": [-7.678323175327824, 0, -3.6472864672445318],
    "size": [5, 2.5, 4],
    "color": "#003cff",
    "doors": [{"wall": "north", "position": 0.5}]
  },
  {
    "id": 12,
    "name": "Biblioteca",
    "position": [-1.976960850293107, 0, -4.761966547593508],
    "size": [6, 2.5, 6],
    "color": "#ff2626",
    "doors": [
      {"wall": "north", "position": 0.5},
      {"wall": "west", "position": 0.14958365410720256},
      {"wall": "east", "position": 0.41418179818556106}
    ]
  },
  {
    "id": 13,
    "name": "Deposito 1",
    "position": [-15.196468286957868, 0, 3.557746543914001],
    "size": [12, 2.5, 4],
    "color": "#A1887F",
    "doors": []
  },
  {
    "id": 14,
    "name": "Deposito Bar",
    "position": [-17.18311820606379, 0, 7.222121532408622],
    "size": [8, 2.5, 3],
    "color": "#A1887F",
    "doors": [{"wall": "south", "position": 0.5, "exists": false}]
  },
  {
    "id": 15,
    "name": "Sala Docenti",
    "position": [-11.077527430607185, 0, 8.66881514148968],
    "size": [4, 2.5, 6],
    "color": "#CE93D8",
    "doors": [{"wall": "south", "position": 0.5}]
  },
  {
    "id": 16,
    "name": "Bar",
    "position": [-17.20038135253496, 0, 10.165555313695407],
    "size": [8, 2.5, 3],
    "color": "#F48FB1",
    "doors": [
      {"wall": "south", "position": 0.5},
      {"wall": "north", "position": 0.1}
    ]
  },
  {
    "id": 17,
    "name": "Auditorium",
    "position": [-16.685175035267335, 0, 21.128337262788396],
    "size": [8, 2.5, 10],
    "color": "#81C784",
    "doors": [
      {"wall": "east", "position": 0.3},
      {"wall": "east", "position": 0.7},
      {"wall": "north", "position": 0.7863991285786709}
    ]
  },
  {
    "id": 21,
    "name": "Lab Linguistico",
    "position": [1.716497616598889, 0, 18.07256280967207],
    "size": [6.5, 2.5, 5],
    "color": "#ffd500",
    "doors": [{"wall": "north", "position": 0.5}]
  },
  {
    "id": 22,
    "name": "Lab Informatica",
    "position": [7.010622507979894, 0, 18.079812209524157],
    "size": [4, 2.5, 5],
    "color": "#ffd500",
    "doors": [{"wall": "north", "position": 0.5}]
  },
  {
    "id": 24,
    "name": "Lab Chimica",
    "position": [21.04859669637341, 0, 18.13807188989171],
    "size": [4.5, 2.5, 5.5],
    "color": "#FFD54F",
    "doors": [{"wall": "west", "position": 0.2940080509795107}]
  },
  {
    "id": 25,
    "name": "Oggetti Smarriti",
    "position": [23.64417691231009, 0, 9.111357505211638],
    "size": [1.5, 2.5, 3],
    "color": "#9E9E9E",
    "doors": [{"wall": "north", "position": 0.5}]
  },
  {
    "id": 26,
    "name": "Lab Fisica",
    "position": [11.004955361718284, 0, 18.096698450145098],
    "size": [4, 2.5, 5],
    "color": "#ffd500",
    "doors": [{"wall": "north", "position": 0.5}]
  },
  {
    "id": 27,
    "name": "Lab Biologia",
    "position": [15.041564329457152, 0, 18.607230234614732],
    "size": [4, 2.5, 4],
    "color": "#ffd500",
    "doors": [
      {"wall": "east", "position": 0.7352560604704861}
    ]
  },
  {
    "id": 29,
    "name": "T03",
    "position": [20.92549146938011, 0, 9.646006513737937],
    "size": [4, 2.5, 4],
    "color": "#ffbd42",
    "doors": [{"wall": "west", "position": 0.685198065166988}]
  },
  {
    "id": 30,
    "name": "Ping Pong 1",
    "position": [27.51639467701509, 0, 3.0073560746005485],
    "size": [1.5, 2.5, 9],
    "color": "#c62424",
    "doors": [
      {"wall": "north", "position": 0.5},
      {"wall": "north", "position": 0.6609442164977608},
      {"wall": "east", "position": 0.5, "exists": false},
      {"wall": "west", "position": 0.32664215406360525},
      {"wall": "west", "position": 0.5959478164848188}
    ]
  },
  {
    "id": 31,
    "name": "Palestra Scoperta Inferiore",
    "position": [19.37454371008593, 0, 2.92046505888087],
    "size": [15, 2.5, 9],
    "color": "#c62424",
    "doors": [
      {"wall": "east", "position": 0.5, "exists": false},
      {"wall": "west", "position": 0.45577221007034535, "exists": false},
    ]
  },
  {
    "id": 32,
    "name": "Palestra Interna",
    "position": [36.802460527853334, 0, 5.766440836403358],
    "size": [17, 2.5, 14.5],
    "color": "#009dff",
    "doors": [
      {"wall": "west", "position": 0.43515521875146085},
      {"wall": "west", "position": 0.21657405297246193},
      {"wall": "south", "position": 0.7669162893723329}
    ]
  },
  {
    "id": 33,
    "name": "Palestra Scoperta superiore",
    "position": [2.964585161388925, 0, 2.981555386938668],
    "size": [19.5, 4.5, 9],
    "color": "#c62424",
    "doors": [{"wall": "east", "position": 0.7622840049128158, "exists": false}]
  },
  {
    "id": 34,
    "name": "Spogliatoio Maschile",
    "position": [32.98402498732021, 0, 18.115361802146833],
    "size": [9.5, 2.5, 6],
    "color": "#2b00ff",
    "doors": [{"wall": "west", "position": 0.21908305258622818}]
  },
  {
    "id": 35,
    "name": "Spogliatoio Femminile",
    "position": [41.080743942710114, 0, 16.859736353014565],
    "size": [6.5, 2.5, 7.5],
    "color": "#ef1fde",
    "doors": [
      {"wall": "north", "position": 0.5},
      {"wall": "west", "position": 0.15855254231773303}
    ]
  },
  {
    "id": 36,
    "name": "Bagno",
    "position": [13.484732772893024, 0, 9.496344581135755],
    "size": [11, 2.5, 4],
    "color": "#cfcfcf",
    "doors": [
      {"wall": "south", "position": 0.5},
    ]
  },
  {
    "id": 37,
    "name": "T01",
    "position": [-6.647855444696387, 0, 17.677198316281306],
    "size": [4, 2.5, 4],
    "color": "#ffbb00",
    "doors": [{"wall": "north", "position": 0.5}]
  },
  {
    "id": 38,
    "name": "T02",
    "position": [-10.598198208012972, 0, 17.593363578592967],
    "size": [4, 2.5, 4],
    "color": "#f4a806",
    "doors": [{"wall": "north", "position": 0.5}]
  },
  {
    "id": 40,
    "name": "T12",
    "position": [2.966168999700866, 0, -3.371123594865411],
    "size": [4, 2.5, 4],
    "color": "#9E9E9E",
    "doors": [
      {"wall": "north", "position": 0.5},
      {"wall": "west", "position": 0.2514148578318187}
    ]
  },
  {
    "id": 41,
    "name": "T11",
    "position": [3.9454264292092525, 0, -7.391257799164955],
    "size": [4, 2.5, 4],
    "color": "#9E9E9E",
    "doors": [{"wall": "west", "position": 0.6967035706607564}]
  }
]

function App() {
  const [showHome, setShowHome] = useState(true)
  const [hoveredRoom, setHoveredRoom] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [editorMode, setEditorMode] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState(null)
  const [mode, setMode] = useState('view')
  const [roomsData, setRoomsData] = useState(rooms)
  const orbitControlsRef = useRef()
  
  // Rilevamento mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768

  // Esponi funzioni globali per attivare/disattivare editor
  useEffect(() => {
    window.enableEditor = () => {
      setEditorMode(true)
      console.log('✅ Modalità editor attivata! Usa i controlli sulla destra.')
    }
    window.disableEditor = () => {
      setEditorMode(false)
      setSelectedRoomId(null)
      setMode('view')
      console.log('✅ Modalità editor disattivata.')
    }
    console.log('💡 Digita window.enableEditor() per attivare i controlli di editing')
    return () => {
      delete window.enableEditor
      delete window.disableEditor
    }
  }, [])

  // Gestione tasti scorciatoia (solo in modalità editor)
  useEffect(() => {
    if (!editorMode) return
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedRoomId(null)
      } else if (e.key === 'Delete' && selectedRoomId) {
        handleDeleteRoom()
      } else if (e.key === 'q' || e.key === 'Q') {
        setMode('view')
      } else if (e.key === 'w' || e.key === 'W') {
        setMode('move')
      } else if (e.key === 'e' || e.key === 'E') {
        setMode('resize')
      } else if (e.key === 'r' || e.key === 'R') {
        setMode('door')
      } else if (e.key === 't' || e.key === 'T') {
        setMode('wall')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [editorMode, selectedRoomId])

  // Disabilita OrbitControls quando si sposta una stanza
  useEffect(() => {
    if (orbitControlsRef.current && editorMode) {
      orbitControlsRef.current.enabled = mode !== 'move' || !selectedRoomId
    }
  }, [mode, selectedRoomId, editorMode])

  const handlePositionChange = (id, newPosition) => {
    setRoomsData(roomsData.map(room => 
      room.id === id ? { ...room, position: newPosition } : room
    ))
  }

  const handleSizeChange = (id, newSize) => {
    setRoomsData(roomsData.map(room => 
      room.id === id ? { ...room, size: newSize } : room
    ))
  }

  const handleUpdateRoom = (id, updates) => {
    setRoomsData(roomsData.map(room => 
      room.id === id ? { ...room, ...updates } : room
    ))
  }

  const handleToggleDoor = (id, wallName, clickPosition) => {
    setRoomsData(roomsData.map(room => {
      if (room.id === id) {
        const nearbyDoorIndex = room.doors.findIndex(d => 
          d.wall === wallName && 
          d.exists !== false &&
          Math.abs(d.position - clickPosition) < 0.15
        )
        
        if (nearbyDoorIndex >= 0) {
          return {
            ...room,
            doors: room.doors.filter((_, i) => i !== nearbyDoorIndex)
          }
        } else {
          return {
            ...room,
            doors: [...room.doors, { wall: wallName, position: clickPosition }]
          }
        }
      }
      return room
    }))
  }

  const handleToggleWall = (id, wallName) => {
    setRoomsData(roomsData.map(room => {
      if (room.id === id) {
        // Cerca se esiste già un muro nascosto (porta con exists: false)
        const hiddenWallIndex = room.doors.findIndex(d => d.wall === wallName && d.exists === false)
        
        if (hiddenWallIndex >= 0) {
          // Il muro è nascosto -> lo rimuoviamo per farlo riapparire
          return {
            ...room,
            doors: room.doors.filter((_, i) => i !== hiddenWallIndex)
          }
        } else {
          // Il muro è visibile -> lo nascondiamo aggiungendo una porta con exists: false
          return {
            ...room,
            doors: [...room.doors, { wall: wallName, position: 0.5, exists: false }]
          }
        }
      }
      return room
    }))
  }

  const handleDeleteRoom = () => {
    setRoomsData(roomsData.filter(room => room.id !== selectedRoomId))
    setSelectedRoomId(null)
  }

  const handleAddRoom = () => {
    const newId = Math.max(...roomsData.map(r => r.id), 0) + 1
    const newRoom = {
      id: newId,
      name: `Nuova ${newId}`,
      position: [0, 0, 0],
      size: [4, 2.5, 4],
      color: '#9E9E9E',
      doors: [{wall: 'north', position: 0.5}]
    }
    setRoomsData([...roomsData, newRoom])
    setSelectedRoomId(newId)
    setMode('move')
  }

  const handleSave = () => {
    const config = { rooms: roomsData }
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'galilei3d-config.json'
    a.click()
    URL.revokeObjectURL(url)
    console.log('✅ Configurazione salvata!')
  }

  const handleLoad = (config) => {
    if (config.rooms) {
      setRoomsData(config.rooms)
      setSelectedRoomId(null)
    }
  }

  const handleRoomClick = (roomName) => {
    if (roomMedia[roomName]) {
      setSelectedRoom(roomName)
      setCurrentMediaIndex(0)
    }
  }

  const closeModal = () => {
    setSelectedRoom(null)
    setCurrentMediaIndex(0)
  }

  const nextMedia = () => {
    if (selectedRoom && roomMedia[selectedRoom]) {
      setCurrentMediaIndex((prev) => 
        (prev + 1) % roomMedia[selectedRoom].length
      )
    }
  }

  const prevMedia = () => {
    if (selectedRoom && roomMedia[selectedRoom]) {
      setCurrentMediaIndex((prev) => 
        prev === 0 ? roomMedia[selectedRoom].length - 1 : prev - 1
      )
    }
  }

  const currentMedia = selectedRoom ? roomMedia[selectedRoom]?.[currentMediaIndex] : null

  // Calcola posizione del sole in base all'ora
  const getSunPosition = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const timeInHours = hours + minutes / 60
    
    // Il sole si muove da est (mattina) a ovest (sera)
    // Ore 6: est, ore 12: sopra, ore 18: ovest
    const angle = ((timeInHours - 6) / 12) * Math.PI // da -π a π
    const height = Math.sin(angle) * 50 + 20 // altezza tra 20 e 70
    const distance = 60
    
    return [
      Math.cos(angle) * distance, // x: da est a ovest
      Math.max(height, 10), // y: altezza minima 10
      Math.sin(angle) * distance * 0.3 // z: leggera variazione
    ]
  }

  const sunPosition = getSunPosition()
  const currentHour = new Date().getHours()
  const isDaytime = currentHour >= 6 && currentHour < 20
  const sunIntensity = isDaytime ? 1.2 : 0.3

  return (
    <>
      {/* Home Page */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        transform: showHome ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: showHome ? 1000 : 0,
        overflow: 'auto'
      }}>
        <Home onEnter={() => setShowHome(false)} />
      </div>

      {/* 3D Model Page */}
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative',
        opacity: showHome ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: showHome ? 'none' : 'auto'
      }}>
      {/* Editor Controls */}
      {editorMode && !isMobile && (
        <EditorControls
          mode={mode}
          setMode={setMode}
          selectedRoom={roomsData.find(r => r.id === selectedRoomId)}
          onDeleteRoom={handleDeleteRoom}
          onUpdateRoom={handleUpdateRoom}
          onSave={handleSave}
          onLoad={handleLoad}
          onAddRoom={handleAddRoom}
        />
      )}

      {/* Info panel */}
      <div style={{
        position: 'absolute',
        top: isMobile ? 12 : 24,
        left: isMobile ? 12 : 24,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        color: '#1a1a1a',
        padding: isMobile ? '12px 16px' : '20px 24px',
        borderRadius: '4px',
        border: '1px solid rgba(0,0,0,0.08)',
        zIndex: 10,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        maxWidth: isMobile ? 'calc(100vw - 24px)' : 'auto'
      }}>
        <button
          onClick={() => setShowHome(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0 0 12px 0',
            margin: 0,
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '500',
            letterSpacing: '-0.01em',
            color: '#1a1a1a',
            transition: 'opacity 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          <ArrowLeft size={isMobile ? 18 : 20} strokeWidth={2} />
          <span>Indietro</span>
        </button>
        {!isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ margin: 0, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', color: '#666' }}>
              <Move3d size={14} strokeWidth={1.5} /> Trascina per ruotare
            </p>
            <p style={{ margin: 0, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', color: '#666' }}>
              <ZoomIn size={14} strokeWidth={1.5} /> Scroll per zoom
            </p>
          </div>
        )}
        {hoveredRoom && (
          <p style={{ margin: isMobile ? '8px 0 0 0' : '16px 0 0 0', paddingTop: isMobile ? '8px' : '16px', borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: isMobile ? '12px' : '13px', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
            <MapPin size={14} strokeWidth={1.5} /> {hoveredRoom}
            {roomMedia[hoveredRoom] && <Video size={14} strokeWidth={1.5} />}
          </p>
        )}
      </div>

      {/* Media Modal */}
      {selectedRoom && currentMedia && currentMedia.type && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.2s ease-out'
        }} onClick={closeModal}>
          <div style={{
            position: 'relative',
            maxWidth: isMobile ? '100vw' : '900px',
            width: isMobile ? '100vw' : '90vw',
            height: isMobile ? '100vh' : 'auto',
            maxHeight: isMobile ? '100vh' : '90vh',
            background: '#ffffff',
            borderRadius: isMobile ? '0' : '8px',
            padding: isMobile ? '60px 20px 20px 20px' : '40px',
            boxShadow: isMobile ? 'none' : '0 4px 24px rgba(0,0,0,0.12)',
            animation: 'slideUp 0.3s ease-out',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: isMobile ? '45px' : '20px',
                right: isMobile ? '16px' : '20px',
                background: isMobile ? 'rgba(0,0,0,0.7)' : 'transparent',
                border: 'none',
                width: isMobile ? '44px' : '32px',
                height: isMobile ? '44px' : '32px',
                borderRadius: isMobile ? '50%' : '0',
                color: isMobile ? '#ffffff' : '#666',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1001,
                boxShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
              }}
              onMouseEnter={(e) => e.target.style.color = '#1a1a1a'}
              onMouseLeave={(e) => e.target.style.color = isMobile ? '#ffffff' : '#666'}
            >
              <X size={isMobile ? 24 : 20} strokeWidth={1.5} />
            </button>

            {/* Title */}
            <h2 style={{
              margin: isMobile ? '0 50px 16px 0' : '0 0 24px 0',
              color: '#1a1a1a',
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '500',
              textAlign: 'left',
              letterSpacing: '-0.02em'
            }}>
              {selectedRoom}
            </h2>

            {/* Media Content */}
            <div style={{
              background: '#f5f5f5',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '16px',
              border: '1px solid rgba(0,0,0,0.06)'
            }}>
              {currentMedia.type === 'image' ? (
                <img
                  src={currentMedia.url}
                  alt={currentMedia.title}
                  style={{
                    width: '100%',
                    maxHeight: '60vh',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              ) : (
                <video
                  src={currentMedia.url}
                  controls
                  style={{
                    width: '100%',
                    maxHeight: '60vh',
                    display: 'block'
                  }}
                />
              )}
            </div>

            {/* Media Title */}
            <p style={{
              textAlign: 'center',
              color: '#666',
              fontSize: '14px',
              marginBottom: '24px',
              fontWeight: '400'
            }}>
              {currentMedia.title}
            </p>

            {/* Navigation */}
            {roomMedia[selectedRoom].length > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px'
              }}>
                <button
                  onClick={prevMedia}
                  style={{
                    background: '#f5f5f5',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '4px',
                    width: '40px',
                    height: '40px',
                    color: '#1a1a1a',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => { e.target.style.background = '#e8e8e8'; e.target.style.borderColor = 'rgba(0,0,0,0.12)'; }}
                  onMouseLeave={(e) => { e.target.style.background = '#f5f5f5'; e.target.style.borderColor = 'rgba(0,0,0,0.08)'; }}
                >
                  <ChevronLeft size={20} strokeWidth={1.5} />
                </button>
                <span style={{ color: '#666', fontSize: '14px', fontWeight: '400' }}>
                  {currentMediaIndex + 1} / {roomMedia[selectedRoom].length}
                </span>
                <button
                  onClick={nextMedia}
                  style={{
                    background: '#f5f5f5',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '4px',
                    width: '40px',
                    height: '40px',
                    color: '#1a1a1a',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => { e.target.style.background = '#e8e8e8'; e.target.style.borderColor = 'rgba(0,0,0,0.12)'; }}
                  onMouseLeave={(e) => { e.target.style.background = '#f5f5f5'; e.target.style.borderColor = 'rgba(0,0,0,0.08)'; }}
                >
                  <ChevronRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* 3D Canvas */}
      <Canvas shadows={!isMobile}>
        <PerspectiveCamera makeDefault position={[30, 40, 30]} fov={50} />
        <OrbitControls 
          ref={orbitControlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={20}
          maxDistance={100}
          maxPolarAngle={Math.PI / 2.1}
          touches={{
            ONE: 0,
            TWO: 2
          }}
        />
        
        {/* Cielo con gradiente realistico */}
        <mesh>
          <sphereGeometry args={[200, 32, 32]} />
          <meshBasicMaterial 
            color={isDaytime ? "#87CEEB" : "#0a1929"} 
            side={2}
          />
        </mesh>
        
        {/* Orizzonte con gradiente */}
        <mesh position={[0, -10, 0]}>
          <cylinderGeometry args={[180, 180, 40, 32, 1, true]} />
          <meshBasicMaterial 
            color={isDaytime ? "#B0E0E6" : "#1a2332"}
            side={2}
            transparent
            opacity={0.6}
          />
        </mesh>
        
        {/* Sole */}
        {isDaytime && (
          <>
            <mesh position={sunPosition}>
              <sphereGeometry args={[5, 32, 32]} />
              <meshBasicMaterial color="#FDB813" />
            </mesh>
            {/* Alone del sole */}
            <mesh position={sunPosition}>
              <sphereGeometry args={[8, 32, 32]} />
              <meshBasicMaterial 
                color="#FFE5B4" 
                transparent 
                opacity={0.3}
              />
            </mesh>
          </>
        )}
        
        {/* Luce solare */}
        <ambientLight intensity={isDaytime ? 0.4 : 0.2} />
        <directionalLight
          position={sunPosition}
          intensity={sunIntensity}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
          shadow-camera-near={0.5}
          shadow-camera-far={200}
        />

        {/* Rooms */}
        {roomsData.map((room) => (
          editorMode ? (
            <EditableRoom
              key={room.id}
              {...room}
              mode={mode}
              isSelected={room.id === selectedRoomId}
              onSelect={setSelectedRoomId}
              onSizeChange={handleSizeChange}
              onPositionChange={handlePositionChange}
              onToggleDoor={handleToggleDoor}
              onToggleWall={handleToggleWall}
            />
          ) : (
            <Room
              key={room.id}
              name={room.name}
              position={room.position}
              size={room.size}
              color={room.color}
              doors={room.doors}
              onHover={setHoveredRoom}
              onRoomClick={handleRoomClick}
              hasMedia={!!roomMedia[room.name]}
            />
          )
        ))}

        {/* Ground */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -0.1, 0]} 
          receiveShadow
        >
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#c7c7c7" />
        </mesh>
      </Canvas>
    </div>
    </>
  )
}

export default App
