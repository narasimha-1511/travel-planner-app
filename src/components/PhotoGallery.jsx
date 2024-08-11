import React, { useState } from "react";

function PhotoGallery({ photos, updatePhotos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePhotos([...photos, { id: Date.now(), src: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (id) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== id);
    updatePhotos(updatedPhotos);
  };

  return (
    <div className="photo-gallery">
      <h3>Photo Gallery</h3>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img
              src={photo.src}
              alt="Trip"
              onClick={() => setSelectedPhoto(photo)}
            />
            <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <div className="lightbox" onClick={() => setSelectedPhoto(null)}>
          <img src={selectedPhoto.src} alt="Trip" />
        </div>
      )}
    </div>
  );
}

export default PhotoGallery;
