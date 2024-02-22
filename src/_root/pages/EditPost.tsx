/* eslint-disable @typescript-eslint/no-unused-vars */
import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";

import { useGetPostById } from "@/lib/react-query/queriesAndMutation";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

  if (isPending)
    return (
      <div className="w-full h-full mt-20">
        <Loader />
      </div>
    );
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="hidden md:flex max-w-5xl w-full -mt-8 -ml-5"></div>
        <div className="max-w-5xl flex-start gap-3 justify-start w-full -mt-5">
          <img
            src="/assets/Icons/add-post.svg"
            width={25}
            height={25}
            alt="add"
          />
          <h2 className="xl:h2-bold-size  md:h2-bold text-left w-full">
            Edit info
          </h2>
        </div>

        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};
export default EditPost;
