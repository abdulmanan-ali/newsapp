import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddArticle = () => {
  const [formData, setFormData] = useState({
    blogTitle: '',
    blogDesc: '',
    blogContent: '',
    coverImage: null,
    authorImg: null,
    authorName: '',
    authorDesc: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    if (event.target.type === 'file') {
      setFormData({ ...formData, [event.target.name]: event.target.files[0] });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.blogTitle || !formData.blogContent || !formData.coverImage || !formData.authorImg) {
      setError('Please fill out all required fields');
      return;
    }

    const formDataToSend = new FormData(); // Use FormData for multipart data
    formDataToSend.append('data', JSON.stringify({
      blogTitle: formData.blogTitle,
      blogDesc: formData.blogDesc,
      blogContent: formData.blogContent,
      authorName: formData.authorName,
      authorDesc: formData.authorDesc,
      publishedAt: null,
    }));
    formDataToSend.append('files.coverImage', formData.coverImage); // Append cover image file
    formDataToSend.append('files.authorImg', formData.authorImg); // Append author image file

    try {
      const response = await axios.post('http://localhost:1337/api/blogs/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Article added successfully!', response.data);
      toast.success('Article submitted successfully!'); // Success toast
      // Clear form or redirect to another page (optional)
    } catch (error) {
      console.error('Error adding article:', error);
      toast.error('An error occurred. Please try again later.'); // Error toast
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mt-9 mb-8">Add Article</h1>

      <form className="grid grid-cols-1 gap-6 bg-white rounded-lg shadow-md p-9" onSubmit={handleSubmit}>
        {/* Title Field */}
        <div>
          <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700">
            Title (English)
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
            <label htmlFor="blogDesc" className="block text-sm font-medium text-gray-700">
              Description
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
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
            Select a Cover Image
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

        {/* Content Field */}
        <div>
          <label htmlFor="blogContent" className="block text-sm font-medium text-gray-700">
            Content (English)
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
          <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700">
            Your Name (English)
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
          <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700">
            Desc (English)
          </label>
          <input
            type="text"
            id="authorDesc"
            name="authorDesc"
            value={formData.authorDesc}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
            Upload Your Image
          </label>
          <input
            type="file"
            id="authorImg"
            name="authorImg"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
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
  );
};

export default AddArticle;




// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const AddArticle = () => {
//   const [formData, setFormData] = useState({
//     blogTitle: '',
//     blogDesc: '',
//     blogContent: '',
//     coverImage: "", // Store image as a file object
//   });

//   const handleChange = (event) => {
//     if (event.target.type === 'file') {
//       setFormData({ ...formData, coverImage: event.target.files[0] }); // Store uploaded image
//     } else {
//       setFormData({ ...formData, [event.target.name]: event.target.value }); // Handle other form fields
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formDataToSend = new FormData(); // Use FormData for multipart data
//     formDataToSend.append('data', JSON.stringify({
//       blogTitle: formData.blogTitle,
//       blogDesc: formData.blogDesc,
//       blogContent: formData.blogContent,
//       publishedAt: null
//     }));
//     formDataToSend.append('files.coverImage', formData.coverImage); // Append image file

//     try {
//       const response = await axios.post('http://localhost:1337/api/blogs/', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       console.log('Article added successfully!', response.data);
//       toast.success('Article submitted successfully!'); // Success toast
//       // Clear form or redirect to another page (optional)
//     } catch (error) {
//       console.error('Error adding article:', error);
//       toast.error('An error occurred. Please try again later.'); // Error toast
//     }
//   };

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();
  
//   //   const formDataToSend = new FormData(); // Use FormData for multipart data
//   //   formDataToSend.append('data', JSON.stringify({
//   //     blogTitle: formData.blogTitle,
//   //     blogDesc: formData.blogDesc,
//   //     blogContent: formData.blogContent,
//   //     publishedAt:null
//   //   }));
//   //   formDataToSend.append('files.coverImage', formData.coverImage); // Append image file
  
//   //   try {
//   //     const response = await axios.post('http://localhost:1337/api/blogs/', formDataToSend, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data'
//   //       }
//   //     });
  
//   //     console.log('Article added successfully!', response.data);
//   //     // Handle successful submission (e.g., clear form, show success message)
//   //   } catch (error) {
//   //     console.error('Error adding article:', error);
//   //     // Handle errors (e.g., display error message to user)
//   //   }
//   // };
  

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();

//   //   const formDataToSend = new FormData(); // Use FormData for multipart data
//   //   formDataToSend.append('blogTitle', formData.blogTitle);
//   //   formDataToSend.append('blogDesc', formData.blogDesc);
//   //   formDataToSend.append('blogContent', formData.blogContent);
//   //   formDataToSend.append('coverImage', formData.coverImage); // Append image file

//   //   const dataToSend = { data: Object.fromEntries(formDataToSend) };

//   //   try {
//   //     const response = await axios.post('http://localhost:1337/api/blogs/', dataToSend);

//   //     console.log('Article added successfully!', response.data);
//   //     // Handle successful submission (e.g., clear form, show success message)
//   //   } catch (error) {
//   //     console.error('Error adding article:', error);
//   //     // Handle errors (e.g., display error message to user)
//   //   }
//   // };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mt-9 mb-8">Add Article</h1>

//       {/* <h1 className="text-3xl font-bold text-center mb-8">Add Article</h1> */}

//       <form className="grid grid-cols-1 gap-6 bg-white rounded-lg shadow-md p-9" onSubmit={handleSubmit}>
//         {/* Title Field */}
//         <div>
//           <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700">
//             Title (English)
//           </label>
//           <input
//             type="text"
//             id="blogTitle"
//             name="blogTitle"
//             value={formData.blogTitle}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         {/* Description Field */}
//         <div>
//           <label htmlFor="blogDesc" className="block text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <input
//             type="text"
//             id="blogDesc"
//             name="blogDesc"
//             value={formData.blogDesc}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
//             Select a Cover Image
//           </label>
//           <input
//             type="file"
//             id="coverImage"
//             name="coverImage"
//             accept="image/*"
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         {/* Content Field */}
//         <div>
//           <label htmlFor="blogContent" className="block text-sm font-medium text-gray-700">
//             Content (English)
//           </label>
//           <textarea
//             id="blogContent"
//             name="blogContent"
//             value={formData.blogContent}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-[200px]"
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="text-center">
//           <button
//             type="submit"
//             className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddArticle;
