import React, { useEffect, useMemo, useRef, useState } from 'react';

import { SearchIcon } from '@heroicons/react/outline';
import { DotsHorizontalIcon, VideoCameraIcon } from '@heroicons/react/solid';
import useTranslation from 'next-translate/useTranslation';

import useClickOutside from '@/Hooks/useClickOutside';
import { User } from '@/Interfaces/I_socket';

import Contact from './Contact';
import SearchBox from './SearchBox';
import SettingsPopup from './SettingsPopup';

interface ContactsProps {
  friends: any;
  connectedUsers: User[];
}

const Contacts = ({ friends, connectedUsers }: ContactsProps) => {
  const { t } = useTranslation('common');
  const popupRef = useRef();
  useClickOutside(popupRef, () => setPopupOpen(false));

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const sortedContacts = useMemo(() => {
    return friends?.sort((a, b) => {
      return connectedUsers.map((users) => users.userId).includes(a.user._id) ? -1 : 1;
    });
  }, [connectedUsers]);

  return (
    <div className=" p-2 sticky top-[80px] ">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <h2>{t('contact.contact')}</h2>
        <div className="flex items-center space-x-2">
          <SearchIcon
            onClick={() => setSearchOpen(!isSearchOpen)}
            className="h-6  cursor-pointer"
          />
          <VideoCameraIcon className="h-6 cursor-pointer" />

          <div ref={popupRef} className="relative">
            <DotsHorizontalIcon
              onClick={() => setPopupOpen(!isPopupOpen)}
              className="h-6 cursor-pointer"
            />
            {isPopupOpen && (
              <div className="right-0 top-0 transform  z-50 translate-y-5  absolute">
                <SettingsPopup />
              </div>
            )}
          </div>
        </div>
      </div>
      {isSearchOpen && <SearchBox setSearchOpen={setSearchOpen} />}
      {friends?.length &&
        friends.map(({ user }) => (
          <Contact connectedUsers={connectedUsers} key={user._id} user={user} />
        ))}
    </div>
  );
};

export default Contacts;
