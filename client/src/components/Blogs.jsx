import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

const Blog = ({ blogData, locale }) => {
  const { t } = useTranslation();

  // Fetch the articles based on divisions
  const articles = {
    main: blogData?.data?.find((blog) =>
      blog.attributes.divisions.data.some(
        (division) => division.attributes.Name === "home-top-center"
      )
    ),
    left:
      blogData?.data
        ?.filter((blog) =>
          blog.attributes.divisions.data.some(
            (division) =>
              division.attributes.Name === "home-top-left-1" ||
              division.attributes.Name === "home-top-left-2"
          )
        )
        .sort(
          (a, b) =>
            new Date(b.attributes.updatedAt) - new Date(a.attributes.updatedAt)
        ) || [],
    right:
      blogData?.data
        ?.filter((blog) =>
          blog.attributes.divisions.data.some(
            (division) =>
              division.attributes.Name === "home-top-right-1" ||
              division.attributes.Name === "home-top-right-2" ||
              division.attributes.Name === "home-top-right-3" ||
              division.attributes.Name === "home-top-right-4"
          )
        )
        .sort(
          (a, b) =>
            new Date(b.attributes.updatedAt) - new Date(a.attributes.updatedAt)
        ) || [],
  };

  // Combine all articles from the upper grid section
  const upperGridArticles = [
    articles.main,
    ...articles.left,
    ...articles.right,
  ].filter(Boolean); // Filter out undefined values

  // Extract IDs of upper grid articles
  const upperGridArticleIds = upperGridArticles.map((article) => article.id);

  // Filter out articles that are already in the upper grid section
  const filteredBlogData = blogData?.data?.filter(
    (blog) => !upperGridArticleIds.includes(blog.id)
  );

  // Sort the filtered blog data by updatedAt in descending order
  const sortedFilteredBlogData = filteredBlogData.sort(
    (a, b) =>
      new Date(b.attributes.updatedAt) - new Date(a.attributes.updatedAt)
  );

  return (
    <>
      <div className="bg-white dark:bg-gray-100 h-full py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {/* Upper grid section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b-2 border-gray-300 pb-8">
            {/* Left Column */}
            <div className="md:col-span-1">
              {articles.left.map((article, index) => (
                <div key={index} className="mb-8">
                  <Link
                    to={`/${locale}/${article.attributes.category.data.attributes.Name.toLowerCase()}/${
                      article.attributes.slug
                    }`}
                  >
                    <Link
                      className="hover:underline hover:text-red-700"
                      to={`/${locale}/${article.attributes.category.data.attributes.Name.toLowerCase()}/${
                        article.attributes.slug
                      }`}
                    >
                      <img
                        src={`http://localhost:1337${article.attributes.coverImage.data.attributes.url}`}
                        alt={article.attributes.blogTitle}
                        className="mb-4 w-full h-full object-cover rounded-lg shadow-lg hover:opacity-70"
                      />
                      <h2 className="text-xl font-bold hover:underline hover:text-red-700">
                        {article.attributes.blogTitle}
                      </h2>
                    </Link>
                    <p className="mt-2">{article.attributes.blogDesc}</p>
                    <p className="text-gray-600 mt-4 text-sm">
                      {timeAgo(article.attributes.updatedAt)} |{" "}
                      {article.attributes.category.data.attributes.Name}
                    </p>
                  </Link>
                  <hr className="mt-4 border-t-2 border-gray-200 w-full max-w-screen-lg mx-auto my-8" />
                </div>
              ))}
            </div>

            {/* Center Column */}
            <div className="md:col-span-1">
              {articles.main && (
                <div className="mb-8">
                  <Link
                    to={`/${locale}/${articles.main.attributes.category.data.attributes.Name.toLowerCase()}/${
                      articles.main.attributes.slug
                    }`}
                  >
                    <Link
                      className="hover:underline hover:text-red-700"
                      to={`/${locale}/${articles.main.attributes.category.data.attributes.Name.toLowerCase()}/${
                        articles.main.attributes.slug
                      }`}
                    >
                      <img
                        src={`http://localhost:1337${articles.main.attributes.coverImage.data.attributes.url}`}
                        alt={articles.main.attributes.blogTitle}
                        className="w-full h-96 object-cover rounded-lg shadow-lg mb-4 hover:opacity-70"
                      />
                      <h1 className="text-2xl font-bold hover:underline hover:text-red-700">
                        {articles.main.attributes.blogTitle}
                      </h1>
                    </Link>
                    <p className="mt-2">{articles.main.attributes.blogDesc}</p>
                    <p className="text-gray-600 text-sm mt-4">
                      {timeAgo(articles.main.attributes.updatedAt)} |{" "}
                      {articles.main.attributes.category.data.attributes.Name}
                    </p>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="md:col-span-1">
              {articles.right.map((article, index) => (
                <div key={index} className="mb-4">
                  <Link
                    to={`/${locale}/${article.attributes.category.data.attributes.Name.toLowerCase()}/${
                      article.attributes.slug
                    }`}
                  >
                    <h2 className="text-xl font-bold mb-2 hover:underline hover:text-red-700">
                      {article.attributes.blogTitle}
                    </h2>
                    <p className="mt-2 mb-2">{article.attributes.blogDesc}</p>
                    <p className="text-gray-600 text-sm mt-4">
                      {timeAgo(article.attributes.updatedAt)} |{" "}
                      {article.attributes.category.data.attributes.Name}
                    </p>
                  </Link>
                  <hr className="mt-4 border-t-2 border-gray-200 w-full max-w-screen-lg mx-auto my-8" />
                </div>
              ))}
            </div>
          </div>

          {/* Center grid section */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8 mb-8 border-b-2 border-gray-300 pb-8">
            <Link
              to={`/${locale}/earth`}
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1666792562882-8bd04befec7e?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                loading="lazy"
                alt="Photo by Minh Pham"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110 group-hover:opacity-70"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                {t("navbar.earth")}
              </span>
            </Link>
            <Link
              to={`/${locale}/sports`}
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
            >
              <img
                src="https://images.unsplash.com/photo-1590324845601-85453ab92322?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                loading="lazy"
                alt="Photo by Magicle"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110 group-hover:opacity-70"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                {t("navbar.sports")}
              </span>
            </Link>
            <Link
              to={`/${locale}/travel`}
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
            >
              <img
                src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                loading="lazy"
                alt="Photo by Martin Sanchez"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110 group-hover:opacity-70"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                {t("navbar.travel")}
              </span>
            </Link>
            <Link
              to={`/${locale}/innovation`}
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1661727547850-3d7c020a64a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                loading="lazy"
                alt="Photo by Lorenzo Herrera"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110 group-hover:opacity-70"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                {t("navbar.innovation")}
              </span>
            </Link>
          </div>

          {/* Blog articles section */}
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow px-4 py-8 border-b-2 border-gray-300">
              <div className="max-w-[1240px] mx-auto mb-8">
                <div className="flex items-center">
                  {/* <hr className="border-b-2 border-black flex-grow" /> */}
                </div>
                <h1 className="text-3xl font-bold ml-0 mt-0 pt-0 text-red-600 m-4">
                  {t("blog.Top News & Articles")}
                </h1>
              </div>

              <div className="w-full bg-[#f9f9f9] py-[50px]">
                <div className="max-w-[1240px] mx-auto">
                  <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 text-black">
                    {sortedFilteredBlogData?.length > 0 &&
                      sortedFilteredBlogData.map((blog) => (
                        <Link
                          key={blog.id}
                          to={`/${
                            blog.attributes.locale
                          }/${blog.attributes.category.data.attributes.Name.toLowerCase()}/${
                            blog.attributes.slug
                          }`}
                        >
                          <div className="bg-white rounded-xl overflow-hidden drop-shadow-md group">
                            <img
                              className="h-40 w-full object-cover transition duration-200 group-hover:scale-110 group-hover:opacity-70"
                              src={`http://localhost:1337${blog.attributes.coverImage.data.attributes.url}`}
                              alt={blog.attributes.blogTitle}
                            />
                            <div className="p-8">
                              <h3 className="font-bold text-2xl hover:underline hover:text-red-700">
                                {blog.attributes.blogTitle}
                              </h3>
                              <p className="text-gray-600 text-sm pt-2">
                                {timeAgo(blog.attributes.updatedAt)} |{" "}
                                {blog.attributes.category.data.attributes.Name}
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
        </div>
      </div>
    </>
  );
};

export default Blog;
