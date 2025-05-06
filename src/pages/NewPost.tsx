import type { FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { createEntity } from '../posts';

interface FormData {
  title: string;
  content: string;
}

interface FormErrors {
  title?: string;
  content?: string;
}

export default function NewPost(): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.title.length < 5) {
      newErrors.title = 'Щонайменше 5 символів у назві';
    } else if (formData.title.length > 40) {
      newErrors.title = 'Назва має більше 40 символів';
    }

    if (formData.content.length < 10) {
      newErrors.content = 'Щонайменше 10 символів у описі';
    } else if (formData.content.length > 200) {
      newErrors.content = 'Опис повинен бути менше 200 символів';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setFormData(previous => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (validateForm()) {
      await createEntity(formData);
      await navigate({ to: '/posts' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-8">
          Створення нової сутності
        </h1>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-gray-800 tracking-wide"
              htmlFor="title"
            >
              Назва
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-purple-50/30 outline-none"
              id="title"
              name="title"
              placeholder="Введіть назву..."
              type="text"
              value={formData.title}
              onChange={handleInputChange}
            />
            {errors.title && (
              <p className="text-sm text-red-500 font-medium pl-1">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-gray-800 tracking-wide"
              htmlFor="content"
            >
              Опис
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-purple-50/30 outline-none resize-none"
              id="content"
              name="content"
              placeholder="Введіть опис..."
              rows={6}
              value={formData.content}
              onChange={handleInputChange}
            />
            {errors.content && (
              <p className="text-sm text-red-500 font-medium pl-1">{errors.content}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              className="w-full py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 active:bg-gray-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              type="button"
              onClick={() => navigate({ to: '/posts' })}
            >
              Скасувати
            </button>
            <button
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
              type="submit"
            >
              Створити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
