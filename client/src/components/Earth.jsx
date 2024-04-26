import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = ({ blogs }) => {
    return (
        <div className='w-full bg-[#f9f9f9] py-[50px]'>
            <div className='max-w-[1240px] mx-auto'>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black'>
                    {/* Check if blogs data exists before showing blogs */}
                    {blogs?.data?.length > 0 && (
                        blogs.data.map((blog) => (
                            <Link key={blog.id} to={`/news/en/${blog.id}`}>
                                <div className='bg-white rounded-xl overflow-hidden drop-shadow-md'>
                                    <img
                                        className='h-40 w-full object-cover'
                                        src={`http://localhost:1337${blog.attributes.coverImage.data.attributes.url}`}
                                        alt={blog.attributes.blogTitle}
                                    />
                                    <div className='p-8'>
                                        <h3 className='font-bold text-2xl my-1'>{blog.attributes.blogTitle}</h3>
                                        {/* <p className='text-gray-600 text-xl'>{blog.attributes.blogDesc}</p> */}
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}

                    {/* Show Easter egg message if data is undefined (loading) */}
                    {!blogs?.data && (
                        <div className="text-center">
                            {blogs?.data === undefined && (
                                <p>
                                    Blogs are loading... In the meantime, here's a secret message: Shhh! This is an Easter egg!
                                </p>
                            )}
                            {blogs?.data?.length === 0 && <p>No blogs found.</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blogs;