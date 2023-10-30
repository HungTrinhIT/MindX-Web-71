import React, { useState } from 'react';
import Button from '../Button/Button';
import PostAPI from '../../services/PostAPI';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../redux/posts/postAction';

const CreatePostForm = () => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

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

      formData.append('title', 'Lễ 20-10, nam thanh niên không tặng quà cho bạn gái và cái kêt');
      formData.append(
        'description',
        'Chìm đắm trong nét đẹp lao động của cộng đồng startup - freelancer, bạn sẽ luôn cảm nhận được sự tập trung tuyệt đối vào mục tiêu hoàn tất công việc. Thiết kế không gian chia sẻ rộng rãi và thoáng đãng của MindX là điều kiện lý tưởng cho những ý tưởng sáng tạo và đột phá. Hãy nâng cao năng suất và để những thành tựu nói lên giá trị của bạn. Dù bạn là freelancer hay doanh nghiệp hoạt động tại MindX, chúng ta đều hướng đến sự thành công.'
      );

      setLoading(true);
      await PostAPI.create(formData);
      await dispatch(fetchPosts());
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
          selectedPhotos.map((photo, index) => {
            const previewURL = URL.createObjectURL(photo);
            return (
              <img
                key={`img-${index}`}
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
