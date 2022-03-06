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
      className={`fixed flex items-center space-x-2 bottom-20 z-50 left-1/2 transform -translate-x-1/2 rounded-lg p-2 text-white bg-main`}
    >
      <CheckIcon className="h-5" />
      <span>{notification}</span>
    </motion.div>
  );
};

export default Notification;
