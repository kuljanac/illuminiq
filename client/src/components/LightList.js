import React, { useState, useEffect } from 'react';

function LightList() {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    fetch('/api/lights')
      .then(res => res.json())
      .then(data => setLights(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>List of Lights</h2>
      <ul>
        {lights.map(light => (
          <li key={light.id}>{light.name} ({light.lat}, {light.lng})</li>
        ))}
      </ul>
    </div>
  );
}

export default LightList;
