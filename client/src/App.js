
import React, { useState, useEffect } from 'react';
import './App.css';
import LightMap from './components/LightMap';
import LightList from './components/LightList';

function App() {
  // your state variables and hooks here
  return (
    <div className="App">
      <h1>illuminiq</h1>
      <LightMap />
      <LightList />
    </div>
  );
}

export default App;

