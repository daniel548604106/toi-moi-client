import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import ProfileCover from '@/components/profile/ProfileCover';
import TabsList from '@/components/profile/TabsList';

const Index = ({ data }) => {
  const router = useRouter();
  const [profile, setProfile] = useState(data.profile);
  const [user, setUser] = useState(data.profile.user);

  return (
    <div>
      <ProfileCover profile={profile} user={user} />
      <div className="sticky top-[60px] border-b bg-secondary text-secondary">
        <div className="mx-auto max-w-7xl ">
          <TabsList friend_status={''} friends_total={0} user={{ name: '' }} />
        </div>
      </div>
    </div>
  );
};

export default Index;

// export async function getServerSideProps({ req, params, res }) {
//   try {
//     const username = params.id;
//     const token = req.cookies.token;
//     const res = await axios.get(`${process.env.API_BASE_URL}/api/profile/${username}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return {
//       props: {
//         data: res.data,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         error: 'Error',
//       },
//     };
//   }
// }
