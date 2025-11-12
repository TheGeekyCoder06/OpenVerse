"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export function BlogPostCard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  // ✅ Load logged-in user's email
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!storedUser?.email) {
      router.push("/sign-in");
      return;
    }
    setUserEmail(storedUser.email);
    const savedPosts =
      JSON.parse(localStorage.getItem(`blogPosts_${storedUser.email}`)) || [];
    setPosts(savedPosts);
  }, [router]);

  const saveToLocalStorage = (updatedPosts) => {
    if (!userEmail) return;
    setPosts(updatedPosts);
    localStorage.setItem(
      `blogPosts_${userEmail}`,
      JSON.stringify(updatedPosts)
    );
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please fill out both title and content!");
      return;
    }

    if (editId) {
      const updatedPosts = posts.map((post) =>
        post.id === editId
          ? {
              ...post,
              title: title.trim(),
              content: content.trim(),
              date: new Date().toLocaleString(),
            }
          : post
      );
      saveToLocalStorage(updatedPosts);
      setEditId(null);
    } else {
      const newPost = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        date: new Date().toLocaleString(),
      };
      const updatedPosts = [newPost, ...posts];
      saveToLocalStorage(updatedPosts);
    }

    setTitle("");
    setContent("");
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = posts.filter((post) => post.id !== id);
      saveToLocalStorage(updatedPosts);
    }
  };

  const handleEdit = (post) => {
    setEditId(post.id);
    setTitle(post.title);
    setContent(post.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!userEmail) return null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-10">
      {/* 📝 Blog Form */}
      <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {editId ? "Edit Blog Post ✏️" : "Create a Blog Post"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {editId
              ? "Update your post and share your new thoughts."
              : "Write and publish your ideas to inspire others."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handlePublish}>
            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-gray-700 font-medium">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter your blog title"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div className="grid gap-2">
              <Label htmlFor="content" className="text-gray-700 font-medium">
                Blog Content
              </Label>
              <Textarea
                id="content"
                placeholder="Write your blog here..."
                rows={8}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full shadow-md transition-all duration-300"
              >
                {editId ? "Update Post" : "Publish Post"}
              </Button>

              {editId && (
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1 rounded-full shadow-sm transition-all duration-300"
                  onClick={() => {
                    setEditId(null);
                    setTitle("");
                    setContent("");
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 🧾 Display User's Posts */}
      {posts.length > 0 && (
        <div className="space-y-6 mt-10">
          <h3 className="text-2xl font-bold text-center text-gray-900">
            📝 Your Blog Posts
          </h3>

          {posts.map((post) => (
            <Card
              key={post.id}
              className="w-full bg-white/90 backdrop-blur-sm shadow-md border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {post.date}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {post.content}
                </p>
              </CardContent>

              <CardFooter className="flex justify-end gap-3 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full px-4 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all"
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="rounded-full px-4"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
