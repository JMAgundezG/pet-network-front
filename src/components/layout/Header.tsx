import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

// TODO change UnstyledLink content to Logo
export default function Header() {
  return (
    <header className='sticky bg-white'>
      <div className='grid h-[80px] items-center justify-items-center'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Petma
        </UnstyledLink>
      </div>
    </header>
  );
}
