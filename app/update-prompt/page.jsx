"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPromp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [isSubmit, setIsSubmit] = useState(false);
  const [post, setPost] = useState({
    promt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();

  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if(!promptId) return alert('missing prompt id')
    
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      isSubmit={isSubmit}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPromp;
