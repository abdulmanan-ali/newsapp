import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Blog = ({ blogData }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="bg-white dark:bg-gray-100 h-screen h-full py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
            {/* image - start */}
            <a
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
            >
              <img
                src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/18f1/live/e9578e40-2b42-11ef-ac98-8d216198b128.png.webp"
                loading="lazy"
                alt="Photo by Minh Pham"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg"> also known as placeholder text. It shares some characteristics of a real written text.
              </span>
            </a>
            {/* image - end */}

            {/* image - start */}
            <a
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
            >
              <img
                src="https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&q=75&fit=crop&w=1000"
                loading="lazy"
                alt="Photo by Magicle"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Tech</span>
            </a>
            {/* image - end */}

            {/* image - start */}
            <a
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
            >
              <img
                src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000"
                loading="lazy"
                alt="Photo by Martin Sanchez"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Dev</span>
            </a>
            {/* image - end */}

            {/* image - start */}
            <a
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
            >
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
                loading="lazy"
                alt="Photo by Lorenzo Herrera"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Retro</span>
            </a>
            {/* image - end */}
          </div>
        </div>
      </div>

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow px-4 py-8">
          <div className="max-w-[1240px] mx-auto mb-8">
            <h1 className="text-4xl font-bold text-left mb-4 text-red-600">{t('blog.Top News & Articles')}</h1>
            <div className="flex items-center">
              <hr className="border-b-2 border-black flex-grow" />
            </div>
          </div>

          <div className="w-full bg-[#f9f9f9] py-[50px]">
            <div className="max-w-[1240px] mx-auto">
              <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black">
                {blogData?.data?.length > 0 &&
                  blogData.data.map((blog) => (
                    <Link
                      key={blog.id}
                      to={`/${blog.attributes.locale}/${blog.attributes.category.data.attributes.Name.toLowerCase()}/${blog.attributes.slug}`}
                    >
                      <div className="bg-white rounded-xl overflow-hidden drop-shadow-md">
                        <img
                          className="h-40 w-full object-cover"
                          src={`http://localhost:1337${blog.attributes.coverImage.data.attributes.url}`}
                          alt={blog.attributes.blogTitle}
                        />
                        <div className="p-8">
                          <h3 className="font-bold text-2xl my-1 hover:underline">
                            {blog.attributes.blogTitle}
                          </h3>
                          <p className="text-gray-600 text-medium">
                            {new Date(
                              blog.attributes.updatedAt
                            ).toLocaleDateString()}{" "}
                            | {blog.attributes.category.data.attributes.Name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>

  );
};

export default Blog;




// import React from 'react';
// import { Link } from 'react-router-dom';
// import useFetch from '../hooks/useFetch';

// const Blog = () => {
//     let { loading, blogData, error } = useFetch('http://localhost:1337/api/blogs?populate=*');
//     if (loading) return (
//         <>
//             <div className="flex flex-col min-h-screen">
//                 <h1>Loading...</h1>;
//             </div>
//         </>
//     )
//     if (error) return <p>Error!</p>;

//     return (
//         <div className="flex flex-col min-h-screen">
//             <main className="flex-grow px-4 py-8">
//                 <div className="max-w-[1240px] mx-auto mb-8">
//                     <h1 className="text-4xl font-bold text-left mb-4">TOP NEWS</h1>
//                     <div className="flex items-center">
//                         <hr className="border-b-2 border-black flex-grow" />
//                     </div>
//                 </div>

//                 <div className='w-full bg-[#f9f9f9] py-[50px]'>
//                     <div className='max-w-[1240px] mx-auto'>
//                         <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black'>
//                             {/* Check if blogs data exists before showing blogs */}
//                             {blogData?.data?.length > 0 && (
//                                 blogData.data.map((blog) => (
//                                     <Link key={blog.id} to={`/${blog.attributes.locale}/${blog.attributes.category.data.attributes.Name.toLowerCase()}/${blog.attributes.slug}`}>
//                                         <div className='bg-white rounded-xl overflow-hidden drop-shadow-md'>
//                                             <img
//                                                 className='h-40 w-full object-cover'
//                                                 src={`http://localhost:1337${blog.attributes.coverImage.data.attributes.url}`}
//                                                 alt={blog.attributes.blogTitle}
//                                             />
//                                             <div className='p-8'>
//                                                 <h3 className='font-bold text-2xl my-1 hover:underline'>{blog.attributes.blogTitle}</h3>
//                                                 <p className='text-gray-600 text-medium'>{new Date(blog.attributes.updatedAt).toLocaleDateString()} | {blog.attributes.category.data.attributes.Name}</p>
//                                             </div>
//                                         </div>
//                                     </Link>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 </div>


//             </main>

//         </div>
//     );
// };

// export default Blog;

