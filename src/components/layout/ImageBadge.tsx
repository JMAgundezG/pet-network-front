import Image from 'next/image';
import React from 'react';

interface Props {
  text: string;
  image?: string;
  height?: number;
  onClick?: () => void;
}

export default function ImageBadge({ text, image, height, onClick }: Props) {
  const sizeHeight = height ?? 40; //`h-[${height}px]` : 'h-[40px]';
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const imagePlaceholder = React.useMemo(() => {
    if (image) {
      return (
        <div>
          <Image
            className={`mr-[16px] aspect-square h-[${sizeHeight}px] rounded-full`}
            loader={() => image}
            src={image}
            alt={text}
            width={sizeHeight}
            height={sizeHeight}
            style={isImageLoaded ? {} : { visibility: 'hidden' }}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
      );
    } else {
      return <div></div>;
    }
  }, [image, text, sizeHeight, isImageLoaded]);
  return (
    <div
      className={`align-content-center flex h-[${sizeHeight}px] max-w-[105px] items-center p-[16px] hover:cursor-pointer`}
      onClick={onClick}
    >
      <div
        className={`mr-[16px] aspect-square h-[${sizeHeight}px] rounded-full bg-red-500`}
      >
        {imagePlaceholder}
      </div>
      <div>{text}</div>
    </div>
  );
}
