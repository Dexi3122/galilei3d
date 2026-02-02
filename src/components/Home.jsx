import React, { useState } from 'react'
import { ArrowRight, School, MapPin, Video, Beaker, Globe, BookOpen, Brain, Trophy, GraduationCap, FlaskConical, Microscope, Languages, Dumbbell, Coffee, ChevronLeft, ChevronRight } from 'lucide-react'

function Home({ onEnter }) {
  const [currentIndirizzo, setCurrentIndirizzo] = useState(0)

  const indirizzi = [
    {
      name: 'Liceo Scientifico',
      disciplines: [
        ['Religione', '1', '1', '1', '1', '1'],
        ['Disegno e St.arte', '2', '2', '2', '2', '2'],
        ['Educazione fisica', '2', '2', '2', '2', '2'],
        ['Storia', '-', '-', '2', '2', '2'],
        ['Fisica', '2', '2', '3', '3', '3'],
        ['Scienze naturali', '2', '2', '3', '3', '3'],
        ['Geostoria', '3', '3', '-', '-', '-'],
        ['Filosofia', '-', '-', '3', '3', '3'],
        ['Inglese', '3', '3', '3', '3', '3'],
        ['Latino', '3', '3', '3', '3', '3'],
        ['Italiano', '4', '4', '4', '4', '4'],
        ['Matematica', '5', '5', '4', '4', '4']
      ]
    },
    {
      name: 'Liceo Scientifico Scienze Applicate',
      disciplines: [
        ['Religione', '1', '1', '1', '1', '1'],
        ['Disegno e st.arte', '2', '2', '2', '2', '2'],
        ['Educazione fisica', '2', '2', '2', '2', '2'],
        ['Informatica', '2', '2', '2', '2', '2'],
        ['Storia', '-', '-', '2', '2', '2'],
        ['Filosofia', '-', '-', '2', '2', '2'],
        ['Fisica', '2', '2', '3', '3', '3'],
        ['Geostoria', '3', '3', '-', '-', '-'],
        ['Inglese', '3', '3', '3', '3', '3'],
        ['Italiano', '4', '4', '4', '4', '4'],
        ['Matematica', '5', '4', '4', '4', '4'],
        ['Scienze naturali', '3', '4', '5', '5', '5']
      ]
    },
    {
      name: 'Liceo Linguistico',
      disciplines: [
        ['Religione', '1', '1', '1', '1', '1'],
        ['Educazione fisica', '2', '2', '2', '2', '2'],
        ['Scienze naturali', '2', '2', '2', '2', '2'],
        ['Latino', '2', '2', '-', '-', '-'],
        ['St.arte', '-', '-', '2', '2', '2'],
        ['Storia', '-', '-', '2', '2', '2'],
        ['Filosofia', '-', '-', '2', '2', '2'],
        ['Fisica', '-', '-', '2', '2', '2'],
        ['Geostoria', '3', '3', '-', '-', '-'],
        ['Matematica', '3', '3', '2', '2', '2'],
        ['Inglese', '4', '4', '3', '3', '3'],
        ['Francese', '3', '3', '4', '4', '4'],
        ['Spagnolo', '3', '3', '4', '4', '4'],
        ['Italiano', '4', '4', '4', '4', '4']
      ]
    },
    {
      name: 'Liceo delle Scienze Umane',
      disciplines: [
        ['Religione', '1', '1', '1', '1', '1'],
        ['Educazione fisica', '2', '2', '2', '2', '2'],
        ['Scienze naturali', '2', '2', '2', '2', '2'],
        ['Diritto ed economia', '2', '2', '-', '-', '-'],
        ['St.arte', '-', '-', '2', '2', '2'],
        ['Storia', '-', '-', '2', '2', '2'],
        ['Fisica', '-', '-', '2', '2', '2'],
        ['Matematica', '3', '3', '2', '2', '2'],
        ['Latino', '3', '3', '2', '2', '2'],
        ['Geostoria', '3', '3', '-', '-', '-'],
        ['Filosofia', '-', '-', '3', '3', '3'],
        ['Inglese', '3', '3', '3', '3', '3'],
        ['Italiano', '4', '4', '4', '4', '4'],
        ['Scienze umane', '4', '4', '5', '5', '5']
      ]
    }
  ]

  const nextIndirizzo = () => {
    setCurrentIndirizzo((prev) => (prev + 1) % indirizzi.length)
  }

  const prevIndirizzo = () => {
    setCurrentIndirizzo((prev) => (prev - 1 + indirizzi.length) % indirizzi.length)
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: '"Titillium Web", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'auto',
      overflowX: 'hidden'
    }}>
      {/* Custom Scrollbar Styles */}
      <style>{`
        /* Webkit browsers (Chrome, Safari, Edge) */
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f5f5f5;
          border-left: 1px solid #e0e0e0;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #003d7a 0%, #0066cc 100%);
          border-radius: 6px;
          border: 2px solid #f5f5f5;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #0066cc 0%, #003d7a 100%);
        }
        
        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #003d7a #f5f5f5;
        }
        
        /* Prevent horizontal overflow */
        body {
          overflow-x: hidden;
        }
      `}</style>
      {/* Header istituzionale */}
      <header style={{
        background: '#003d7a',
        color: 'white',
        padding: '20px 40px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <img 
            src="https://www.liceogalileinapoli.edu.it/archivio/www.liceogalileinapoli.edu.it/wordpress/wp-content/uploads/2014/01/newlogo160.png" 
            alt="Logo Liceo Galilei"
            style={{ 
              height: '80px',
              width: 'auto'
            }} 
          />
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
              fontWeight: '600',
              margin: '0 0 4px 0',
              letterSpacing: '0.5px'
            }}>
              Liceo Scientifico Galileo Galilei
            </h1>
            <p style={{
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              margin: 0,
              opacity: 0.95,
              fontWeight: '300'
            }}>
              Napoli
            </p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div style={{
        background: 'white',
        padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 60px)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: '400',
            margin: '0 0 40px 0',
            color: '#003d7a',
            textAlign: 'left',
            lineHeight: '1.2'
          }}>
            Open Day Digitale
          </h2>

          <div style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
            lineHeight: '1.9',
            color: '#333',
            textAlign: 'justify'
          }}>
            <p style={{ margin: '0 0 20px 0' }}>
              Dopo le giornate di Open Day di quest'anno (13/12/25 e 10/01/26), durante le quali abbiamo avuto il piacere di 
              accogliervi e condividere dal vivo tante delle nostre attività, abbiamo sentito il desiderio di raccontarci anche in 
              un altro modo.
            </p>

            <p style={{ margin: '0 0 20px 0' }}>
              Nasce così il nostro <strong>Open Day digitale</strong>, pensato per tutte le famiglie che vogliono conoscere il nostro liceo, 
              anche a chi non ha potuto essere presente di persona.
            </p>

            <p style={{ margin: '0 0 40px 0' }}>
              Il nostro istituto offre <strong>quattro indirizzi di studio</strong> (Liceo Scientifico tradizionale, Liceo Scientifico Scienze applicate, 
              Liceo Linguistico e Liceo Scienze Umane), ciascuno con una propria identità, ma tutti accomunati dalla stessa 
              attenzione alla crescita culturale, umana e formativa degli studenti.
            </p>
          </div>

          <button
            onClick={onEnter}
            style={{
              background: '#003d7a',
              color: 'white',
              border: 'none',
              padding: '16px 40px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#0066cc'
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#003d7a'
              e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            Esplora la Pianta Interattiva
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div style={{
        background: '#f5f5f5',
        color: '#333'
      }}>
        {/* Indirizzi e Attività - Layout a 2 colonne */}
        <section style={{
          padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)',
          maxWidth: '1400px',
          margin: '0 auto',
          background: '#f5f5f5'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '40px',
            alignItems: 'start'
          }}>
            
            {/* COLONNA SINISTRA - Indirizzi di Studio */}
            <div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#003d7a',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '3px solid #0066cc',
                paddingBottom: '12px'
              }}>
                <GraduationCap size={36} />
                I Nostri Indirizzi di Studio
              </h2>
              <p style={{
                fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                lineHeight: '1.7',
                marginBottom: '32px',
                color: '#666'
              }}>
                Vediamo ora come sono distribuite le ore settimanali e quali discipline caratterizzano ciascun indirizzo di studio.
              </p>
              
              {/* Carousel Tabelle Orari */}
              <div style={{
                position: 'relative',
                background: 'white',
                padding: '32px',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '3px solid #0066cc',
                minHeight: '700px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Pulsanti Navigazione */}
                <button
                  onClick={prevIndirizzo}
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#003d7a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#0066cc'
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#003d7a'
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                  }}
                >
                  <ChevronLeft size={28} strokeWidth={2.5} />
                </button>

                <button
                  onClick={nextIndirizzo}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#003d7a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#0066cc'
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#003d7a'
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                  }}
                >
                  <ChevronRight size={28} strokeWidth={2.5} />
                </button>

                {/* Titolo Indirizzo */}
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#003d7a',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {indirizzi[currentIndirizzo].name}
                </h3>

                {/* Indicatore Posizione */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: '16px',
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  <p style={{ margin: '0 0 8px 0' }}>quadro orario settimanale</p>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    {indirizzi.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: index === currentIndirizzo ? '#0066cc' : '#ddd',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Tabella */}
                <div style={{ overflowX: 'auto', padding: '0 40px' }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.95rem'
                  }}>
                    <thead>
                      <tr style={{ background: '#003d7a', color: 'white' }}>
                        <th style={{ padding: '14px 12px', textAlign: 'left', fontWeight: '600' }}>Discipline</th>
                        <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '600' }}>I</th>
                        <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '600' }}>II</th>
                        <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '600' }}>III</th>
                        <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '600' }}>IV</th>
                        <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '600' }}>V</th>
                      </tr>
                    </thead>
                    <tbody>
                      {indirizzi[currentIndirizzo].disciplines.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #e0e0e0' }}>
                          <td style={{ padding: '12px' }}>{row[0]}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>{row[1]}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>{row[2]}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>{row[3]}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>{row[4]}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>{row[5]}</td>
                        </tr>
                      ))}
                      <tr style={{ background: '#f8f9fa', fontWeight: '600' }}>
                        <td style={{ padding: '12px' }}>Tot. ore di lezione</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>27</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>27</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>30</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>30</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>30</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* COLONNA DESTRA - Attività */}
            <div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                fontWeight: '600',
                marginBottom: '32px',
                color: '#003d7a',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '3px solid #0066cc',
                paddingBottom: '12px'
              }}>
                <Trophy size={36} />
                Le Nostre Attività
              </h2>
              <p style={{
                fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                lineHeight: '1.7',
                marginBottom: '24px'
              }}>
                La nostra scuola consente agli alunni di partecipare anche a progetti extrascolastici e attività interattive e formative:
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {[
                  'Progetto Giornale',
                  'Progetto di Botanica',
                  'Certificazioni linguistiche',
                  'Campionati studenteschi',
                  'Orientamento e P.C.T.O',
                  'Mobilità Internazionale',
                  'Olimpiadi Multidisciplinari (fisica, matematica, informatica, scienze)',
                  'Stages linguistici'
                ].map((activity, i) => (
                  <div key={i} style={{
                    background: '#f5f5f5',
                    padding: '16px 20px',
                    borderRadius: '4px',
                    borderLeft: '4px solid #0066cc',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease'
                  }}>
                    <span style={{ color: '#003d7a', fontSize: '1.2rem', fontWeight: 'bold' }}>•</span>
                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Spazi Attrezzati e Laboratori - Layout a 2 colonne */}
        <section style={{
          padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)',
          maxWidth: '1400px',
          margin: '0 auto',
          background: 'rgb(245, 245, 245)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '40px',
            alignItems: 'start'
          }}>
            
            {/* COLONNA SINISTRA - Spazi Attrezzati */}
            <div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                fontWeight: '600',
                marginBottom: '32px',
                color: '#003d7a',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '3px solid #0066cc',
                paddingBottom: '12px'
              }}>
                <Dumbbell size={36} />
                Spazi Attrezzati
              </h2>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {[
                  '2 palestre (una interna ed una esterna)',
                  '2 campi di pallavolo',
                  'Campo da badminton',
                  'Tavoli da ping-pong',
                  'Canestri da basket',
                  'Piccoli e grandi attrezzi',
                  'Auditorium',
                  'Un piccolo orto di piante officinali'
                ].map((space, i) => (
                  <div key={i} style={{
                    background: '#f5f5f5',
                    padding: '16px 20px',
                    borderRadius: '4px',
                    borderLeft: '4px solid #0066cc',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ color: '#003d7a', fontSize: '1.2rem', fontWeight: 'bold' }}>✓</span>
                    <span>{space}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COLONNA DESTRA - Laboratori + Buvette */}
            <div>
              {/* Laboratori */}
              <h2 style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#003d7a',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '3px solid #0066cc',
                paddingBottom: '12px'
              }}>
                <Beaker size={36} />
                Laboratori
              </h2>
              <p style={{
                fontSize: '0.95rem',
                marginBottom: '24px',
                color: '#666',
                fontStyle: 'italic'
              }}>
                Trasversali a tutti gli indirizzi
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '16px',
                marginBottom: '40px'
              }}>
                {[
                  { name: 'Informatica', Icon: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
                  { name: 'Linguistico-Multimediale', Icon: Globe },
                  { name: 'Chimica', Icon: FlaskConical },
                  { name: 'Biologia', Icon: Microscope },
                  { name: 'Stazione meteorologica', Icon: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2"><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/><circle cx="12" cy="12" r="5"/></svg> },
                  { name: 'Sismografo', Icon: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2"><path d="M3 3v18h18"/><path d="M7 16l3-8 4 8 3-12"/></svg> },
                  { name: 'Planetario', Icon: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg> },
                  { name: 'Fisica', Icon: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
                  { name: 'Orto didattico', Icon: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2"><path d="M12 22v-8m0 0c-3 0-5-2-5-5V4.5a2.5 2.5 0 0 1 5 0V9c0 3 2 5 5 5s5-2 5-5V4.5a2.5 2.5 0 0 1 5 0V9c0 3-2 5-5 5z"/></svg> }
                ].map((lab, i) => (
                  <div key={i} style={{
                    background: '#f5f5f5',
                    padding: '20px',
                    borderRadius: '4px',
                    border: '2px solid #e0e0e0',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    cursor: 'default'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#0066cc'
                    e.currentTarget.style.background = 'white'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e0e0e0'
                    e.currentTarget.style.background = '#f5f5f5'
                  }}
                  >
                    <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <lab.Icon size={40} strokeWidth={1.5} color="#0066cc" />
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{lab.name}</div>
                  </div>
                ))}
              </div>

              {/* Buvette */}
              <div style={{
                background: '#003d7a',
                color: 'white',
                padding: '24px',
                borderRadius: '4px',
                border: '3px solid #0066cc'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Coffee size={32} />
                  La Buvette
                </h3>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Accessibile dalla seconda ora di lezione fino alla quinta ora di lezione.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Final CTA */}
        <section style={{
          padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 60px)',
          background: 'linear-gradient(135deg, #0066cc 0%, #003d7a 100%)',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            fontWeight: '600',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Esplora il Liceo in 3D
          </h2>
          <p style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
            lineHeight: '1.7',
            marginBottom: '40px',
            opacity: '0.95',
            maxWidth: '700px',
            margin: '0 auto 40px auto'
          }}>
            Tramite questa piantina interattiva, cliccando sulle varie aule, potrete visionare dei brevi video che 
            illustrano l'interno dei vari laboratori e allo stesso tempo vedere dove sono posizionati.
          </p>
          <button
            onClick={onEnter}
            style={{
              background: 'white',
              color: '#003d7a',
              border: 'none',
              padding: '20px 56px',
              fontSize: '1.2rem',
              fontWeight: '600',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            Inizia il Tour Virtuale
            <ArrowRight size={24} strokeWidth={2.5} />
          </button>
        </section>

        {/* Footer */}
        <footer style={{
          background: '#003d7a',
          color: 'white',
          padding: '24px 20px',
          textAlign: 'center',
          borderTop: '4px solid #0066cc'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.95rem',
            fontWeight: '300',
            letterSpacing: '0.5px'
          }}>
            Sito a cura di <strong style={{ fontWeight: '600' }}>Mattia Palermo</strong>
          </p>
        </footer>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  )
}

export default Home
