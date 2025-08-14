import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchData } from "../../../utils/api";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);

  useEffect(() => {
    fetchData(`/api/blog/${id}`).then((res) => {
      if (res.success) setBlog(res.data);
    });

    fetchData("/api/blog/get").then((res) => {
      if (res.success) {
        const filtered = res.data.filter((item) => item._id !== id);
        setOtherBlogs(filtered);
      }
    });
  }, [id]);

  if (!blog)
    return (
      <div className="p-6 text-center text-gray-600">Loading article...</div>
    );

  return (
    <div className="container mx-auto px-4 lg:px-12 py-12 flex flex-col lg:flex-row gap-12">
      {/* Main Blog Content */}
      <article className="lg:w-2/3 space-y-8">
        {/* Main Image */}
        {blog.image?.length > 0 && (
          <img
            src={blog.image[0].url}
            alt={blog.title}
            className="w-full h-[420px] object-cover rounded-2xl shadow-md"
          />
        )}

        {/* Title & Date */}
        <div>
          <h1 className="text-4xl font-bold leading-snug text-gray-900 mb-2">
            {blog.title}
          </h1>
          <p className="text-sm text-gray-500 italic">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Description (HTML content) */}
        <div
          className="prose prose-lg max-w-none text-gray-800 leading-8 bg-white p-6 rounded-xl shadow border border-gray-100"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Additional Images */}
        {blog.image?.length > 1 && (
          <div className="mt-8 grid grid-cols-2 gap-6">
            {blog.image.slice(1).map((img) => (
              <img
                key={img.fileId}
                src={img.url}
                alt="Blog extra"
                className="rounded-xl shadow-md w-full h-64 object-cover"
              />
            ))}
          </div>
        )}
      </article>

      {/* Sidebar */}
      <aside className="lg:w-1/3">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          More From Our Projects
        </h2>
        <div className="space-y-6">
          {otherBlogs.map((item) => (
            <Link
              key={item._id}
              to={`/blog/${item._id}`}
              className="flex items-center gap-4 p-3 rounded-xl transition-all bg-white hover:shadow-md border border-gray-100 hover:border-gray-300"
            >
              {/* Thumbnail */}
              {item.image?.length > 0 && (
                <img
                  src={item.image[0].url}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              {/* Text */}
              <div className="flex-1">
                <h3 className="text-md font-semibold text-gray-900 mb-1 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {item.description.replace(/<[^>]+>/g, "").slice(0, 100) +
                    "..."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
