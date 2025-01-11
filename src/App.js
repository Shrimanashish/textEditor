import React from 'react';
import Title from './components/Title';
import CustomEditor  from './components/Editor';

const App = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Rich Text Editor</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Title />
      </div>
      <CustomEditor />
    </div>
  );
};

export default App;
