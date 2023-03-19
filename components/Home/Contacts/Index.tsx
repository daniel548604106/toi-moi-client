import React, { useEffect, useMemo, useRef, useState } from 'react';

import { SearchIcon } from '@heroicons/react/outline';
import { DotsHorizontalIcon, VideoCameraIcon } from '@heroicons/react/solid';
import useTranslation from 'next-translate/useTranslation';

import useClickOutside from '@/hooks/useClickOutside';
import { User } from '@/interfaces/I_socket';

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
    <div className=" sticky top-[80px] p-2 ">
      <div className="mb-5 flex items-center justify-between text-gray-500">
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
              <div className="absolute right-0 top-0  z-50 translate-y-5  transform">
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
