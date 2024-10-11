import React from "react";
import Skeleton from "react-loading-skeleton";

export default function () {
  return (
    <div>
      <Skeleton height={180 + "px"} />
      <Skeleton height={30 + "px"} />
      <Skeleton height={20 + "px"} />
      <Skeleton height={20 + "px"} />
    </div>
  );
}
