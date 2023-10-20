import React from 'react';

const PostItem = ({ createdDate, title, description, ...rest }) => {
  return (
    <div className='mb-12 w-full' {...rest}>
      <div className='mb-2 flex items-center gap-2'>
        <div className='bg-white w-[48px] h-[48px] rounded-full'></div>
        <div>
          <p className='text-white'>Harry Trinh</p>
          <small className='text-white/70 text-[8px]'>{createdDate}</small>
        </div>
      </div>
      <h2 className='text-white mb-2'>{title}</h2>
      <div className='bg-[#fff] rounded-[8px] p-[24px] text-black mb-[24px] max-w-[400px]'>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PostItem;
