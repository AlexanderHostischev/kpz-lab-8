import { Link } from "@tanstack/react-router";
import type { Post } from "../../../types";

interface Props {
  post: Post;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function EntityCard({ post, onClick }: Props): JSX.Element {
  return (
    <div className="bg-gray-900 text-gray-200 rounded-xl overflow-hidden mb-6 transform hover:scale-102 transition-all duration-300 border-l-4 border-purple-500">
      <div className="flex flex-col">
        {/* Верхня частина з заголовком та ID */}
        <div className="bg-gray-800 p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-purple-400 truncate">
              {post.title}
            </h3>
            <span className="text-xs bg-gray-700 px-3 py-1 rounded-full">ID: {post.id}</span>
          </div>
        </div>

        {/* Контент */}
        <div className="p-5">
          <p className="text-gray-300 mb-4 line-clamp-3">
            {post.content}
          </p>

          {/* Мета-інформація */}
          <div className="flex flex-col text-xs text-gray-400 mb-6 space-y-1">
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              <span>Створено: {post.createdAt}</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              <span>Оновлено: {post.updatedAt}</span>
            </div>
          </div>

          {/* Кнопки дій */}
          <div className="flex justify-between pt-2 border-t border-gray-700">
            <Link
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition-colors duration-300 font-medium focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              params={{ postId: post.id.toString() }}
              to="/posts/$postId"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              Деталі
            </Link>
            <button
              className="flex items-center justify-center gap-2 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-2 px-6 rounded-lg transition-colors duration-300 font-medium focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              onClick={onClick}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              Видалити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}