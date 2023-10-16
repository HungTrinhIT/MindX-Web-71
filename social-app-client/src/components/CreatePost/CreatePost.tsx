import React, { useState } from 'react';
import Button from '../Button/Button';
import PostAPI from '../../services/PostAPI';

const CreatePost = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;

    setSelectedFiles(files);
  };

  const handleSubmit = async () => {
    if (!selectedFiles) {
      return;
    }

    try {
      const formData = new FormData();

      for (let file of selectedFiles) {
        formData.append('photos', file);
        console.log('File', file);
        console.log('file:', file);
      }

      formData.append('title', 'Hello 123');
      formData.append('description', 'Content here');

      const uploadResponse = await PostAPI.create(formData);
      console.log(
        '🚀 ~ file: CreatePost.tsx:21 ~ handleSubmit ~ uploadResponse:',
        uploadResponse
      );
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div>
      <div>
        <input
          type='file'
          accept='image/*'
          name='avatar'
          id='avatar'
          multiple
          className='hidden'
          onChange={handleFileChange}
        />
        <label htmlFor='avatar'>Upload avatar</label>
      </div>
      <Button onClick={handleSubmit}>Create</Button>
    </div>
  );
};

export default CreatePost;
