import { useRouter } from 'next/router';

import { ListedUser } from '@/lib/models/ListedUser';

import ImageBadge from '@/components/common/layout/ImageBadge';
import PageSelector from '@/components/index/PageSelector';

import Delete from '~/svg/Delete.svg';

interface Props {
  users: ListedUser[];
  onDelete: (id: number) => void;
  handleSelectedPage: (page: number) => void;
  numberOfPages: number;
  selectedPage: number;
}

export default function UserList({
  users,
  onDelete,
  handleSelectedPage,
  numberOfPages,
  selectedPage,
}: Props) {
  const { push } = useRouter();

  const handleClick = (id: number) => {
    push(`/profile/${id}`);
  };

  return (
    <div>
      <div className='grid-rows grid w-full  py-[19px]'>
        {users.map((user, index) => (
          <div
            className={`flex-rows flex justify-between py-[16px] pr-[32px] text-gray-500 ${
              index % 2 === 0 ? 'bg-[#FDF9F7]' : 'bg-white'
            }`}
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
              <Delete
                onClick={() => {
                  onDelete(user.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        <PageSelector
          selectedPage={selectedPage}
          handleSelectedPage={handleSelectedPage}
          numberOfPages={numberOfPages}
        />
      </div>
    </div>
  );
}
