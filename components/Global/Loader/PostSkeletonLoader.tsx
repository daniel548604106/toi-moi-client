import React from 'react';

const PostSkeletonLoader = () => {
  return (
    <div className="timeline-wrapper">
      <div className="timeline-item">
        <div className="animated-background facebook">
          <div className="background-masker header-top"></div>
          <div className="background-masker header-left"></div>
          <div className="background-masker header-right"></div>
          <div className="background-masker header-bottom"></div>
          <div className="background-masker subheader-left"></div>
          <div className="background-masker subheader-right"></div>
          <div className="background-masker subheader-bottom"></div>
          <div className="background-masker content-top"></div>
          <div className="background-masker content-first-end"></div>
          <div className="background-masker content-second-line"></div>
          <div className="background-masker content-second-end"></div>
          <div className="background-masker content-third-line"></div>
          <div className="background-masker content-third-end"></div>
        </div>
      </div>
    </div>
  );
};

const GlobalLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-30">
    <div className=" flex-1 text-center text-gray-600">
      <PostSkeletonLoader />
      <span className="rounded-full bg-white py-2 px-4 text-xs">載入中...</span>
    </div>
  </div>
);

export default GlobalLoader;
