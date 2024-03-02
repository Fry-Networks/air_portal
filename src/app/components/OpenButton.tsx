import React from 'react';

export default function OpenButton({ showModal, text, logo, size = '80%' }: { showModal: Function, text: string, logo: string, size?: string }) {
  return (
    <button onClick={() => showModal(true)} style={buttonStyle}>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}>
        <img src={logo} alt="logo" style={{ 
          width: size, // Adjust as needed
          height: 'auto',
          marginBottom: '5px' // Space between logo and label
        }} />
        <span style={{ 
          fontSize: '12px',
          color: 'white',
          textAlign: 'center'
        }}>{text}</span>
      </div>
    </button>
  );
}

const buttonStyle = {
  width: '200px', 
  height: '200px', 
  border: 'none',
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center', 
  cursor: 'pointer',
  borderRadius: '5px',
  background: 'none',
  padding: 0,
  margin: '4px 2px',
};
