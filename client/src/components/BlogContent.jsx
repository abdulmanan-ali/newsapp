import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";
// import timeAgo from "./timeAgo"

const timeAgo = (date) => {
  const now = new Date();
  const updatedAt = new Date(date);
  const differenceInSeconds = Math.floor((now - updatedAt) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hr", seconds: 3600 },
    { label: "min", seconds: 60 },
    { label: "sec", seconds: 1 },
  ];

  for (let interval of intervals) {
    const count = Math.floor(differenceInSeconds / interval.seconds);
    if (count >= 1) {
      return count === 1
        ? `1 ${interval.label} ago`
        : `${count} ${interval.label}s ago`;
    }
  }
  return "just now";
};

const BlogContent = ({ blogs }) => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();

  // Find the specific blog by slug from the list of blogs
  let blog = {};
  if (blogs?.data) {
    const foundBlog = blogs.data.find((blog) => blog.attributes?.slug === slug);
    blog = foundBlog || {};
  }

  const category = blog?.attributes?.category?.data?.attributes?.Name;

  const [commentFormData, setCommentFormData] = useState({
    name: "",
    image: "",
    comment: "",
  });

  const [comments, setComments] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Fetch comments related to the current blog
        const commentsResponse = await axios.get(
          `http://localhost:1337/api/comments?filters[blog][slug][$eq]=${slug}`
        );
        setComments(commentsResponse.data.data);

        // Fetch related blogs based on the category of the current blog
        if (category) {
          const relatedBlogsResponse = await axios.get(
            `http://localhost:1337/api/blogs?filters[category][Name][$eq]=${category}&filters[slug][$ne]=${slug}&pagination[limit]=5&populate=*&locale=${i18n.language}`
          );
          setRelatedBlogs(relatedBlogsResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBlogData();
  }, [category, slug, i18n.language]);

  // Handle input changes for comment form
  const handleCommentChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    setCommentFormData({ ...commentFormData, [event.target.name]: value });
  };

  // Handle form submission for adding a new comment
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append(
        "data",
        JSON.stringify({
          Name: commentFormData.name,
          Comment: [
            {
              type: "paragraph",
              children: [{ text: commentFormData.comment, type: "text" }],
            },
          ],
          blog: blog.id,
        })
      );
      if (commentFormData.image) {
        formDataToSend.append("files.image", commentFormData.image);
      }

      // Post the new comment data to the server
      await axios.post("http://localhost:1337/api/comments", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear comment form data after successful submission
      setCommentFormData({
        name: "",
        image: "",
        comment: "",
      });

      // Refresh the comments list after adding a new comment
      const response = await axios.get(
        `http://localhost:1337/api/comments?filters[blog][slug][$eq]=${slug}`
      );
      setComments(response.data.data);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="w-full pb-10 bg-[#f9f9f9] flex justify-center items-center pt-0">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-2/3 p-4">
            {/* Blog title */}
            <h1 className="font-bold text-4xl my-4 pt-0 text-left leading-snug">
              {blog.attributes?.blogTitle}
            </h1>

            {/* Author section */}
            {blog.attributes?.authorImg?.data?.attributes?.url && (
              <div className="flex items-center gap-3 mt-4">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={`http://localhost:1337${blog.attributes.authorImg.data.attributes.url}`}
                  alt={blog.attributes?.authorName}
                />
                <p className="text-gray-900">{blog.attributes?.authorName}</p>
              </div>
            )}

            {/* Cover image */}
            {blog.attributes?.coverImage?.data?.attributes?.url && (
              <img
                className="h-auto w-full object-cover mt-5 mb-10 mx-auto rounded-lg shadow-lg max-h-[500px]"
                src={`http://localhost:1337${blog.attributes.coverImage.data.attributes.url}`}
                alt={blog.attributes?.blogTitle}
              />
            )}

            {/* Blog content */}
            <div className="prose text-left max-w-full mx-auto text-base leading-relaxed">
              <ReactMarkdown
                className="line-break"
                components={{
                  p: ({ children }) => <p className="mb-4">{children}</p>,
                }}
              >
                {blog.attributes?.blogContent}
              </ReactMarkdown>
            </div>
          </div>

          {/* Related blogs section */}
          <div className="w-full lg:w-1/3 p-4 mt-8">
            <h3 className="text-2xl font-bold mb-7">{t("blog.Title")}</h3>
            {relatedBlogs.length > 0 ? (
              relatedBlogs.map((relatedBlog) => {
                const coverImageUrl =
                  relatedBlog.attributes?.coverImage?.data?.attributes?.formats
                    ?.small?.url;
                return (
                  <div
                    key={relatedBlog.id}
                    className="flex mb-4 pb-4 border-b border-gray-200"
                  >
                    {coverImageUrl ? (
                      <img
                        src={`http://localhost:1337${coverImageUrl}`}
                        alt={relatedBlog.attributes?.blogTitle}
                        className="w-24 h-24 object-cover rounded"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                    )}
                    <div className="ml-4">
                      <h4 className="font-bold text-lg mb-1 hover:underline hover:text-red-600">
                        <Link
                          to={`/${relatedBlog.attributes?.locale
                            }/${relatedBlog.attributes?.category?.data?.attributes?.Name.toLowerCase()}/${relatedBlog.attributes?.slug
                            }`}
                        >
                          {relatedBlog.attributes?.blogTitle}
                        </Link>
                      </h4>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>{t("blog.related")}</p>
            )}
          </div>

          {/* Comment form section */}
          <div className="w-full lg:w-2/3 p-4 mt-8 border-t pt-8">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {t("comment.Leave a Comment")}
            </h2>
            <form onSubmit={handleCommentSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("comment.Name")}
                </label>
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
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("comment.Comment")}
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={commentFormData.comment}
                  onChange={handleCommentChange}
                  className="mt-1 p-2 w-full border focus:outline-none focus:ring-1 focus:ring-red-600 border-gray-300 rounded-md"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-600"
                >
                  {t("comment.Submit")}
                </button>
              </div>
            </form>
          </div>

          {/* Comments section */}
          <div className="w-full lg:w-2/3 p-4 mt-8 border-t pt-8">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {t("comment.Comments")} ({comments.length})
            </h2>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex items-center space-x-4 mb-2">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={`http://localhost:1337${blog.attributes.authorImg.data.attributes.url}`}
                    alt={blog.attributes?.Name}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {comment.attributes?.Name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {comment.attributes?.Comment?.[0]?.children?.[0]?.text}
                    </p>
                  </div>
                </div>
                {/* <p className="text-gray-500 text-xs">{new Date(comment.attributes?.createdAt).toLocaleString()}</p> */}
                <p className="text-gray-500 text-xs">
                  {timeAgo(comment.attributes?.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import ReactMarkdown from 'react-markdown';
// import { useTranslation } from 'react-i18next';

// const BlogContent = ({ blogs }) => {
//   const { t, i18n } = useTranslation();
//   const { slug } = useParams();

//   let blog = {};
//   if (blogs?.data) {
//     const arr = blogs.data.filter((blog) => blog.attributes?.slug === slug);
//     blog = arr.length > 0 ? arr[0] : {};
//   }

//   const category = blog?.attributes?.category?.data?.attributes?.Name;

//   const [commentFormData, setCommentFormData] = useState({
//     name: '',
//     image: '',
//     comment: '',
//   });

//   const [comments, setComments] = useState([]);
//   const [relatedBlogs, setRelatedBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         const commentsResponse = await axios.get(`http://localhost:1337/api/comments?filters[blog][slug][$eq]=${slug}`);
//         setComments(commentsResponse.data.data);

//         if (category) {
//           const relatedBlogsResponse = await axios.get(`http://localhost:1337/api/blogs?filters[category][Name][$eq]=${category}&filters[slug][$ne]=${slug}&pagination[limit]=5&populate=*&locale=${i18n.language}`);
//           setRelatedBlogs(relatedBlogsResponse.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchBlogData();
//   }, [category, slug]);

//   const handleCommentChange = (event) => {
//     const value = event.target.type === 'file' ? event.target.files[0] : event.target.value;
//     setCommentFormData({ ...commentFormData, [event.target.name]: value });
//   };

//   const handleCommentSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('data', JSON.stringify({
//         Name: commentFormData.name,
//         Comment: [
//           {
//             type: 'paragraph',
//             children: [{ text: commentFormData.comment, type: 'text' }],
//           },
//         ],
//         blog: blog.id,
//       }));
//       if (commentFormData.image) {
//         formDataToSend.append('files.image', commentFormData.image);
//       }

//       await axios.post('http://localhost:1337/api/comments', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setCommentFormData({
//         name: '',
//         image: '',
//         comment: '',
//       });

//       const response = await axios.get(`http://localhost:1337/api/comments?filters[blog][slug][$eq]=${slug}`);
//       setComments(response.data.data);
//     } catch (error) {
//       console.error('Error submitting comment:', error);
//     }
//   };

//   return (
//     <div className='w-full pb-10 bg-[#f9f9f9] flex justify-center items-center pt-1'>
//       <div className='max-w-[1240px] mx-auto px-4'>
//         <div className='flex flex-wrap'>
//           <div className='w-full lg:w-2/3 p-4'>
//             <h1 className='font-bold text-4xl my-4 pt-0 text-left leading-snug'>{blog.attributes?.blogTitle}</h1>
//             {blog.attributes?.authorImg?.data?.attributes?.url && (
//               <div className='flex items-center gap-3 mt-4'>
//                 <img
//                   className='w-10 h-10 rounded-full object-cover'
//                   src={`http://localhost:1337${blog.attributes.authorImg.data.attributes.url}`}
//                   alt={blog.attributes?.authorName}
//                 />
//                 <p className='text-gray-900'>{blog.attributes?.authorName}</p>
//               </div>
//             )}
//             {blog.attributes?.coverImage?.data?.attributes?.url && (
//               <img
//                 className='h-auto w-full object-cover mt-5 mb-10 mx-auto rounded-lg shadow-lg max-h-[500px]'
//                 src={`http://localhost:1337${blog.attributes.coverImage.data.attributes.url}`}
//                 alt={blog.attributes?.blogTitle}
//               />
//             )}
//             <div className="prose text-left max-w-full mx-auto text-base leading-relaxed">
//               <div className="pros text-left max-w-[800px] mx-auto text-base" style={{ lineHeight: '1.7' }}>
//                 <ReactMarkdown className="line-break" components={{ p: ({ children }) => <p className="mb-4">{children}</p> }}>
//                   {blog.attributes?.blogContent}
//                 </ReactMarkdown>
//               </div>
//             </div>
//           </div>

//           <div className="w-full lg:w-1/3 p-4 mt-8">
//             <h3 className="text-2xl font-bold mb-7">{t("blog.Title")}</h3>
//             {relatedBlogs.length > 0 ? (
//               relatedBlogs.map((relatedBlog) => {
//                 const coverImageUrl = relatedBlog.attributes?.coverImage?.data?.attributes?.formats?.small?.url;
//                 return (
//                   <div key={relatedBlog.id} className="flex mb-4 pb-4 border-b border-gray-200">
//                     {coverImageUrl ? (
//                       <img
//                         src={`http://localhost:1337${coverImageUrl}`}
//                         alt={relatedBlog.attributes?.blogTitle}
//                         className="w-24 h-24 object-cover rounded"
//                       />
//                     ) : (
//                       <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
//                     )}
//                     <div className="ml-4">
//                       <h4 className="font-bold text-lg mb-1 hover:underline hover:text-red-600">
//                         <Link to={`/${relatedBlog.attributes?.locale}/${relatedBlog.attributes?.category?.data?.attributes?.Name.toLowerCase()}/${relatedBlog.attributes?.slug}`}>
//                           {relatedBlog.attributes?.blogTitle}
//                         </Link>
//                       </h4>
//                       {/* <p className="text-gray-600 text-sm">
//                         {timeAgo(relatedBlog.attributes?.updatedAt)}
//                       </p> */}
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p>{t('blog.related')}</p>
//             )}
//           </div>

//           <div className='w-full lg:w-2/3 p-4 mt-8 border-t pt-8'>
//             <h2 className="text-xl font-semibold mb-4 text-center">{t("comment.Leave a Comment")}</h2>
//             <form onSubmit={handleCommentSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t("comment.Name")}</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={commentFormData.name}
//                   onChange={handleCommentChange}
//                   className="mt-1 p-2 w-full border focus:outline-none focus:ring-1 focus:ring-red-600 border-gray-300 rounded-md"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="comment" className="block text-sm font-medium text-gray-700">{t("comment.Comment")}</label>
//                 <textarea
//                   id="comment"
//                   name="comment"
//                   value={commentFormData.comment}
//                   onChange={handleCommentChange}
//                   className="mt-1 p-2 w-full border focus:outline-none focus:ring-1 focus:ring-red-600 border-gray-300 rounded-md"
//                   rows="4"
//                   required
//                 ></textarea>
//               </div>
//               <div className="text-center">
//                 <button
//                   type="submit"
//                   className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-600"
//                 >
//                   {t("comment.Submit")}
//                 </button>
//               </div>
//             </form>
//           </div>

//           <div className="w-full lg:w-2/3 p-4 mt-8 border-t pt-8">
//             <h2 className="text-xl font-semibold mb-4 text-center">{t("comment.Comments")}</h2>
//             {comments.map((comment) => (
//               <div key={comment.id} className="flex items-start space-x-4 mb-4">
//                 <img
//                   className='w-10 h-10 rounded-full object-cover'
//                   src={`http://localhost:1337${blog.attributes.authorImg.data.attributes.url}`}
//                   alt={blog.attributes?.authorName}
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-md font-medium">{comment.attributes?.Name}</h3>
//                   <p className="text-gray-600 text-sm">{comment.attributes?.Comment?.[0]?.children?.[0]?.text}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default BlogContent;

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import ReactMarkdown from 'react-markdown';
// import { useTranslation } from 'react-i18next';
// // import timeAgo from './timeAgo';

// const BlogContent = ({ blogs }) => {
//   const { t, i18n } = useTranslation();
//   const { slug } = useParams();

//   let blog = {};
//   if (blogs?.data) {
//     const arr = blogs.data.filter((blog) => blog.attributes?.slug === slug);
//     blog = arr.length > 0 ? arr[0] : {};
//   }

//   const category = blog?.attributes?.category?.data?.attributes?.Name;

//   // State for comment form
//   const [commentFormData, setCommentFormData] = useState({
//     name: '',
//     image: '',
//     comment: '',
//   });

//   // State for storing comments
//   const [comments, setComments] = useState([]);

//   // State for related blogs
//   const [relatedBlogs, setRelatedBlogs] = useState([]);

//   // Fetch comments and related blogs from the backend when the component mounts
//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         // Fetch comments
//         const commentsResponse = await axios.get(`http://localhost:1337/api/comments?filters[blog][slug][$eq]=${slug}`);
//         setComments(commentsResponse.data.data);

//         // Fetch related blogs
//         if (category) {
//           const relatedBlogsResponse = await axios.get(`http://localhost:1337/api/blogs?filters[category][Name][$eq]=${category}&filters[slug][$ne]=${slug}&pagination[limit]=5&populate=*&locale=${i18n.language}`);
//           console.log('Related Blogs Response:', relatedBlogsResponse.data.data);
//           setRelatedBlogs(relatedBlogsResponse.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchBlogData();
//   }, [category, slug]);

//   // Handle change in comment form
//   const handleCommentChange = (event) => {
//     const value = event.target.type === 'file' ? event.target.files[0] : event.target.value;
//     setCommentFormData({ ...commentFormData, [event.target.name]: value });
//   };

//   // Handle submit of comment form
//   const handleCommentSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('data', JSON.stringify({
//         Name: commentFormData.name,
//         Comment: [
//           {
//             type: 'paragraph',
//             children: [{ text: commentFormData.comment, type: 'text' }],
//           },
//         ],
//         blog: blog.id,
//       }));
//       if (commentFormData.image) {
//         formDataToSend.append('files.image', commentFormData.image);
//       }

//       await axios.post('http://localhost:1337/api/comments', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       // Clear the form after submission
//       setCommentFormData({
//         name: '',
//         image: '',
//         comment: '',
//       });
//       // Fetch updated comments
//       const response = await axios.get(`http://localhost:1337/api/comments?filters[blog][slug][$eq]=${slug}`);
//       setComments(response.data.data);
//     } catch (error) {
//       console.error('Error submitting comment:', error);
//     }
//   };

//   return (
//     <div className='w-full pb-10 bg-[#f9f9f9] flex justify-center items-center pt-1'>
//       <div className='max-w-[1240px] mx-auto'>
//         <div className='flex justify-center'>
//           <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-5 md:pt-5 ss:pt-5 text-black'>
//             <div className='col-span-2'>
//               <h1 className='font-bold text-4xl my-1 pt-0 text-left leading-snug'>{blog.attributes?.blogTitle}</h1>
//               {blog.attributes?.authorImg?.data?.attributes?.url && (
//                 <div className='flex items-center justify-left gap-3'>
//                   <img
//                     className='w-10 h-10 rounded-full object-cover'
//                     src={`http://localhost:1337${blog.attributes.authorImg.data.attributes.url}`}
//                     alt={blog.attributes?.authorName}
//                   />
//                   <p className='text-gray-900 font-small'>{blog.attributes?.authorName}</p>
//                 </div>
//               )}
//               {blog.attributes?.coverImage?.data?.attributes?.url && (
//                 <img
//                   className='h-auto w-full object-cover mt-5 mb-10 mx-auto'
//                   src={`http://localhost:1337${blog.attributes.coverImage.data.attributes.url}`}
//                   alt={blog.attributes?.blogTitle}
//                 />
//               )}
//               <div className="pros text-left max-w-[800px] mx-auto text-base" style={{ lineHeight: '1.7' }}>
//                 <ReactMarkdown className="line-break" components={{ p: ({ children }) => <p className="mb-4">{children}</p> }}>
//                   {blog.attributes?.blogContent}
//                 </ReactMarkdown>
//               </div>

//               {/* Comment Section */}
//               <div className="mt-8 border-t pt-8">
//                 <h2 className="text-xl font-semibold mb-4 text-center">{t("comment.Leave a Comment")}</h2>
//                 <form onSubmit={handleCommentSubmit}>
//                   <div className="mb-4">
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t("comment.Name")}</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={commentFormData.name}
//                       onChange={handleCommentChange}
//                       className="mt-1 p-2 w-full border focus:outline-none focus:ring-1 focus:ring-red-600 border-gray-300 rounded-md"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label htmlFor="comment" className="block text-sm font-medium text-gray-700">{t("comment.Comment")}</label>
//                     <textarea
//                       id="comment"
//                       name="comment"
//                       value={commentFormData.comment}
//                       onChange={handleCommentChange}
//                       className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 border-gray-300 rounded-md"
//                       rows="4"
//                       required
//                     ></textarea>
//                   </div>
//                   <div className="text-center">
//                     <button
//                       type="submit"
//                       className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-600"
//                     >
//                       {t("comment.Submit")}
//                     </button>
//                   </div>
//                 </form>
//               </div>

//               {/* Display Comments */}
//               <div className="mt-8 border-t pt-8">
//                 <h2 className="text-xl font-semibold mb-4 text-center">{t("comment.Comments")}</h2>
//                 {comments.map((comment) => (
//                   <div key={comment.id} className="flex items-start space-x-4 mb-4">
//                     <div className="flex-1">
//                       <h3 className="text-md font-medium">{comment.attributes?.Name}</h3>
//                       <p className="text-gray-600 text-sm">{comment.attributes?.Comment?.[0]?.children?.[0]?.text}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Related Articles */}
//             <div className="lg:col-span-1 md:col-span-1 sm:col-span-1 ss:col-span-1 bg-white rounded-lg p-8 shadow-lg">
//               <h3 className="text-2xl font-bold mb-7">Related Articles</h3>
//               {relatedBlogs.length > 0 ? (
//                 relatedBlogs.map((relatedBlog) => {
//                   const coverImageUrl = relatedBlog.attributes?.coverImage?.data?.attributes?.formats?.small?.url;
//                   // console.log(`Related blog ID: ${relatedBlog.id}, Cover Image URL: ${coverImageUrl}`);
//                   return (
//                     <div key={relatedBlog.id} className="flex mb-4 pb-4 border-b border-gray-200">
//                       {coverImageUrl ? (
//                         <img
//                           src={`http://localhost:1337${coverImageUrl}`}
//                           alt={relatedBlog.attributes?.blogTitle}
//                           className="w-24 h-24 object-cover rounded"
//                         />
//                       ) : (
//                         <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
//                       )}
//                       <div className="ml-4">
//                         <h4 className="font-bold text-lg mb-1 hover:underline hover:text-red-600">
//                           <Link to={`/${relatedBlog.attributes?.locale}/${relatedBlog.attributes?.category?.data?.attributes?.Name.toLowerCase()}/${relatedBlog.attributes?.slug}`}>
//                             {relatedBlog.attributes?.blogTitle}
//                           </Link>
//                         </h4>
//                         <p className="text-gray-600 text-sm">
//                           {/* {timeAgo(relatedBlog.attributes?.updatedAt)} */}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p>{t('related.No Related Blog Posts')}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogContent;
