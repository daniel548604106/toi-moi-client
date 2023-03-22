import React from 'react';

import Link from 'next/link';

const Error = () => {
  return (
    <div>
      Not found 404
      <Link href="/">Go back to Home</Link>
    </div>
  );
};

export default Error;
