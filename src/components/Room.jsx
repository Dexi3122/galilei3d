import React, { useState } from 'react'
import { Text, Html } from '@react-three/drei'
import { Video } from 'lucide-react'
import Wall from './Wall'

// Componente per una singola stanza con muri
export default function Room({ 
  name, 
  position, 
  size, 
  color, 
  onHover,
  onRoomClick,
  doors = [], // Array di porte: { wall: 'north'|'south'|'east'|'west', position: 0-1 }
  hasMedia = false // Indica se la stanza ha video/foto
}) {
  const [hovered, setHovered] = useState(false)
  
  const [x, y, z] = position
  const [width, height, depth] = size
  
  const wallHeight = height
  const wallColor = hovered ? '#FFFFCC' : '#FFF9E6'
  const floorColor = hovered ? '#FFFFFF' : color

  const handlePointerOver = () => {
    setHovered(true)
    onHover(name)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    onHover(null)
    document.body.style.cursor = 'default'
  }

  const handleClick = (e) => {
    e.stopPropagation()
    if (onRoomClick) {
      onRoomClick(name)
    }
  }

  // Definizione degli angoli della stanza
  const corners = {
    nw: [x - width/2, y, z - depth/2], // Nord-Ovest
    ne: [x + width/2, y, z - depth/2], // Nord-Est
    se: [x + width/2, y, z + depth/2], // Sud-Est
    sw: [x - width/2, y, z + depth/2], // Sud-Ovest
  }

  // Verifica se un muro ha una porta
  const getDoorsForWall = (wallName) => {
    return doors
      .filter(d => d.wall === wallName && d.exists !== false)
      .map(d => ({ position: d.position, width: 1.5 }))
  }

  // Verifica se un muro esiste
  const wallExists = (wallName) => {
    // Il muro esiste a meno che non ci sia una porta con exists: false
    const door = doors.find(d => d.wall === wallName && d.exists === false)
    return door === undefined
  }

  return (
    <group>
      {/* Pavimento della stanza */}
      <mesh 
        position={[x, y + 0.05, z]} 
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <planeGeometry args={[width - 0.1, depth - 0.1]} />
        <meshStandardMaterial 
          color={floorColor}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Muro Nord */}
      {wallExists('north') && (
        <Wall 
          start={corners.nw} 
          end={corners.ne} 
          height={wallHeight}
          color={wallColor}
          doors={getDoorsForWall('north')}
        />
      )}

      {/* Muro Est */}
      {wallExists('east') && (
        <Wall 
          start={corners.ne} 
          end={corners.se} 
          height={wallHeight}
          color={wallColor}
          doors={getDoorsForWall('east')}
        />
      )}

      {/* Muro Sud */}
      {wallExists('south') && (
        <Wall 
          start={corners.se} 
          end={corners.sw} 
          height={wallHeight}
          color={wallColor}
          doors={getDoorsForWall('south')}
        />
      )}

      {/* Muro Ovest */}
      {wallExists('west') && (
        <Wall 
          start={corners.sw} 
          end={corners.nw} 
          height={wallHeight}
          color={wallColor}
          doors={getDoorsForWall('west')}
        />
      )}

      {/* Etichetta */}
      <Text
        position={[x, wallHeight + 0.3, z]}
        fontSize={0.4}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#FFFFFF"
      >
        {name}
      </Text>

      {/* Indicatore Media - Icona Video sopra la stanza */}
      {hasMedia && (
        <Html
          position={[x, wallHeight + 1, z]}
          center
          distanceFactor={10}
          zIndexRange={[0, 0]}
        >
          <div style={{
            background: 'rgba(0, 122, 255, 0.95)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 122, 255, 0.4)',
            border: '2px solid white',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            <Video size={20} color="white" strokeWidth={2.5} />
          </div>
          <style>{`
            @keyframes pulse {
              0%, 100% {
                transform: scale(1);
                opacity: 1;
              }
              50% {
                transform: scale(1.1);
                opacity: 0.9;
              }
            }
          `}</style>
        </Html>
      )}
    </group>
  )
}
