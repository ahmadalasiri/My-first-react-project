import Post from './Post';
import './PostsList.css';

function PostsList() {
  // Array of dummy posts
  const posts = [
    { id: 1, title: "This is the post Title", body: "This is the post body" },
    { id: 2, title: "This is the post Title", body: "This is the post body" },
    { id: 3, title: "This is the post Title", body: "This is the post body" },
    { id: 4, title: "This is the post Title", body: "This is the post body" },
  ];

  return (
    <div className="posts-container">
      {posts.map(post => (
        <Post 
          key={post.id} 
          title={post.title} 
          body={post.body} 
        />
      ))}
    </div>
  );
}

export default PostsList; 