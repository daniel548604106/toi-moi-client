import React, { useState } from 'react';

import axios from 'axios';

import FriendCard from '@/components/Friends/FriendCard';
import Sidebar from '@/components/Friends/Sidebar';

const Suggestions = ({ recommendations }) => {
  const [currentRecommendations, setCurrentRecommendations] = useState(recommendations);

  const removeRecommendation = (id: string) => {
    let update = currentRecommendations.filter((recommendation) => recommendation._id !== id);
    setCurrentRecommendations(update);
  };
  return (
    <div className="flex flex-col  lg:flex-row">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 space-y-3 p-3 lg:ml-[350px]">
        <h2 className="text-lg font-semibold sm:text-2xl">Friend Recommendation</h2>
        <div className="grid grid-cols-2 gap-2 transition-all sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
          {currentRecommendations.map((recommendation) => (
            <FriendCard
              removeRecommendation={removeRecommendation}
              key={recommendation.username}
              user={recommendation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;

export async function getServerSideProps({ req }) {
  try {
    const token = req.cookies.token;
    const res = await axios.get(`${process.env.BASE_URL}/api/friends/recommendations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      props: {
        recommendations: res.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
