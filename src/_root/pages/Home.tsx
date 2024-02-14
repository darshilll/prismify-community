/* eslint-disable @typescript-eslint/no-unused-vars */
import Loader from "@/components/shared/Loader";
import PopularCard from "@/components/shared/PopularCard";
import PostCard from "@/components/shared/PostCard";
import {
  useGetRecentPosts,
  useGetUsers,
} from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    // isError: isErrorPosts,
  } = useGetRecentPosts();

  const {
    data: creators,
    // isError: isErrorCreators,
  } = useGetUsers(10);

  return (
    <div className="flex items-center flex-1 flex-col justify-around p-3">
      {isPostLoading && !posts ? (
        <div className="w-full h-full mt-20">
          <Loader />
        </div>
      ) : (
        <div className="home-container">
          <div className="home-posts">
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((posts: Models.Document) => (
                <PostCard post={posts} key={posts.caption} />
              ))}
            </ul>
          </div>
          <div className="home-creators">
            <h3 className="h3-bold text-light-1"></h3>
            <>
              <h3>Top Creators</h3>
              <div className="">
                <ul>
                  {creators?.documents.map((creator) => (
                    <li key={creator?.$id} className="">
                      <PopularCard user={creator} />
                    </li>
                  ))}
                </ul>
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
