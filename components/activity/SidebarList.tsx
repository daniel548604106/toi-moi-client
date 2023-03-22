import React from 'react';

import SidebarListItem from './SidebarListItem';

const SidebarList = () => {
  return (
    <div className="p-2">
      <div>
        <h2>Activity</h2>
        <SidebarListItem title="Feed Management" />
        <SidebarListItem title="Saved" />
        <SidebarListItem title="Trash Can" />
        <SidebarListItem title="Trash Can" />
      </div>
      <hr className="my-2" />
      <div>
        <h2>Filter</h2>
        <SidebarListItem title="Date" />
      </div>
      <div>
        <h2>Activity Type</h2>
        <SidebarListItem title="Date" />
      </div>
    </div>
  );
};

export default SidebarList;
