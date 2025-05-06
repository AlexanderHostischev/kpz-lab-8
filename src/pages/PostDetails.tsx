import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Route } from '../routes/posts/$postId';
import { getEntityById, updateEntity } from '../posts';
import type { Post } from '../types';

export const PostDetails = (): JSX.Element => {
  const navigate = useNavigate();
  const postId = Number(Route.useParams().postId);
  const [post, setPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    const fetchPost = async (): Promise<void> => {
      const foundPost = await getEntityById(postId);
      if (foundPost) {
        setPost(foundPost);
        setFormData({
          title: foundPost.title,
          content: foundPost.content
        });
      }
    }
    void fetchPost();
  }, [postId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setFormData(previous => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (post) {
      const updatedPost = await updateEntity(post.id, formData);
      if (updatedPost) {
        setPost(updatedPost);
        setIsEditing(false);
      }
    }
  };

  if (!post) {
    return <div className="text-center p-4">Post not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {!isEditing ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => { setIsEditing(true); }}
            >
              Edit
            </button>
          </div>
          <p className="text-gray-600">{post.content}</p>
          <div className="text-sm text-gray-500">
            <p>Created: {post.createdAt.toLocaleString()}</p>
            <p>Last updated: {post.updatedAt.toLocaleString()}</p>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => navigate({ to: '/posts' })}
          >
            Back to Posts
          </button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="content">
              Content
            </label>
            <textarea
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              id="content"
              name="content"
              rows={6}
              value={formData.content}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              type="submit"
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              type="button"
              onClick={() => { setIsEditing(false); }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
