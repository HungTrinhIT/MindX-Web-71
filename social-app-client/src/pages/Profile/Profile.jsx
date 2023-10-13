import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import UserAPI from '../../services/UserAPI';
import { fetchCurrentUser } from '../../redux/auth/authActions';

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmitUploadAvatar = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      setUploading(true);
      setError(null);
      const formData = new FormData();
      formData.append('image', selectedFile);
      await UserAPI.uploadAvatar(formData);
      dispatch(fetchCurrentUser());
    } catch (error) {
      console.log('upload-avatar-failed:', error);
      setError(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div>
        {currentUser?.avatar && <img src={currentUser.avatar} width={200} />}
      </div>
      <div>
        <input
          type='file'
          accept='image/*'
          name='avatar'
          id='avatar'
          className='hidden'
          onChange={handleFileChange}
        />
        <label htmlFor='avatar'>Upload avatar</label>
      </div>
      <Button onClick={handleSubmitUploadAvatar} isLoading={uploading}>
        Upload avatar
      </Button>
    </div>
  );
};

export default Profile;
