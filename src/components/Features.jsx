import React from 'react';

const Features = () => {
  const featuresList = [
    "Expansive open world of Vice City, teeming with life and illicit opportunities.",
    "Unprecedented player freedom: shape your destiny through choices that matter.",
    "Next-generation graphics and physics engine for breathtaking immersion.",
    "Gripping narrative with a diverse cast of memorable and complex characters.",
    "Dynamic weather system and day/night cycle enhancing realism.",
    "Revamped combat and driving mechanics for a visceral experience."
  ];

  return (
    <div className="features-section" style={{ padding: '40px 20px', backgroundColor: '#1a1a1a', color: '#ffffff', borderTop: '1px solid #333', borderBottom: '1px solid #333' }}>
      <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px' }}>
        Key Features
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, maxWidth: '800px', margin: '0 auto' }}>
        {featuresList.map((feature, index) => (
          <li key={index} style={{ fontSize: '1.25rem', marginBottom: '20px', paddingLeft: '35px', position: 'relative', lineHeight: '1.6' }}>
            <span style={{
              position: 'absolute',
              left: '0',
              top: '8px', // Adjust for vertical alignment
              height: '10px',
              width: '10px',
              backgroundColor: '#ff6600', // Accent color
              borderRadius: '50%',
            }}></span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Features;
