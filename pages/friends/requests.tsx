import React, { useState } from 'react';

import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

import EmptyRequest from '@/components/Friends/EmptyRequest';
import RequestCard from '@/components/Friends/Requests/RequestCard';
import Sidebar from '@/components/Friends/Sidebar';

const Requests = ({ requestsReceived }) => {
  const { t } = useTranslation('header');
  const [received, setReceived] = useState(requestsReceived);

  return (
    <div className="flex  flex-col  lg:flex-row">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1 space-y-3 p-3 lg:ml-[350px]">
        {received.length > 0 ? (
          <div className="mx-auto max-w-[600px]">
            {received.map(({ user }) => (
              <RequestCard key={user._id} t={t} user={user} />
            ))}
          </div>
        ) : (
          <div className="mt-20 sm:mt-32">
            <EmptyRequest />
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;

export async function getServerSideProps({ req }) {
  try {
    const token = req.cookies.token;
    const { data } = await axios.get(`${process.env.API_BASE_URL}/api/friends/received`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      props: {
        requestsReceived: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
