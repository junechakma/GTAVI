import React, { useState } from 'react';

const Gallery = () => {
  const images = [
    { id: 1, src: "https://via.placeholder.com/400x250?text=Vice+City+Nightlife", alt: "Vice City Nightlife" },
    { id: 2, src: "https://via.placeholder.com/400x250?text=High-Speed+Chase", alt: "High-Speed Chase" },
    { id: 3, src: "https://via.placeholder.com/400x250?text=Iconic+Characters", alt: "Iconic Characters" },
    { id: 4, src: "https://via.placeholder.com/400x250?text=Vibrant+Beachfront", alt: "Vibrant Beachfront" },
    { id: 5, src: "https://via.placeholder.com/400x250?text=Aerial+View+of+City", alt: "Aerial View of City" },
    { id: 6, src: "https://via.placeholder.com/400x250?text=Detailed+Interiors", alt: "Detailed Interiors" },
  ];

  // State to manage hover status for each image
  const [hoveredImage, setHoveredImage] = useState(null);

  const imageStyle = (id) => ({
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    transform: hoveredImage === id ? 'scale(1.05)' : 'scale(1)',
    cursor: 'pointer',
  });

  return (
    <div className="gallery-section" style={{ padding: '40px 20px', backgroundColor: '#1a1a1a', color: '#ffffff', borderBottom: '1px solid #333' }}>
      <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px' }}>
        Gallery
      </h2>
      <div 
        className="image-grid" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px', // Increased gap
          maxWidth: '1200px', // Max width for the grid
          margin: '0 auto' 
        }}
      >
        {images.map((image) => (
          <div 
            key={image.id} 
            className="gallery-image-container"
            onMouseEnter={() => setHoveredImage(image.id)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              style={imageStyle(image.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
