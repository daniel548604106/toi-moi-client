import React from 'react';

const SettingsPopup = () => {
  return (
    <div className="w-[300px] space-y-2 rounded-lg bg-secondary p-3 shadow-lg">
      <h2 className="text-md font-semibold sm:text-lg">Messenger Settings</h2>
      <p className="sm:text-md text-sm ">自訂 Messenger 體驗。</p>
      <hr />
      <div className="flex items-center justify-between space-x-2">
        <div>
          <span>Message Popup</span>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <div>
          <span>Notification Sound</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
