import React from 'react';

interface BirthdayCardLayoutProps {
  children: React.ReactChild;
  title: string;
}
const BirthdayCardLayout = ({ children, title }: BirthdayCardLayoutProps) => {
  return (
    <div className="bg-secondary  p-3 sm:p-5 rounded-lg text-secondary">
      <h2 className="text-lg sm:text-2xl font-semibold">{title}</h2>
      {children}
    </div>
  );
};

export default BirthdayCardLayout;
