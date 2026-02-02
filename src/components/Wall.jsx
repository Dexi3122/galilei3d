import React from 'react'
import * as THREE from 'three'

// Componente per un singolo muro
export default function Wall({ 
  start, 
  end, 
  height = 3, 
  thickness = 0.2, 
  color = '#E8E8E8',
  doors = [], // Array di oggetti {position: 0-1, width: 1.5}
  doorWidth = 1.5
}) {
  // Calcola lunghezza e angolo del muro
  const dx = end[0] - start[0]
  const dz = end[2] - start[2]
  const length = Math.sqrt(dx * dx + dz * dz)
  const angle = Math.atan2(dz, dx)
  
  // Posizione centrale del muro
  const centerX = (start[0] + end[0]) / 2
  const centerY = height / 2
  const centerZ = (start[2] + end[2]) / 2

  if (!doors || doors.length === 0) {
    // Muro senza porte - un singolo box
    return (
      <mesh 
        position={[centerX, centerY, centerZ]} 
        rotation={[0, angle, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[length, height, thickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
    )
  }

  // Muro con porte - crea segmenti tra le porte
  const doorHeight = 2.2
  const topHeight = height - doorHeight
  
  // Ordina le porte per posizione
  const sortedDoors = [...doors].sort((a, b) => a.position - b.position)
  
  // Crea array di segmenti
  const segments = []
  let currentPos = 0
  
  sortedDoors.forEach(door => {
    const doorPos = door.position
    const dWidth = door.width || doorWidth
    const doorStart = doorPos - (dWidth / (2 * length))
    const doorEnd = doorPos + (dWidth / (2 * length))
    
    // Segmento prima della porta
    if (doorStart > currentPos + 0.05) {
      segments.push({
        type: 'wall',
        start: currentPos,
        end: doorStart,
        fullHeight: true
      })
    }
    
    // Sopra la porta
    segments.push({
      type: 'top',
      start: doorStart,
      end: doorEnd,
      position: doorPos
    })
    
    currentPos = doorEnd
  })
  
  // Ultimo segmento
  if (currentPos < 0.95) {
    segments.push({
      type: 'wall',
      start: currentPos,
      end: 1,
      fullHeight: true
    })
  }

  return (
    <group position={[centerX, 0, centerZ]} rotation={[0, angle, 0]}>
      {segments.map((seg, i) => {
        const segStart = seg.start * length - length / 2
        const segEnd = seg.end * length - length / 2
        const segWidth = (seg.end - seg.start) * length
        const segCenter = (segStart + segEnd) / 2
        
        if (seg.type === 'wall') {
          // Muro completo
          return (
            <mesh 
              key={i}
              position={[segCenter, height / 2, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[segWidth, height, thickness]} />
              <meshStandardMaterial color={color} />
            </mesh>
          )
        } else {
          // Sopra la porta
          return (
            <mesh 
              key={i}
              position={[segCenter, doorHeight + topHeight / 2, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[segWidth, topHeight, thickness]} />
              <meshStandardMaterial color={color} />
            </mesh>
          )
        }
      })}
    </group>
  )
}
