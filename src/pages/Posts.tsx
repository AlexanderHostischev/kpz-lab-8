import type { Post } from "../types";
import { getAllEntities, deleteEntity } from "../posts";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import PostCard from '../components/ui/PostCard';
import Modal from "../components/ui/Modal";

export default function Posts(): JSX.Element {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      const posts = await getAllEntities();
      setPosts(posts);
    }
    void fetchPosts();
  }, []);

  const handleDeleteClick = (id: number): void => {
    setSelectedPostId(id);
    setShowModal(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (selectedPostId !== null) {
      await deleteEntity(selectedPostId);
      const posts = await getAllEntities();
      setPosts(posts);
      setShowModal(false);
    }
  };

  const navigateToCreatePost = (): Promise<void> => {
    return navigate({ to: '/posts/new' });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Перелік постів
          </h1>
          <button
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold 
                     hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 
                     transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] 
                     shadow-md flex items-center gap-2"
            onClick={navigateToCreatePost}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" fillRule="evenodd" />
            </svg>
            Створити пост
          </button>
        </div>

        <div className="grid gap-6">
          {posts.map(post => (
            <div key={post.id}
              className="transform transition-all duration-200 hover:scale-[1.01]">
              <PostCard post={post} onClick={() => { handleDeleteClick(post.id); }} />
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 font-medium">
              Поки що немає жодного поста. Створіть перший!
            </p>
          </div>
        )}

        <Modal
          body="Ви впевнені, що хочете видалити цей елемент?"
          header="Підтвердження видалення"
          show={showModal}
          onCancel={() => { setShowModal(false); }}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
}
