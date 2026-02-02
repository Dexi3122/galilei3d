import React, { useState, useRef, useEffect } from 'react'
import { Text } from '@react-three/drei'
import Wall from './Wall'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function EditableRoom({ 
  id,
  name, 
  position, 
  size, 
  color, 
  doors = [],
  mode,
  isSelected,
  onSelect,
  onPositionChange,
  onSizeChange,
  onToggleDoor,
  onToggleWall
}) {
  const [hovered, setHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [resizeHandle, setResizeHandle] = useState(null)
  const dragPlaneRef = useRef()
  const roomStartPos = useRef({ x: 0, z: 0 })
  const roomStartSize = useRef({ width: 0, depth: 0 })
  const { camera, gl, raycaster, pointer } = useThree()

  const [x, y, z] = position
  const [width, height, depth] = size
  
  const wallHeight = height
  const wallColor = isSelected ? '#FFFFCC' : (hovered ? '#FFFFCC' : '#FFF9E6')
  const floorColor = isSelected ? '#FFF176' : (hovered ? '#FFFFFF' : color)

  // Piano invisibile per il dragging
  useEffect(() => {
    if (!dragPlaneRef.current) {
      dragPlaneRef.current = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    }
  }, [])

  const handleFloorClick = (e) => {
    e.stopPropagation()
    if (mode === 'move' || mode === 'view' || mode === 'resize') {
      onSelect(id)
    }
  }

  const handleFloorPointerDown = (e) => {
    if (mode === 'move' && isSelected) {
      e.stopPropagation()
      setIsDragging(true)
      roomStartPos.current = { x, z }
      gl.domElement.style.cursor = 'grabbing'
    }
  }

  const handleFloorPointerUp = () => {
    if (isDragging) {
      setIsDragging(false)
      setResizeHandle(null)
      gl.domElement.style.cursor = mode === 'move' ? 'grab' : 'default'
    }
  }

  const handleFloorPointerMove = (e) => {
    if (isDragging && mode === 'move' && dragPlaneRef.current) {
      e.stopPropagation()
      
      // Usa il raycaster con il piano
      const intersectionPoint = new THREE.Vector3()
      raycaster.ray.intersectPlane(dragPlaneRef.current, intersectionPoint)
      
      if (intersectionPoint) {
        onPositionChange(id, [intersectionPoint.x, y, intersectionPoint.z])
      }
    }
  }

  const handleResizePointerDown = (e, handle) => {
    if (mode === 'resize' && isSelected) {
      e.stopPropagation()
      setResizeHandle(handle)
      setIsDragging(true)
      roomStartPos.current = { x, z }
      roomStartSize.current = { width, depth }
    }
  }

  const handleResizeMove = (e) => {
    if (isDragging && resizeHandle && dragPlaneRef.current) {
      e.stopPropagation()
      
      const intersectionPoint = new THREE.Vector3()
      raycaster.ray.intersectPlane(dragPlaneRef.current, intersectionPoint)
      
      if (intersectionPoint) {
        let newWidth = width
        let newDepth = depth
        let newX = x
        let newZ = z

        const dx = intersectionPoint.x - roomStartPos.current.x
        const dz = intersectionPoint.z - roomStartPos.current.z

        switch(resizeHandle) {
          case 'east':
            newWidth = Math.max(1, roomStartSize.current.width + dx * 2)
            break
          case 'west':
            newWidth = Math.max(1, roomStartSize.current.width - dx * 2)
            break
          case 'north':
            newDepth = Math.max(1, roomStartSize.current.depth - dz * 2)
            break
          case 'south':
            newDepth = Math.max(1, roomStartSize.current.depth + dz * 2)
            break
        }

        onSizeChange(id, [newWidth, height, newDepth])
      }
    }
  }

  const handleWallClick = (e, wallName) => {
    e.stopPropagation()
    
    if (mode === 'door') {
      // Calcola la posizione del click sul muro (0-1)
      const point = e.point
      let clickPosition = 0.5
      
      switch(wallName) {
        case 'north':
        case 'south':
          // Per muri est-ovest, usa la coordinata X
          const wallStartX = x - width/2
          const wallEndX = x + width/2
          clickPosition = (point.x - wallStartX) / (wallEndX - wallStartX)
          break
        case 'east':
        case 'west':
          // Per muri nord-sud, usa la coordinata Z
          const wallStartZ = z - depth/2
          const wallEndZ = z + depth/2
          clickPosition = (point.z - wallStartZ) / (wallEndZ - wallStartZ)
          break
      }
      
      // Limita tra 0.1 e 0.9 per non mettere porte agli angoli
      clickPosition = Math.max(0.1, Math.min(0.9, clickPosition))
      
      onToggleDoor(id, wallName, clickPosition)
    } else if (mode === 'wall') {
      onToggleWall(id, wallName)
    }
  }

  const corners = {
    nw: [x - width/2, y, z - depth/2],
    ne: [x + width/2, y, z - depth/2],
    se: [x + width/2, y, z + depth/2],
    sw: [x - width/2, y, z + depth/2],
  }

  const getDoorsForWall = (wallName) => {
    return doors.filter(d => d.wall === wallName && d.exists !== false)
  }

  const wallExists = (wallName) => {
    // Il muro esiste a meno che non ci sia una porta con exists: false
    const door = doors.find(d => d.wall === wallName && d.exists === false)
    return door === undefined
  }

  return (
    <group>
      {/* Pavimento */}
      <mesh 
        position={[x, y + 0.05, z]} 
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        onClick={handleFloorClick}
        onPointerDown={handleFloorPointerDown}
        onPointerUp={handleFloorPointerUp}
        onPointerMove={(e) => {
          handleFloorPointerMove(e)
          handleResizeMove(e)
        }}
        onPointerOver={() => {
          setHovered(true)
          if (mode === 'move') gl.domElement.style.cursor = 'grab'
        }}
        onPointerOut={() => {
          setHovered(false)
          if (!isDragging) gl.domElement.style.cursor = 'default'
        }}
      >
        <planeGeometry args={[width - 0.1, depth - 0.1]} />
        <meshStandardMaterial 
          color={floorColor}
          emissive={isSelected ? '#FDD835' : (hovered ? color : '#000000')}
          emissiveIntensity={isSelected ? 0.3 : (hovered ? 0.2 : 0)}
        />
      </mesh>

      {/* Resize Handles - visibili solo in modalità resize */}
      {isSelected && mode === 'resize' && (
        <>
          {/* Handle Est */}
          <mesh
            position={[x + width/2, y + height/2, z]}
            onPointerDown={(e) => handleResizePointerDown(e, 'east')}
            onPointerMove={handleResizeMove}
            onPointerUp={handleFloorPointerUp}
            onPointerOver={() => gl.domElement.style.cursor = 'ew-resize'}
            onPointerOut={() => gl.domElement.style.cursor = 'default'}
          >
            <boxGeometry args={[0.3, height, 0.3]} />
            <meshStandardMaterial color="#2196F3" emissive="#2196F3" emissiveIntensity={0.5} />
          </mesh>

          {/* Handle Ovest */}
          <mesh
            position={[x - width/2, y + height/2, z]}
            onPointerDown={(e) => handleResizePointerDown(e, 'west')}
            onPointerMove={handleResizeMove}
            onPointerUp={handleFloorPointerUp}
            onPointerOver={() => gl.domElement.style.cursor = 'ew-resize'}
            onPointerOut={() => gl.domElement.style.cursor = 'default'}
          >
            <boxGeometry args={[0.3, height, 0.3]} />
            <meshStandardMaterial color="#2196F3" emissive="#2196F3" emissiveIntensity={0.5} />
          </mesh>

          {/* Handle Nord */}
          <mesh
            position={[x, y + height/2, z - depth/2]}
            onPointerDown={(e) => handleResizePointerDown(e, 'north')}
            onPointerMove={handleResizeMove}
            onPointerUp={handleFloorPointerUp}
            onPointerOver={() => gl.domElement.style.cursor = 'ns-resize'}
            onPointerOut={() => gl.domElement.style.cursor = 'default'}
          >
            <boxGeometry args={[0.3, height, 0.3]} />
            <meshStandardMaterial color="#2196F3" emissive="#2196F3" emissiveIntensity={0.5} />
          </mesh>

          {/* Handle Sud */}
          <mesh
            position={[x, y + height/2, z + depth/2]}
            onPointerDown={(e) => handleResizePointerDown(e, 'south')}
            onPointerMove={handleResizeMove}
            onPointerUp={handleFloorPointerUp}
            onPointerOver={() => gl.domElement.style.cursor = 'ns-resize'}
            onPointerOut={() => gl.domElement.style.cursor = 'default'}
          >
            <boxGeometry args={[0.3, height, 0.3]} />
            <meshStandardMaterial color="#2196F3" emissive="#2196F3" emissiveIntensity={0.5} />
          </mesh>
        </>
      )}

      {/* Muri con interattività */}
      {wallExists('north') && (
        <group 
          onClick={(e) => handleWallClick(e, 'north')}
          onPointerOver={(e) => {
            e.stopPropagation()
            if (mode === 'door' || mode === 'wall') gl.domElement.style.cursor = 'pointer'
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            gl.domElement.style.cursor = 'default'
          }}
        >
          <Wall 
            start={corners.nw} 
            end={corners.ne} 
            height={wallHeight}
            color={wallColor}
            doors={getDoorsForWall('north')}
          />
        </group>
      )}

      {wallExists('east') && (
        <group 
          onClick={(e) => handleWallClick(e, 'east')}
          onPointerOver={(e) => {
            e.stopPropagation()
            if (mode === 'door' || mode === 'wall') gl.domElement.style.cursor = 'pointer'
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            gl.domElement.style.cursor = 'default'
          }}
        >
          <Wall 
            start={corners.ne} 
            end={corners.se} 
            height={wallHeight}
            color={wallColor}
            doors={getDoorsForWall('east')}
          />
        </group>
      )}

      {wallExists('south') && (
        <group 
          onClick={(e) => handleWallClick(e, 'south')}
          onPointerOver={(e) => {
            e.stopPropagation()
            if (mode === 'door' || mode === 'wall') gl.domElement.style.cursor = 'pointer'
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            gl.domElement.style.cursor = 'default'
          }}
        >
          <Wall 
            start={corners.se} 
            end={corners.sw} 
            height={wallHeight}
            color={wallColor}
            doors={getDoorsForWall('south')}
          />
        </group>
      )}

      {wallExists('west') && (
        <group 
          onClick={(e) => handleWallClick(e, 'west')}
          onPointerOver={(e) => {
            e.stopPropagation()
            if (mode === 'door' || mode === 'wall') gl.domElement.style.cursor = 'pointer'
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            gl.domElement.style.cursor = 'default'
          }}
        >
          <Wall 
            start={corners.sw} 
            end={corners.nw} 
            height={wallHeight}
            color={wallColor}
            doors={getDoorsForWall('west')}
          />
        </group>
      )}

      {/* Etichetta */}
      <Text
        position={[x, wallHeight + 0.3, z]}
        fontSize={0.4}
        color={isSelected ? '#000000' : '#333333'}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor={isSelected ? '#FFEB3B' : '#FFFFFF'}
      >
        {name}
      </Text>
    </group>
  )
}
