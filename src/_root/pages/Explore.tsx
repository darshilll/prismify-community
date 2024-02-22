/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutation";
import { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const Explore = () => {
  const { ref, inView } = useInView();

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className="w-full h-full mt-20">
        <Loader />
      </div>
    );
  }

  const showSearchResults = searchValue !== "";

  const shouldShowPosts =
    !showSearchResults &&
    posts.pages?.every((item) => item?.documents?.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        {/* <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2> */}
        <div className="flex gap-1 px-4  w-full rounded-lg bg-black">
          <img
            src="/assets/Icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search text-white"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-10 mb-3">
        <h3 className=" xl:h2-bold-size lg:text-[20px] md:h3-bold">
          Popular Today
        </h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-mdeium text-light-2">All</p>
          <img
            src="/assets/Icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {showSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) =>
            item && item.documents ? (
              <GridPostList key={`page-${index}`} posts={item.documents} />
            ) : null
          )
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};
export default Explore;
