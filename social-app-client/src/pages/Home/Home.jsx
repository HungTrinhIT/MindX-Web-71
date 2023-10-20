import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm';
import { fetchPosts } from '../../redux/posts/postAction';
const Home = () => {
  const dispatch = useDispatch();
  const { posts, fetchPostPending } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const listPost =
    posts.length === 0 ? (
      <h3>Empty post</h3>
    ) : (
      <div>
        {posts.map((post) => {
          const {
            _id: id,
            title,
            description,
            createdAt,
            photos = [],
          } = post || {};

          const date = new Date(createdAt);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();

          const formattedDate = `${day}/${month}/${year}`;

          return (
            <div className='mb-12 w-full' key={id}>
              <div className='mb-2 flex items-center gap-2'>
                <div className='bg-white w-[48px] h-[48px] rounded-full'></div>
                <div>
                  <p className='text-white'>Harry Trinh</p>
                  <small className='text-white/70 text-[8px]'>
                    {formattedDate}
                  </small>
                </div>
              </div>
              <h2 className='text-white mb-2'>{title}</h2>
              <div className='bg-[#fff] rounded-[8px] p-[24px] text-black mb-[24px] max-w-[400px]'>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );

  if (fetchPostPending) {
    return <p>Fetching posts...</p>;
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <CreatePostForm />
      {listPost}
    </div>
  );
};

export default Home;
