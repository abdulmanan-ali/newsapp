import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loading from './Loading';
import ServerError from './ServerError';
import { useTranslation } from 'react-i18next';

const Sports = ({ locale }) => {
    const { t, i18n } = useTranslation();


    let { loading, blogData, error } = useFetch(`http://localhost:1337/api/blogs?populate=*&filters[category][Name][$eq]=Sports&locale=${locale}`, locale);

    if (loading) return <> <Loading /> </>

    if (error) return <> <ServerError /></>;

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow px-4 py-8">
                <div className="max-w-[1240px] mx-auto mb-8">
                    <h1 className="text-4xl font-bold text-left mb-4 text-red-600">{t('blog.sports')}</h1>
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
                                        <div className='bg-white rounded-xl overflow-hidden drop-shadow-md group group'>
                                            <img
                                                className="h-40 w-full object-cover transition duration-200 group-hover:scale-110 group-hover:opacity-70"
                                                src={`http://localhost:1337${blog.attributes.coverImage.data.attributes.url}`}
                                                alt={blog.attributes.blogTitle}
                                            />
                                            <div className='p-8'>
                                                <h3 className='font-bold text-2xl my-1 hover:underline hover:text-red-700'>{blog.attributes.blogTitle}</h3>
                                                <p className='text-gray-600 text-sm mt-3'>{new Date(blog.attributes.updatedAt).toLocaleDateString()} | {blog.attributes?.authorName}</p>
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

export default Sports;