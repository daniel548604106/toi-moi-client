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
  <div className="fixed z-50 inset-0 bg-gray-700 bg-opacity-30 flex items-center justify-center">
    <div className=" flex-1 text-gray-600 text-center">
      <PostSkeletonLoader />
      <span className="bg-white py-2 px-4 text-xs rounded-full">載入中...</span>
    </div>
  </div>
);

export default GlobalLoader;
