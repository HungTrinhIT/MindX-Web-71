import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm';
import { fetchPosts } from '../../redux/posts/postAction';
const Home = () => {
  const dispatch = useDispatch();
  const { posts, fetchPostPending, pagination } = useSelector(
    (state) => state.posts
  );
  const [page, setPage] = useState(1);
  const { currentPage, totalPages } = pagination || {};

  const shouldFetchMorePost = currentPage < totalPages;
  console.log(
    '🚀 ~ file: Home.jsx:15 ~ Home ~ shouldFetchMorePost:',
    shouldFetchMorePost
  );
  useEffect(() => {
    const payload = {
      page,
    };
    dispatch(fetchPosts(payload));
  }, []);

  useEffect(() => {
    if (shouldFetchMorePost) {
      const payload = {
        page,
      };
      dispatch(fetchPosts(payload));
    }
  }, [page]);

  const observer = useRef(null);
  const lastElementRef = useCallback(
    (node) => {
      if (fetchPostPending) return;
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && shouldFetchMorePost) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [fetchPostPending]
  );

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

  return (
    <div className='flex flex-col justify-center items-center'>
      <CreatePostForm />
      {listPost}
      {fetchPostPending && <Loading />}
      <div ref={lastElementRef} className='invisible'></div>
    </div>
  );
};

export default Home;
