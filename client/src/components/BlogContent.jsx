import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

const BlogContent = ({ blogs }) => {

  const { t } = useTranslation();
  const { slug } = useParams();

  let blog = {};
  if (blogs?.data) {
    const arr = blogs.data.filter((blog) => blog.attributes?.slug === slug); // Use slug for filtering
    blog = arr.length > 0 ? arr[0] : {};
  }

  // State for comment form
  const [commentFormData, setCommentFormData] = useState({
    name: '',
    image: '',
    comment: '',
  });

  // State for storing comments
  const [comments, setComments] = useState([]);

  // Fetch comments from the backend when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/comments?filters[blog][slug][$eq]=${slug}`);
        setComments(response.data.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [slug]);

  // Handle change in comment form
  const handleCommentChange = (event) => {
    const value = event.target.type === 'file' ? event.target.files[0] : event.target.value;
    setCommentFormData({ ...commentFormData, [event.target.name]: value });
  };

  // Handle submit of comment form
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify({
        Name: commentFormData.name,
        Comment: [
          {
            type: 'paragraph',
            children: [{ text: commentFormData.comment, type: 'text' }],
          },
        ],
        blog: blog.id,
      }));
      if (commentFormData.image) {
        formDataToSend.append('files.image', commentFormData.image);
      }

      await axios.post('http://localhost:1337/api/comments', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Clear the form after submission
      setCommentFormData({
        name: '',
        image: '',
        comment: '',
      });
      // Fetch updated comments
      const response = await axios.get(`http://localhost:1337/api/comments?filters[blog][slug][$eq]=${slug}`);
      setComments(response.data.data);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className='w-full pb-10 bg-[#f9f9f9] flex justify-center items-center pt-1'>
      <div className='max-w-[1240px] mx-auto'>
        <div className='flex justify-center'>
          <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-5 md:pt-5 ss:pt-5 text-black'>
            <div className='col-span-2'>
              <h1 className='font-bold text-4xl my-1 pt-0 text-left leading-snug'>{blog.attributes?.blogTitle}</h1>
              {blog.attributes?.authorImg?.data?.attributes?.url && (
                <div className='flex items-center justify-left gap-3'>
                  <img
                    className='w-10 h-10 rounded-full object-cover'
                    src={`http://localhost:1337${blog.attributes.authorImg.data.attributes.url}`}
                    alt={blog.attributes?.authorName}
                  />
                  <p className='text-gray-900 font-small'>{blog.attributes?.authorName}</p>
                </div>
              )}
              <img
                className='h-auto w-full object-cover mt-5 mb-10 mx-auto'
                src={`http://localhost:1337${blog.attributes?.coverImage.data.attributes.url}`}
                alt={blog.attributes?.blogTitle}
              />
              <div className="pros text-left max-w-[800px] mx-auto text-base" style={{ lineHeight: '1.7' }}>
                <ReactMarkdown className="line-break" components={{ p: ({ children }) => <p className="mb-4">{children}</p> }}>
                  {blog.attributes?.blogContent}
                </ReactMarkdown>
              </div>

              {/* Comment Section */}
              <div className="mt-8 border-t pt-8">
                <h2 className="text-xl font-semibold mb-4 text-center">{t("comment.Leave a Comment")}</h2>
                <form onSubmit={handleCommentSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t("comment.Name")}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={commentFormData.name}
                      onChange={handleCommentChange}
                      className="mt-1 p-2 w-full border focus:outline-none focus:ring-1 focus:ring-red-600 border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">{t("comment.Comment")}</label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={commentFormData.comment}
                      onChange={handleCommentChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 border-gray-300 rounded-md"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-indigo-600"
                    >
                      {t("comment.Submit")}
                    </button>
                  </div>
                </form>
              </div>

              {/* Display Comments */}
              <div className="mt-8 border-t pt-8">
                <h2 className="text-xl font-semibold mb-4 text-center">{t("comment.Comments")}</h2>
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-4 mb-4">
                    {comment.attributes.image && comment.attributes.image.length > 0 ? (
                      <img
                        src={`http://localhost:1337${comment.attributes.image[0].url}`}
                        alt="Commenter"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : null}
                    <div>
                      <p className="font-semibold">{comment.attributes.Name}</p>
                      <p>{comment.attributes.Comment[0].children[0].text}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
