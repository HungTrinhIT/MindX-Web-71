import React, { useState } from 'react';
import UserAPI from '../../services/UserAPI';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmitUploadAvatar = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', selectedFile);
      await UserAPI.uploadAvatar(formData);
      setSelectedFile(null);
    } catch (error) {
      console.log('upload-avatar-failed', error);
    } finally {
      setUploading(false);
    }
  };

  const previewAvatarMaybe = selectedFile && URL?.createObjectURL(selectedFile);
  console.log(
    '🚀 ~ file: Profile.jsx:33 ~ Profile ~ previewAvatarMaybe:',
    previewAvatarMaybe
  );
  return (
    <div>
      <div>
        {selectedFile && (
          <img
            src={previewAvatarMaybe}
            alt='Default Avatar'
            className='w-20 h-20 rounded-full object-cover'
          />
        )}
        {currentUser?.avatar ? (
          <img
            src={currentUser?.avatar}
            alt='Default Avatar'
            className='w-20 h-20 rounded-full object-cover'
          />
        ) : (
          <FaUserCircle size={100} />
        )}
      </div>
      <div>
        <input
          type='file'
          className='hidden'
          id='avatar'
          onChange={handleFileChange}
        />
        <label htmlFor='avatar' className='block mb-2 cursor-pointer'>
          Choose Avatar
        </label>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleSubmitUploadAvatar}>
          {uploading ? 'Uploading...' : ' Upload Avatar'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
