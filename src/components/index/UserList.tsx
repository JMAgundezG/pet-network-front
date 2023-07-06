import { useRouter } from 'next/router';

import { ListedUser } from '@/lib/models/ListedUser';

import ImageBadge from '@/components/layout/ImageBadge';

import Delete from '~/svg/Delete.svg';

interface Props {
  users: ListedUser[];
  onDelete: (id: number) => void;
}

export default function UserList({ users, onDelete }: Props) {
  const { push } = useRouter();

  const handleClick = (id: number) => {
    push(`/profile/${id}`);
  };

  return (
    <div>
      <div className='grid-rows grid w-full'>
        {users.map((user, index) => (
          <div
            className='flex-rows flex justify-between px-[0px] py-[16px]'
            key={'user-' + index}
          >
            <ImageBadge
              text={user.name}
              image={user.image}
              height={24}
              onClick={() => handleClick(user.id)}
            />
            <div
              onClick={() => onDelete(user.id)}
              className='flex items-center justify-center'
            >
              <Delete />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
