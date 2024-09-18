import React from "react";
import "ldrs/ring";
import { ring2 } from "ldrs";

export interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  ring2.register();
  return (
    <>
      {isLoading ? (
        <div className="absolute flex left-0 top-0 bottom-0 z-10 right-0 bg-[rgba(133,133,133,0.7)] justify-center items-center">
          <l-ring-2
            size="40"
            stroke="5"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8"
            color="black"
          ></l-ring-2>
        </div>
      ) : null}
    </>
  );
};

export default Loading;
