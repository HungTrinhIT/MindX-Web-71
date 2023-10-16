import { useEffect, useState } from 'react';
import PostAPI from '../../services/PostAPI';
import CreatePost from '../../components/CreatePost/CreatePost';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const posts = await PostAPI.getAll();
      setPosts(posts.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const listPost =
    posts.length === 0 ? (
      <h3>Empty post</h3>
    ) : (
      <>
        <CreatePost />
        <div>
          {posts.map((post) => {
            return (
              <div
                key={post._id}
                className='bg-[#fff] rounded-[8px] p-[24px] text-black mb-[24px] max-w-[400px]'>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
              </div>
            );
          })}
        </div>
      </>
    );

  if (loading) {
    return <p>Fetching posts...</p>;
  }

  return <div>{listPost}</div>;
};

export default Home;
