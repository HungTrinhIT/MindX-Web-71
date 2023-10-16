import React, { useState } from 'react';
import Button from '../Button/Button';
import PostAPI from '../../services/PostAPI';

const CreatePostForm = () => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSelectPhotosChange = (event) => {
    const files = event.target.files;
    setSelectedPhotos([...selectedPhotos, ...files]);
  };

  const handleSubmitCreatePost = async () => {
    if (selectedPhotos?.length === 0) {
      return;
    }

    try {
      const formData = new FormData();

      for (let file of selectedPhotos) {
        formData.append('photos', file);
      }

      formData.append('title', 'New Post');
      formData.append('description', 'Description content');

      setLoading(true);
      await PostAPI.create(formData);
      // Fetch post API
    } catch (error) {
      console.log('create-new-post-failed:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mb-[60px] max-w-[500px]'>
      <div className='mb-6 flex gap-4 items-center overflow-x-auto'>
        {selectedPhotos &&
          selectedPhotos.map((photo) => {
            const previewURL = URL.createObjectURL(photo);
            return (
              <img
                src={previewURL}
                alt='Preview post image'
                className='rounded-2xl w-[110px] h-[110px] object-cover'
              />
            );
          })}
      </div>
      <div>
        <input
          type='file'
          accept='image/*'
          multiple
          name='photos'
          onChange={onSelectPhotosChange}
        />
        <Button isLoading={loading} onClick={handleSubmitCreatePost}>
          Create post
        </Button>
      </div>
    </div>
  );
};

export default CreatePostForm;

// for (let i = 0; i < selectedPhotos.length; i++) {
//   const file = selectedPhotos[i];
//   formData.append(file);
// }
