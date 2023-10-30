"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("are you sure you want to delete");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);
        setPosts(filteredPosts)

      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    session?.user.id && fetchPosts();
  }, []);

  return (
    <Profile
      name="my x "
      desc="welcome to your profile page"
      posts={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
