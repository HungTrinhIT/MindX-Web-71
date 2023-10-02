import { useEffect, useState } from 'react';
import PostAPI from '../../services/PostAPI';

const HomePage = () => {
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
      <div>
        {posts.map((post) => {
          return (
            <div
              key={post._id}
              style={{
                background: '#fff',
                borderRadius: '8px',
                padding: '24px',
                color: '#000',
                marginBottom: '24px',
              }}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          );
        })}
      </div>
    );

  if (loading) {
    return <p>Fetching posts...</p>;
  }

  return <div>{listPost}</div>;
};

export default HomePage;
