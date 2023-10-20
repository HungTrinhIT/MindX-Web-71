import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm';
import { fetchPosts } from '../../redux/posts/postAction';
import PostItem from '../../components/PostItem/PostItem';

const Home = () => {
  const dispatch = useDispatch();
  const { posts, fetchPostPending, pagination } = useSelector(
    (state) => state.posts
  );
  const { currentPage, totalPages } = pagination || {};
  const [page, setPage] = useState(1);
  const observer = useRef();
  const shouldFetchMore = currentPage < totalPages;

  useEffect(() => {
    dispatch(fetchPosts({ page }));
  }, []);

  useEffect(() => {
    if (shouldFetchMore) {
      dispatch(fetchPosts({ page }));
    }
  }, [page]);

  const lastEleRef = useCallback(
    (node) => {
      if (fetchPostPending) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
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
            <PostItem
              key={id}
              title={title}
              createdDate={formattedDate}
              description={description}
            />
          );
        })}
      </div>
    );

  return (
    <div className='flex flex-col justify-center items-center'>
      <CreatePostForm />
      {listPost}
      <div className='invisible' ref={lastEleRef}></div>
      {fetchPostPending && <p>Fetch more posts...</p>}
    </div>
  );
};

export default Home;
