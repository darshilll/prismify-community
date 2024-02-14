import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useGetPostById } from "@/lib/react-query/queriesAndMutation";
import {useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const navigate = useNavigate();

  if (isPending)
    return (
      <div className="w-full h-full mt-20">
        <Loader />
      </div>
    );
  return (
    
    <div className="flex flex-1">
      <div className="common-container">
      <div className="hidden md:flex max-w-5xl w-full -mt-5 -ml-5">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost"
        >
          <img
            src={"/assets/Icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="text-[20px] -ml-2">Back</p>
        </Button>
      </div>
        <div className="max-w-5xl flex-start gap-3 justify-start w-full -mt-5">
          <img
            src="/assets/Icons/add-post.svg"
            width={25}
            height={25}
            alt="add"
          />
          <h2 className="xl:text-left xl:text-[20px] md:h2-bold text-left w-full">
            Edit info
          </h2>
        </div>

        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};
export default EditPost;
