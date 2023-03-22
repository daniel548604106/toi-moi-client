import { motion } from 'framer-motion';
import React from 'react';

import { CheckIcon } from '@heroicons/react/outline';

interface NotificationProps {
  notification: string;
}

const Notification = ({ notification }: NotificationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 300 }}
      className={`fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 transform items-center space-x-2 rounded-lg bg-main p-2 text-white`}
    >
      <CheckIcon className="h-5" />
      <span>{notification}</span>
    </motion.div>
  );
};

export default Notification;
