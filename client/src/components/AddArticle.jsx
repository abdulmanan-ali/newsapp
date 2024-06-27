import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faUser } from '@fortawesome/free-solid-svg-icons'; // Importing necessary icons
import { useTranslation } from 'react-i18next';

const AddArticle = () => {

  const { t, i18n } = useTranslation();


  const [formData, setFormData] = useState({
    blogTitle: '',
    blogDesc: '',
    blogContent: '',
    coverImage: null,
    authorImg: null,
    authorName: '',
    authorDesc: '',
    category: '', // Added category state
  });

  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [error, setError] = useState('');

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/categories/');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (event) => {
    if (event.target.type === 'file') {
      setFormData({ ...formData, [event.target.name]: event.target.files[0] });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.blogTitle ||
      !formData.blogContent ||
      !formData.coverImage ||
      !formData.authorImg ||
      !formData.category // Check if category is selected
    ) {
      setError('Please fill out all required fields');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify({ ...formData, publishedAt: null }));
    formDataToSend.append('files.coverImage', formData.coverImage);
    formDataToSend.append('files.authorImg', formData.authorImg);

    try {
      const response = await axios.post('http://localhost:1337/api/blogs/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Article added successfully!', response.data);
      toast.success('Article submitted successfully!');

      setFormData({
        blogTitle: '',
        blogDesc: '',
        blogContent: '',
        coverImage: null,
        authorImg: null,
        authorName: '',
        authorDesc: '',
        category: '',
      });
    } catch (error) {
      console.error('Error adding article:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mt-9 mb-8 text-red-600 underline">{t('AddArticle.addArticle')}</h1>

      <form
        className="grid grid-cols-1 gap-6 bg-white rounded shadow-md p-9"
        onSubmit={handleSubmit}
      >
        {/* Title Field */}
        <div>
          <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700 mb-3">
          {t('AddArticle.Title')}
          </label>
          <input
            type="text"
            id="blogTitle"
            name="blogTitle"
            value={formData.blogTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="blogDesc" className="block text-sm font-medium text-gray-700 mb-3">
          {t('AddArticle.Description')}
          </label>
          <input
            type="text"
            id="blogDesc"
            name="blogDesc"
            value={formData.blogDesc}
            onChange={handleChange}
            placeholder="Enter a description (optional)"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 flex items-center mb-3">
            <FontAwesomeIcon icon={faFileImage} className="mr-2" /> {t('AddArticle.Select a cover image')}
          </label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-3">
          {t('AddArticle.Select a Category')}
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">{t('AddArticle.Select a Category')}</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.attributes.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Content Field */}
        <div>
          <label htmlFor="blogContent" className="block text-sm font-medium text-gray-700 mb-3">
          {t('AddArticle.Content')}
          </label>
          <textarea
            id="blogContent"
            name="blogContent"
            value={formData.blogContent}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-[200px]"
            required
          />
        </div>

        <div>
          <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700 flex items-center mb-3">
            <FontAwesomeIcon icon={faUser} className="mr-2" /> {t('AddArticle.Your Name')}
          </label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 flex items-center mb-3">
            <FontAwesomeIcon icon={faFileImage} className="mr-2" /> {t('AddArticle.Upload Your Image')}
          </label>
          <input
            type="file"
            id="authorImg"
            name="authorImg"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring -indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <div className="text-center mb-3">
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            {t('AddArticle.Submit')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticle;
