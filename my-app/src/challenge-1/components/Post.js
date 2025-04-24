import "./Post.css";

function Post({ title, body }) {
  return (
    <div className="post">
      <h2 className="post-title">{title}</h2>
      <hr />
      <p className="post-body">{body}</p>
    </div>
  );
}

export default Post;
