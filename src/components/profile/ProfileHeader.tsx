import Image from 'next/image';
import * as React from 'react';

interface Props {
  name: string;
  image?: string; // TODO change to img type
}

export default function ProfileHeader({ name, image }: Props) {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  return (
    <div>
      <div className='profile-header-bg grid h-[159px] items-center justify-items-center'></div>
      <div className='grid items-center justify-items-center'>
        <div
          className='bg-white-500
            -mt-16 h-[100px] w-[100px] items-center justify-items-center rounded-full border-4 
        border-solid border-white shadow-md'
        >
          {image && (
            <Image
              className='mr-[16px] aspect-square rounded-full'
              loader={() => image}
              src={image}
              alt='Profile Image'
              width={101}
              height={101}
              style={isImageLoaded ? {} : { visibility: 'hidden' }}
              onLoad={() => setIsImageLoaded(true)}
            />
          )}
        </div>
      </div>
      <div className='grid items-center justify-items-center pt-4'>
        <h1 className='text-grey-900 text-center text-[24px] font-bold'>
          {name}
        </h1>
      </div>
    </div>
  );
}
