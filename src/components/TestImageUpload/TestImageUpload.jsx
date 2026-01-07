import React, { useState } from 'react';

const CustomImageUpload = ({onUpload}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'pokemon_images'); // Replace with your preset name
    data.append('cloud_name', 'du353fnr8'); // Replace with your cloud name

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/du353fnr8/image/upload`, // Replace with your cloud name
        {
          method: 'POST',
          body: data,
        }
      );
      const file = await res.json();
      setImage(file.secure_url);
      onUpload(file.secure_url)
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Custom Image Upload</h2>
      <input
        type="file"
        onChange={uploadImage}
      />
      {loading ? (
        <h3>Uploading...</h3>
      ) : (
        <>
          {image && <img src={image} alt="Uploaded preview" style={{ width: '300px' }} />}
        </>
      )}
    </div>
  );
};

export default CustomImageUpload;