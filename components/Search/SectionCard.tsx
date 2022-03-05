import React from 'react';

interface SectionCardProps {
  children: React.ReactChild;
  title: string;
}

const SectionCard = ({ children, title }: SectionCardProps) => {
  return (
    <div className="rounded-lg border p-3 bg-secondary text-secondary">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}
    </div>
  );
};

export default SectionCard;
