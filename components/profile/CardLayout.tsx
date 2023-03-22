import { useRouter } from 'next/router';
import React from 'react';

interface CardLayoutProps {
  title: string;
  buttonName?: string;
  buttonLink?: string;
  children: React.ReactChild;
}
const CardLayout = (props: CardLayoutProps) => {
  const { title, buttonName, buttonLink, children } = props;
  const router = useRouter();
  const username = router.query.id;
  return (
    <div className="sticky mb-[15px] rounded-xl border bg-secondary p-4 text-secondary shadow-xl ">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
        {buttonName && (
          <span
            className="cursor-pointer rounded-md p-2 text-sm text-main hover:bg-gray-100"
            onClick={() => router.push(`/${username}/${buttonLink}`)}
          >
            {buttonName}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default CardLayout;
