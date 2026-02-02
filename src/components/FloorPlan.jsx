import React, { useState } from 'react'
import { Text } from '@react-three/drei'
import Room from './Room'

// Componente principale della piantina
export default function FloorPlan({ setHoveredRoom }) {
  
  // Definizione delle stanze con posizione, dimensioni, colore e porte
  const rooms = [
    // Piano superiore - Aule
    { name: 'T10', position: [-15, 0, -18], size: [3, 2.5, 3], color: '#FFB74D', doors: [{wall: 'east', position: 0.5}] },
    { name: 'T09', position: [-15, 0, -14], size: [3, 2.5, 3], color: '#FFB74D', doors: [{wall: 'east', position: 0.5}] },
    { name: 'Bagno', position: [-15, 0, -10], size: [3, 2.5, 2], color: '#90CAF9', doors: [{wall: 'east', position: 0.5}] },
    { name: 'T05', position: [-18, 0, -6], size: [4, 2.5, 3], color: '#FFB74D', doors: [{wall: 'east', position: 0.5}] },
    { name: 'T04', position: [-18, 0, -2], size: [4, 2.5, 3], color: '#FFB74D', doors: [{wall: 'east', position: 0.5}] },
    
    { name: 'T08', position: [-9, 0, -12], size: [5, 2.5, 3.5], color: '#FFB74D', doors: [{wall: 'south', position: 0.5}] },
    { name: 'T07', position: [-5, 0, -14], size: [3, 2.5, 4], color: '#FFB74D', doors: [{wall: 'south', position: 0.5}] },
    { name: 'T06', position: [-5, 0, -9], size: [3, 2.5, 4], color: '#FFB74D', doors: [{wall: 'south', position: 0.5}] },
    { name: 'T12', position: [-1, 0, -6], size: [3, 2.5, 4], color: '#FFB74D', doors: [{wall: 'south', position: 0.5}] },
    
    { name: 'Blank 1', position: [-10, 0, -2], size: [3.5, 2.5, 3], color: '#BDBDBD', doors: [{wall: 'north', position: 0.5}] },
    { name: 'Blank 2', position: [-5, 0, -2], size: [3.5, 2.5, 3], color: '#BDBDBD', doors: [{wall: 'north', position: 0.5}] },
    { name: 'Blank 3', position: [0, 0, -2], size: [2.5, 2.5, 3], color: '#BDBDBD', doors: [{wall: 'north', position: 0.5}] },
    
    // Zona centrale e sinistra
    { name: 'Deposito 1', position: [-22, 0, 2], size: [4, 2.5, 3], color: '#A1887F', doors: [{wall: 'east', position: 0.5}] },
    { name: 'Deposito 2', position: [-18, 0, 6], size: [3, 2.5, 3], color: '#A1887F', doors: [{wall: 'south', position: 0.5}] },
    { name: 'Sala Docenti', position: [-13, 0, 6], size: [4, 2.5, 3], color: '#CE93D8', doors: [{wall: 'south', position: 0.5}] },
    { name: 'Bar', position: [-18, 0, 10], size: [4, 2.5, 3], color: '#F48FB1', doors: [{wall: 'south', position: 0.5}] },
    { name: 'Auditorium', position: [-18, 0, 16], size: [8, 2.5, 10], color: '#81C784', doors: [{wall: 'east', position: 0.3}, {wall: 'east', position: 0.7}] },
    
    // Palestre
    { name: 'Palestra Scoperta', position: [-5, 0, 7], size: [10, 2.5, 8], color: '#4DB6AC', doors: [{wall: 'south', position: 0.5}] },
    { name: 'Palestra Coperta', position: [7, 0, 3], size: [9, 2.5, 6], color: '#4DD0E1', doors: [{wall: 'north', position: 0.5}] },
    
    // Spogliatoi e Laboratori
    { name: 'Spogliatoi', position: [13, 0, 11], size: [10, 2.5, 6], color: '#AED581', doors: [{wall: 'south', position: 0.3}] },
    
    { name: 'Lab Linguistico', position: [-3, 0, 16], size: [7, 2.5, 5], color: '#FFD54F', doors: [{wall: 'north', position: 0.5}] },
    { name: 'Lab Fisica', position: [4, 0, 16], size: [4, 2.5, 5], color: '#FFD54F', doors: [{wall: 'north', position: 0.5}] },
    { name: 'Lab Biologia', position: [9, 0, 16], size: [4, 2.5, 5], color: '#FFD54F', doors: [{wall: 'north', position: 0.5}] },
    { name: 'Lab Chimica', position: [14, 0, 16], size: [4, 2.5, 5], color: '#FFD54F', doors: [{wall: 'north', position: 0.5}] },
    { name: 'Blank Lab', position: [-8, 0, 14], size: [4, 2.5, 4], color: '#BDBDBD', doors: [{wall: 'east', position: 0.5}] },
  ]

  return (
    <group>
      {rooms.map((room, index) => (
        <Room
          key={index}
          name={room.name}
          position={room.position}
          size={room.size}
          color={room.color}
          doors={room.doors}
          onHover={setHoveredRoom}
        />
      ))}
      
      {/* Pavimento corridoio */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 40]} />
        <meshStandardMaterial color="#D0D0D0" />
      </mesh>
    </group>
  )
}
