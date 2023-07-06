import { useRouter } from 'next/router';
import * as React from 'react';

import { ListedUser } from '@/lib/models/ListedUser';

import ImageBadge from '@/components/layout/ImageBadge';

interface Props {
  friends: ListedUser[];
}

export default function FriendList({ friends }: Props) {
  const router = useRouter();
  const handleClick = (id: number) => {
    console.log(id, 'id');
    router.push(`/profile/${id}`);
  };
  return (
    <div className='grid-rows grid'>
      <div className='grid-cols grid grid-cols-1 md:grid-cols-3'>
        {friends.map((friend, index) => (
          <ImageBadge
            text={friend.name}
            image={friend.image}
            key={'friend-' + index}
            onClick={() => handleClick(friend.id)}
          />
        ))}
      </div>
    </div>
  );
}
