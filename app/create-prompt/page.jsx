"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompte = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmit, setIsSubmit] = useState(false);
  const [post, setPost] = useState({
    promt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      isSubmit={isSubmit}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompte;
