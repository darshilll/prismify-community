import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/Icons/add-post.svg"
            width={25}
            height={25}
            alt="add"
          />
          <h2 className="xl:text-left xl:text-[20px] md:h2-bold text-left w-full">
            Create post
          </h2>
        </div>

        <PostForm action="Create"/>
      </div>
    </div>
  );
};
export default CreatePost;
