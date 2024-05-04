import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Culture = () => {
    let { loading, blogData, error } = useFetch('http://localhost:1337/api/blogs?populate=*&filters[category][Name][$eq]=Earth');
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow px-4 py-8">
                <div className="max-w-[1240px] mx-auto mb-8">
                    <h1 className="text-4xl font-bold text-left mb-4">Earth</h1>
                    <div className="flex items-center">
                        <hr className="border-b-2 border-black flex-grow" />
                    </div>
                </div>

                <div className='w-full bg-[#f9f9f9] py-[50px]'>
                    <div className='max-w-[1240px] mx-auto'>
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black'>
                            {/* Check if blogs data exists before showing blogs */}
                            {blogData?.data?.length > 0 && (
                                blogData.data.map((blog) => (
                                    <Link key={blog.id} to={`/${blog.attributes.locale}/${blog.attributes.category.data.attributes.Name.toLowerCase()}/${blog.attributes.slug}`}>
                                        <div className='bg-white rounded-xl overflow-hidden drop-shadow-md'>
                                            <img
                                                className='h-40 w-full object-cover'
                                                src={`http://localhost:1337${blog.attributes.coverImage.data.attributes.url}`}
                                                alt={blog.attributes.blogTitle}
                                            />
                                            <div className='p-8'>
                                                <h3 className='font-bold text-2xl my-1 hover:underline'>{blog.attributes.blogTitle}</h3>
                                                <p className='text-gray-600 text-medium'>{new Date(blog.attributes.updatedAt).toLocaleDateString()} | {blog.attributes.category.data.attributes.Name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Culture;