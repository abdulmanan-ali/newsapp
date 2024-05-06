import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const BlogContent = ({ blogs }) => {
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
                <h2 className="text-xl font-semibold mb-4 text-center">Leave a Comment</h2>
                <form onSubmit={handleCommentSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={commentFormData.name}
                      onChange={handleCommentChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={commentFormData.comment}
                      onChange={handleCommentChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>

              {/* Display Comments */}
              <div className="mt-8 border-t pt-8">
                <h2 className="text-xl font-semibold mb-4 text-center">Comments</h2>
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



// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import ReactMarkdown from 'react-markdown';

// const BlogContent = ({ blogs }) => {
//   const { id } = useParams();

//   let blog = {};
//   if (blogs?.data) {
//     const arr = blogs.data.filter((blog) => blog.id == id);
//     blog = arr[0];
//   }

//   // State for comment form
//   const [commentFormData, setCommentFormData] = useState({
//     name: '',
//     image: '',
//     comment: '',
//   });

//   // State for storing comments
//   const [comments, setComments] = useState([]);

//   // Fetch comments from the backend when the component mounts
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:1337/api/comments?filters[blog][id][$eq]=${id}`);
//         setComments(response.data.data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchComments();
//   }, [id]);

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
//         blog: id,
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
//       const response = await axios.get(`http://localhost:1337/api/comments?filters[blog][id][$eq]=${id}`);
//       setComments(response.data.data);
//     } catch (error) {
//       console.error('Error submitting comment:', error);
//     }
//   };

//   return (
//     <div className='w-full pb-10 bg-[#f9f9f9] flex justify-center items-center'>
//       <div className='max-w-[1240px] mx-auto'>
//         <div className='flex justify-center'>
//           <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:pt-5 ss:pt-20 text-black'>
//             <div className='col-span-2'>
//               <h1 className='font-bold text-3xl my-1 pt-5 text-left leading-normal'>{blog.attributes?.blogTitle}</h1>
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
//               <img
//                 className='h-auto w-full object-cover mt-5 mb-10 mx-auto'
//                 src={`http://localhost:1337${blog.attributes?.coverImage.data.attributes.url}`}
//                 alt={blog.attributes?.blogTitle}
//               />
//               <div className="pros text-left max-w-[800px] mx-auto text-base/7">
//                 <ReactMarkdown className="line-break">{blog.attributes?.blogContent}</ReactMarkdown>
//               </div>

//               {/* Comment Section */}
//               <div className="mt-8 border-t pt-8">
//                 <h2 className="text-xl font-semibold mb-4 text-center">Leave a Comment</h2>
//                 <form onSubmit={handleCommentSubmit}>
//                   <div className="mb-4">
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={commentFormData.name}
//                       onChange={handleCommentChange}
//                       className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                       required
//                     />
//                   </div>
//                   {/* <div className="mb-4">
//                     <label htmlFor="image" className="block text-sm font-medium text-gray-700">Choose Image</label>
//                     <input
//                       type="file"
//                       id="image"
//                       name="image"
//                       accept="image/*"
//                       onChange={handleCommentChange}
//                       className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                     />
//                   </div> */}
//                   <div className="mb-4">
//                     <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
//                     <textarea
//                       id="comment"
//                       name="comment"
//                       value={commentFormData.comment}
//                       onChange={handleCommentChange}
//                       className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                       rows="4"
//                       required
//                     ></textarea>
//                   </div>
//                   <div className="text-center">
//                     <button
//                       type="submit"
//                       className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>

//               {/* Display Comments */}
//               <div className="mt-8 border-t pt-8">
//                 <h2 className="text-xl font-semibold mb-4 text-center">Comments</h2>
//                 {comments.map((comment) => (
//                   <div key={comment.id} className="flex items-start space-x-4 mb-4">
//                     {comment.attributes.image && (
//                       <img
//                         src={`http://localhost:1337${comment.attributes.image[0].url}`}
//                         alt="Commenter"
//                         className="w-12 h-12 rounded-full object-cover"
//                       />
//                     )}
//                     <div>
//                       <p className="font-semibold">{comment.attributes.Name}</p>
//                       <p>{comment.attributes.Comment[0].children[0].text}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogContent;















































// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown'; // Assuming correct import

// const BlogContent = ({ blogs }) => {
//   const { id } = useParams();

//   let blog = {};
//   if (blogs?.data) {
//     const arr = blogs.data.filter((blog) => blog.id == id);
//     blog = arr[0];
//   }

//   // State for comment form
//   const [commentFormData, setCommentFormData] = useState({
//     name: '',
//     image: '',
//     comment: '',
//   });

//   // State for storing comments
//   const [comments, setComments] = useState([]);

//   // Handle change in comment form
//   const handleCommentChange = (event) => {
//     const value = event.target.type === 'file' ? event.target.files[0] : event.target.value;
//     setCommentFormData({ ...commentFormData, [event.target.name]: value });
//   };

//   // Handle submit of comment form
//   const handleCommentSubmit = (event) => {
//     event.preventDefault();
//     // Add the new comment to the comments array
//     setComments([
//       ...comments,
//       {
//         id: comments.length + 1,
//         name: commentFormData.name,
//         image: commentFormData.image ? URL.createObjectURL(commentFormData.image) : null,
//         comment: commentFormData.comment,
//       },
//     ]);
//     // Clear the form after submission
//     setCommentFormData({
//       name: '',
//       image: '',
//       comment: '',
//     });
//   };

//   return (
//     <div className='w-full pb-10 bg-[#f9f9f9]'>
//       <div className='max-w-[1240px] mx-auto'>
//         <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black'>
//           <div className='col-span-2'>
//             <img
//               className='h-100 w-full object-cover'
//               src={`http://localhost:1337${blog.attributes?.coverImage.data.attributes.url}`}
//               alt={blog.attributes?.blogTitle}
//             />
//             <h1 className='font-bold text-3xl my-1 pt-5'>{blog.attributes?.blogTitle}</h1>
//             <div className="pros">
//               <div className='pt-6'>
//                 {/* Wrap blogContent in a custom CSS class if needed */}
//                 <ReactMarkdown className="my-markdown">{blog.attributes?.blogContent}</ReactMarkdown>
//               </div>
//             </div>

//             {/* Comment Section */}
//             <div className="mt-8 border-t pt-8">
//               <h2 className="text-xl font-semibold mb-4">Leave a Comment</h2>
//               <form onSubmit={handleCommentSubmit}>
//                 <div className="mb-4">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={commentFormData.name}
//                     onChange={handleCommentChange}
//                     className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="image" className="block text-sm font-medium text-gray-700">Choose Image</label>
//                   <input
//                     type="file"
//                     id="image"
//                     name="image"
//                     accept="image/*"
//                     onChange={handleCommentChange}
//                     className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
//                   <textarea
//                     id="comment"
//                     name="comment"
//                     value={commentFormData.comment}
//                     onChange={handleCommentChange}
//                     className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                     rows="4"
//                     required
//                   ></textarea>
//                 </div>
//                 <div className="text-center">
//                   <button
//                     type="submit"
//                     className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>

//             {/* Display Comments */}
//             <div className="mt-8 border-t pt-8">
//               <h2 className="text-xl font-semibold mb-4">Comments</h2>
//               {comments.map((comment) => (
//                 <div key={comment.id} className="flex items-start space-x-4 mb-4">
//                   {comment.image && (
//                     <img
//                       src={comment.image}
//                       alt="Commenter"
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
//                   )}
//                   <div>
//                     <p className="font-semibold">{comment.name}</p>
//                     <p>{comment.comment}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className='items-center w-full bg-white rounded-xl drop-shadow-md py-5 max-h-[220px]'>
//             {blog.attributes?.authorImg?.data?.attributes?.url && (
//               <div>
//                 <img
//                   className='p-2 w-32 h-32 rounded-full mx-auto object-cover'
//                   src={`http://localhost:1337${blog.attributes.authorImg.data.attributes.url}`}
//                   alt={blog.attributes?.authorName}
//                 />
//                 <h1 className='font-bold text-1xl text-center text-gray-900 pt-3'>{blog.attributes?.authorName}</h1>
//                 <p className='text-center text-gray-900 font-medium'>{blog.attributes?.authorDesc}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogContent;







// import React from 'react';
// import { useParams } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown'; // Assuming correct import

// const BlogContent = ({ blogs }) => {
//   console.log("Blog Object:", blogs); // Check the data structure

//   const { id } = useParams();

//   let blog = {};
//   if (blogs?.data) {
//     const arr = blogs.data.filter((blog) => blog.id == id);
//     blog = arr[0];
//   }

//   return (
//     <div className='w-full pb-10 bg-[#f9f9f9]'>
//       <div className='max-w-[1240px] mx-auto'>
//         <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black'>
//           <div className='col-span-2'>
//             <img
//               className='h-100 w-full object-cover'
//               src={`http://localhost:1337${blog.attributes?.coverImage.data.attributes.url}`}
//               alt={blog.attributes?.blogTitle}
//             />
//             <h1 className='font-bold text-3xl my-1 pt-5'>{blog.attributes?.blogTitle}</h1>
//             <div className="pros">
//               <div className='pt-6'>
//                 {/* Wrap blogContent in a custom CSS class if needed */}
//                 <ReactMarkdown className="my-markdown">{blog.attributes?.blogContent}</ReactMarkdown>
//               </div>
//             </div>
//           </div>
//           <div className='items-center w-full bg-white rounded-xl drop-shadow-md py-5 max-h-[220px]'>
//             {blog.attributes?.authorImg?.data?.attributes?.url && (
//               <div>
//                 <img
//                   className='p-2 w-32 h-32 rounded-full mx-auto object-cover'
//                   src={`http://localhost:1337${blog.attributes.authorImg.data.attributes.url}`}
//                   alt={blog.attributes?.authorName}
//                 />
//                 <h1 className='font-bold text-1xl text-center text-gray-900 pt-3'>{blog.attributes?.authorName}</h1>
//                 <p className='text-center text-gray-900 font-medium'>{blog.attributes?.authorDesc}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogContent;



// import React from 'react';
// import { useParams } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';

// const BlogContent = ({ blogs }) => {
//     console.log("Blog Object");

//     const { id } = useParams();

//     let blog = {};
//     if (blogs?.data) {
//         const arr = blogs.data.filter((blog) => blog.id == id);
//         blog = arr[0];
//     }

//     return (
//         <div className='w-full pb-10 bg-[#f9f9f9]'>
//             <div className='max-w-[1240px] mx-auto'>
//                 <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black'>
//                     <div className='col-span-2'>
//                         <img
//                             className='h-60 w-full object-cover'
//                             src={`http://localhost:1337${blog.attributes.coverImage.data.attributes.url}`}
//                             alt={blog.attributes.blogTitle}
//                         />
//                         <h1 className='font-bold text-2xl my-1 pt-5'>{blog.attributes?.blogTitle}</h1>
//                         <div className="pros">
//                             <div className='pt-6'>
//                                 <ReactMarkdown className='line-break'>{blog.attributes.blogContent}</ReactMarkdown>
//                             </div>
//                         </div>
//                     </div>

//                     <div className='items-center w-full bg-white rounded-xl drop-shadow-md py-5 max-h-[250px]'>
//                         {blog.attributes?.authorImg?.data?.attributes?.url && (
//                             <div>
//                                 <img
//                                     className='p-2 w-32 h-32 rounded-full mx-auto object-cover'
//                                     src={`http://localhost:1337${blog.attributes.authorImg.data.attributes.url}`}
//                                     alt={blog.attributes?.authorName}
//                                 />
//                                 <h1 className='font-bold text-2xl text-center text-gray-900 pt-3'>{blog.attributes?.authorName}</h1>
//                                 <p className='text-center text-gray-900 font-medium'>{blog.attributes?.authorDesc}</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BlogContent;



// import React from 'react';
// import { useParams } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown'

// const BlogContent = ({blogs}) => {
//     console.log("Blog Object")

//     const {id}=useParams()


//     let blog={}
//     if(blog){
//             let arr = blogs.data.filter(blog=> blog.id == id)
//             blog=arr[0]

//     }else{
//         blog={}
//     }




//     // const blogs=[
//     //     {
//     //         "id":1,
//     //         'title':'Blog 1',
//     //         'desc':"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
//     //         'coverImg':'https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png',
//     //         'content':'Intro to Web3 Day 1: Intro to Web3 What is Web3To put it simply, Web3 is the latest version of what we know as the internet. In this version, people have full ownership of their content, data and assets. There are also no middlemen involved, which is presently the case with large corporations and governments controlling and regulating whatever goes on the internet. In some areas, you may read some terms like decentralized and democratization of the internet being used for Web3, which can be sort of confusing. But for now, think of decentralization as not being controlled and monitored by others, rather, by yourself. Web1 = read  Web1 happened when the internet was officially introduced in the 1980s onwards. Few individuals or groups created content - like news media outlets, search engines, directories. During this era, the majority of traffic used the internet in a read-only capacity. They searched for an article, read it and closed it, that’s mostly how far it went. Very little participation. An example of Web 1 = Yahoo.comWeb2 - read, write Web2 came about in the 2000s and is still pretty much there. Now users like me and you can share our thoughts on that article we read, and that too, amongst our friends on social networks. It made space for everyone to become a content creator and consumer simultaneously - although those of us who gathered followerships only got paid. Now media is produced on social networks, who then are able to sell personal data to advertisers in order to generate massive amounts of revenue. But since they collect a lot of our personal data, privacy has started to become a concern.An example of Web2: YouTubeWeb3 - read, write, ownSince privacy and personal data became a concern, Web3 solves that. With Web3, participants will have full ownership over their content, data, and assets. It represents a democratized Internet – an Internet that is governed by users for the benefit of users. Right now everything is controlled by the people at the top - in Web3, they may not exist. Even if they do, you won’t need them because you’ll own what you create. An example of Web3: Mirror.xyz Expanding more into this, Web3 will give users full ownership of their assets, data, practically anything via blockchains. Now, what are blockchains? Blockchain is a public list of records. It stores information in batches called blocks. These blocks are linked together to form a continuous line. A chain of blocks. A blockchain. Each block is like a page of a record book. What isn’t blockchainBlockchain is NOT a cryptocurrency.Blockchain is NOT a programming language.Blockchain is NOT a cryptographic codification.Blockchain is NOT an AI or Machine Learning technology.Blockchain is NOT a Python library or framework.Nope, nada, naa. Let’s move on. But before I mention the word I’m about to,Here’s the definition for immutable: unchanging over time or unable to be changedSynonyms include: fixed - set - unchangeable - rigid - unshakeable - irremovable So, again, what does blockchain do for me?It works as an immutable (fixed, unchangeable, unshakeable) record of transactions that do not require to rely on any external authority like banks, governments, large corporations to validate the authenticity and integrity of the data. As I mentioned earlier, Blockchain is a public database of information, that means there is no central body or single entity control (say Mark Zuckerberg) managing and controlling the database and evil laughing. In fact, millions of users on the Internet help manage and maintain the records. That’s decentralized and democratized for you, hah, take that Facebook!So in a nutshell, these changes will create an open, trustless, and permissionless network. Let me explain if this sounds wild to you.Open: It will be an open-source software built by an open and accessible community of developers and executed in the full view of the world.Trustless: It will allow participants to interact publicly or privately without any third party butting in.Permissionless: Neither users nor suppliers need any authorization from a governing body for participating.If you have questions, head over to our Discord and shoot! See ya tomorrow with another bite-sized web3 lesson! 👋',
//     //         'authorName':'John Doe',
//     //         'authorImg' :'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     //         'authorDesc':'Web Developer'

//     //     },
//     //     {
//     //         "id":2,
//     //         'title':'Blog 2',
//     //         'desc':"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
//     //         'coverImg':'https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png',
//     //         'content':'Intro to Web3 Day 1: Intro to Web3 What is Web3To put it simply, Web3 is the latest version of what we know as the internet. In this version, people have full ownership of their content, data and assets. There are also no middlemen involved, which is presently the case with large corporations and governments controlling and regulating whatever goes on the internet. In some areas, you may read some terms like decentralized and democratization of the internet being used for Web3, which can be sort of confusing. But for now, think of decentralization as not being controlled and monitored by others, rather, by yourself. Web1 = read  Web1 happened when the internet was officially introduced in the 1980s onwards. Few individuals or groups created content - like news media outlets, search engines, directories. During this era, the majority of traffic used the internet in a read-only capacity. They searched for an article, read it and closed it, that’s mostly how far it went. Very little participation. An example of Web 1 = Yahoo.comWeb2 - read, write Web2 came about in the 2000s and is still pretty much there. Now users like me and you can share our thoughts on that article we read, and that too, amongst our friends on social networks. It made space for everyone to become a content creator and consumer simultaneously - although those of us who gathered followerships only got paid. Now media is produced on social networks, who then are able to sell personal data to advertisers in order to generate massive amounts of revenue. But since they collect a lot of our personal data, privacy has started to become a concern.An example of Web2: YouTubeWeb3 - read, write, ownSince privacy and personal data became a concern, Web3 solves that. With Web3, participants will have full ownership over their content, data, and assets. It represents a democratized Internet – an Internet that is governed by users for the benefit of users. Right now everything is controlled by the people at the top - in Web3, they may not exist. Even if they do, you won’t need them because you’ll own what you create. An example of Web3: Mirror.xyz Expanding more into this, Web3 will give users full ownership of their assets, data, practically anything via blockchains. Now, what are blockchains? Blockchain is a public list of records. It stores information in batches called blocks. These blocks are linked together to form a continuous line. A chain of blocks. A blockchain. Each block is like a page of a record book. What isn’t blockchainBlockchain is NOT a cryptocurrency.Blockchain is NOT a programming language.Blockchain is NOT a cryptographic codification.Blockchain is NOT an AI or Machine Learning technology.Blockchain is NOT a Python library or framework.Nope, nada, naa. Let’s move on. But before I mention the word I’m about to,Here’s the definition for immutable: unchanging over time or unable to be changedSynonyms include: fixed - set - unchangeable - rigid - unshakeable - irremovable So, again, what does blockchain do for me?It works as an immutable (fixed, unchangeable, unshakeable) record of transactions that do not require to rely on any external authority like banks, governments, large corporations to validate the authenticity and integrity of the data. As I mentioned earlier, Blockchain is a public database of information, that means there is no central body or single entity control (say Mark Zuckerberg) managing and controlling the database and evil laughing. In fact, millions of users on the Internet help manage and maintain the records. That’s decentralized and democratized for you, hah, take that Facebook!So in a nutshell, these changes will create an open, trustless, and permissionless network. Let me explain if this sounds wild to you.Open: It will be an open-source software built by an open and accessible community of developers and executed in the full view of the world.Trustless: It will allow participants to interact publicly or privately without any third party butting in.Permissionless: Neither users nor suppliers need any authorization from a governing body for participating.If you have questions, head over to our Discord and shoot! See ya tomorrow with another bite-sized web3 lesson! 👋',
//     //         'authorName':'John Doe',
//     //         'authorImg' :'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     //         'authorDesc':'Web Developer'
//     //     },
//     //     {
//     //         "id":3,
//     //         'title':'Blog 3',
//     //         'desc':"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
//     //         'coverImg':'https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png',
//     //         'content':'Intro to Web3 Day 1: Intro to Web3 What is Web3To put it simply, Web3 is the latest version of what we know as the internet. In this version, people have full ownership of their content, data and assets. There are also no middlemen involved, which is presently the case with large corporations and governments controlling and regulating whatever goes on the internet. In some areas, you may read some terms like decentralized and democratization of the internet being used for Web3, which can be sort of confusing. But for now, think of decentralization as not being controlled and monitored by others, rather, by yourself. Web1 = read  Web1 happened when the internet was officially introduced in the 1980s onwards. Few individuals or groups created content - like news media outlets, search engines, directories. During this era, the majority of traffic used the internet in a read-only capacity. They searched for an article, read it and closed it, that’s mostly how far it went. Very little participation. An example of Web 1 = Yahoo.comWeb2 - read, write Web2 came about in the 2000s and is still pretty much there. Now users like me and you can share our thoughts on that article we read, and that too, amongst our friends on social networks. It made space for everyone to become a content creator and consumer simultaneously - although those of us who gathered followerships only got paid. Now media is produced on social networks, who then are able to sell personal data to advertisers in order to generate massive amounts of revenue. But since they collect a lot of our personal data, privacy has started to become a concern.An example of Web2: YouTubeWeb3 - read, write, ownSince privacy and personal data became a concern, Web3 solves that. With Web3, participants will have full ownership over their content, data, and assets. It represents a democratized Internet – an Internet that is governed by users for the benefit of users. Right now everything is controlled by the people at the top - in Web3, they may not exist. Even if they do, you won’t need them because you’ll own what you create. An example of Web3: Mirror.xyz Expanding more into this, Web3 will give users full ownership of their assets, data, practically anything via blockchains. Now, what are blockchains? Blockchain is a public list of records. It stores information in batches called blocks. These blocks are linked together to form a continuous line. A chain of blocks. A blockchain. Each block is like a page of a record book. What isn’t blockchainBlockchain is NOT a cryptocurrency.Blockchain is NOT a programming language.Blockchain is NOT a cryptographic codification.Blockchain is NOT an AI or Machine Learning technology.Blockchain is NOT a Python library or framework.Nope, nada, naa. Let’s move on. But before I mention the word I’m about to,Here’s the definition for immutable: unchanging over time or unable to be changedSynonyms include: fixed - set - unchangeable - rigid - unshakeable - irremovable So, again, what does blockchain do for me?It works as an immutable (fixed, unchangeable, unshakeable) record of transactions that do not require to rely on any external authority like banks, governments, large corporations to validate the authenticity and integrity of the data. As I mentioned earlier, Blockchain is a public database of information, that means there is no central body or single entity control (say Mark Zuckerberg) managing and controlling the database and evil laughing. In fact, millions of users on the Internet help manage and maintain the records. That’s decentralized and democratized for you, hah, take that Facebook!So in a nutshell, these changes will create an open, trustless, and permissionless network. Let me explain if this sounds wild to you.Open: It will be an open-source software built by an open and accessible community of developers and executed in the full view of the world.Trustless: It will allow participants to interact publicly or privately without any third party butting in.Permissionless: Neither users nor suppliers need any authorization from a governing body for participating.If you have questions, head over to our Discord and shoot! See ya tomorrow with another bite-sized web3 lesson! 👋',
//     //         'authorName':'John Doe',
//     //         'authorImg' :'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     //         'authorDesc':'Web Developer'
//     //     },
//     // ]

//     // let blog = blogs.filter(blog=> blog.id == id)
//     // blog = blog[0]
//     // console.log(blog)


//   return (
//     <div className='w-full pb-10 bg-[#f9f9f9]'>
//         <div className='max-w-[1240px] mx-auto'>

//             <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1
//             md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black'>

//                 <div className='col-span-2 '>
//                     <img className='h-56 w-full object-cover' src={`http://localhost:1337${blog.attributes.coverImg.data.attributes.url}`} />
//                     <h1 className='font-bold text-2xl my-1 pt-5'>{blog.attributes.blogTitle}</h1>
//                     <div className='pt-5'><ReactMarkdown className='line-break'>{blog.attributes.blogContent}</ReactMarkdown></div>

//                 </div>

//                 <div className='items-center w-full bg-white rounded-xl drop-shadow-md py-5 max-h-[250px]'>
//                     <div>
//                         <img className='p-2 w-32 h-32 rounded-full mx-auto object-cover' src={`http://localhost:1337${blog.attributes.authorImg.data.attributes.url}`} />
//                         <h1 className='font-bold text-2xl text-center text-gray-900 pt-3'>{blog.attributes.authorName}</h1>
//                         <p className='text-center text-gray-900 font-medium'>{blog.attributes.authorDesc}</p>
//                     </div>

//                 </div>


//             </div>

//         </div>
//     </div>






//     // <div className='w-full pb-10 bg-[#f9f9f9]'>
//     //     <div className='max-w-[1240px] mx-auto'>

//     //         <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1
//     //         md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black'>

//     //             <div className='col-span-2 '>
//     //                 <img className='h-56 w-full object-cover' src={blog.coverImg} />
//     //                 <h1 className='font-bold text-2xl my-1 pt-5'>{blog.title}</h1>
//     //                 <div className='pt-5'><p>{blog.content}</p></div>

//     //             </div>

//     //             <div className='items-center w-full bg-white rounded-xl drop-shadow-md py-5 max-h-[250px]'>
//     //                 <div>
//     //                     <img className='p-2 w-32 h-32 rounded-full mx-auto object-cover' src={blog.authorImg} />
//     //                     <h1 className='font-bold text-2xl text-center text-gray-900 pt-3'>{blog.authorName}</h1>
//     //                     <p className='text-center text-gray-900 font-medium'>{blog.authorDesc}</p>
//     //                 </div>

//     //             </div>


//     //         </div>

//     //     </div>
//     // </div>
//   )
// }

// export default BlogContent

