import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import RequestCard from '@/Components/Friends/Requests/RequestCard';
import Sidebar from '@/Components/Friends/Sidebar';
import LoaderSpinner from '@/Components/Global/LoaderSpinner';

const FriendCard = dynamic(() => import('@/Components/Friends/FriendCard'), {
  loading: () => <LoaderSpinner />,
});

const Index = ({ recommendations, requestsReceived }) => {
  const { t } = useTranslation('header');
  const [currentRecommendations, setCurrentRecommendations] = useState(recommendations);
  const [requests, setRequests] = useState(requestsReceived);

  const removeRecommendation = (id: string) => {
    let update = currentRecommendations.filter((recommendation) => recommendation._id !== id);
    setCurrentRecommendations(update);
  };

  return (
    <div className="flex flex-col  lg:flex-row">
      <div className="">
        <Sidebar />
      </div>
      <div className="lg:ml-[350px] flex-1 p-3 space-y-3">
        {requests.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold sm:text-2xl">Requests Received</h2>
            {requests.map(({ user }) => (
              <RequestCard key={user._id} t={t} user={user} />
            ))}
          </div>
        )}
        <h2 className="text-lg font-semibold sm:text-2xl">Friend Recommendation</h2>
        <div className="transition-all grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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

export default Index;

export async function getServerSideProps({ req }) {
  try {
    const token = req.cookies.token;
    const res = await axios.get(`${process.env.API_BASE_URL}/api/friends/recommendations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const received = await axios.get(`${process.env.API_BASE_URL}/api/friends/received`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      props: {
        recommendations: res.data,
        requestsReceived: received.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
