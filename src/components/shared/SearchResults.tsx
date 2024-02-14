/* eslint-disable @typescript-eslint/no-explicit-any */

import Loader from "./Loader";
import GridPostList from "./GridPostList";
import { SearchResultProps } from "@/_root/pages/Explore";

export type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full text-[20px]">No results found</p>
    );
  }
};
export default SearchResults;
