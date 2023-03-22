import React, { useEffect, useState } from 'react';

import { SearchIcon } from '@heroicons/react/outline';
import router from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import { getFriendsListAPI } from '@/axios/friendRequest';

import LoaderSpinner from '@/components/global/loader/LoaderSpinner';
import ProfilePic from '@/components/global/ProfilePic';
import { toggleCreateRoomOpen } from '@/redux/slices/globalSlice';

const InviteRoom = ({ roomCode }) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const [friendList, setFriendList] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const getFriendList = async () => {
    setLoading(true);
    try {
      const { data } = await getFriendsListAPI();
      setFriendList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = () => {
    dispatch(toggleCreateRoomOpen());
    router.push(`/groupcall/${roomCode}`);
  };
  useEffect(() => {
    getFriendList();
  }, []);
  return (
    <div>
      <div className=" max-h-[60vh] space-y-2 overflow-y-auto">
        <div className="flex flex-col items-center justify-center">
          <ProfilePic
            width={100}
            height={100}
            username={userInfo.username}
            profileImage={userInfo.profileImage}
            gender={userInfo.gender}
          />
          <h2 className="mt-2 text-lg font-semibold sm:text-xl">Daniel's room</h2>
          <div className="sm:text-md cursor-pointer truncate rounded-full bg-button  p-1 px-5 text-xs">
            {roomCode}
          </div>
        </div>
        <div className=" sm:text-md rounded-full p-1 text-sm">只有獲得邀請的朋友能免申請加入。</div>
      </div>
      <hr className="my-2" />
      <div className="space-y-2">
        <h2 className="text-lg font-semibold sm:text-xl">Send Invitations</h2>
        <p className="sm:text-md text-sm">獲得邀請的朋友會看到你的包廂，並收到可加入包廂的連結。</p>
        <div className="flex items-center rounded-lg bg-button p-2 text-secondary">
          <SearchIcon className="mr-2 h-6" />
          <input className="outline-none w-full bg-button" type="text" placeholder="Search" />
        </div>
      </div>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        friendList && (
          <div className="h-auto max-h-[40vh] overflow-y-auto">
            {friendList.map(({ user }) => (
              <div className="mt-2 flex items-center justify-between" key={user._id}>
                <div className=" flex items-center p-2">
                  <ProfilePic
                    width={40}
                    height={40}
                    username={userInfo.username}
                    profileImage={userInfo.profileImage}
                    gender={userInfo.gender}
                  />
                  <span className="sm:text-md ml-[10px] text-sm">{user.name}</span>
                </div>
                <button className="sm:text-md rounded-lg bg-main p-2 text-sm text-white">
                  Send
                </button>
              </div>
            ))}
          </div>
        )
      )}
      <button
        onClick={() => handleJoinRoom()}
        className="mt-2 mb-32 w-full rounded-lg bg-main p-2 text-white sm:mb-0"
      >
        Join Room
      </button>
    </div>
  );
};

export default InviteRoom;
