"use client";

import Loader from "~~/components/shared/Loader";

const loading = () => {
  return (
    <div className="isfetching-flex">
      <Loader />
    </div>
  );
};

export default loading;
