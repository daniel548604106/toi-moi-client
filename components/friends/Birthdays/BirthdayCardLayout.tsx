import React from 'react';

interface BirthdayCardLayoutProps {
  children: React.ReactChild;
  title: string;
}


const BirthdayCardLayout = ({ children, title }: BirthdayCardLayoutProps) => {
  return (
    <div className="rounded-lg  bg-secondary p-3 text-secondary sm:p-5">
      <h2 className="text-lg font-semibold sm:text-2xl">{title}</h2>
      {children}
    </div>
  );
};

export default BirthdayCardLayout;
