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
    <div>
      <h3 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-3">Photo Gallery</h3>
      <input type="file" accept="image/*" onChange={handleFileUpload} className="text-[18px] lg:text-[22px]" />
      <div className="photo-grid grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative">
            <img
              className="h-auto max-w-full rounded-lg flex mx-auto"
              src={photo.src}
              alt="Trip"
              onClick={() => setSelectedPhoto(photo)}
            />
            <button
              onClick={() => handleDeletePhoto(photo.id)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-lg p-2"
            >
              Delete
            </button>
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
