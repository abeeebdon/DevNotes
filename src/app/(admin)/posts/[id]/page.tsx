"use client";
import { samplePosts } from "@/src/components/constants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  title: string;
  slug: string;
  date: string;
  description: string;
  category: string;
  content: string;
  likes: number;
  comments: number;
}

const page = () => {
  const [post, setPost] = useState({} as Post);
  const { id } = useParams();
  useEffect(() => {
    const postData = samplePosts.find((pos) => pos.slug === id);
    if (postData) {
      setPost(postData);
    }
  });
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <div className="text-sm text-gray-600">
          <span>{new Date(post.date).toLocaleDateString()}</span> ·{" "}
          <span className="bg-gray-100 px-2 py-1 rounded text-blue-700 font-medium">
            {post.category}
          </span>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="flex gap-4 mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Edit
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Delete
        </button>
      </div>

      {/* Content */}
      <div className="prose max-w-none mb-10 text-gray-800">
        <p>{post.description}</p>
        <hr className="my-4" />
        <p>{post.content}</p>
      </div>

      {/* Stats */}
      <div className="flex gap-6 text-sm text-gray-600">
        <span>👍 {post.likes} Likes</span>
        <span>💬 {post.comments} Comments</span>
      </div>
    </div>
  );
};

export default page;
