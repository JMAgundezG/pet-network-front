import { NextPage } from 'next';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CommentsAPI } from '@/lib/api/comments';
import { FriendAPI } from '@/lib/api/friend';
import { PetAPI } from '@/lib/api/pet';
import { UserAPI } from '@/lib/api/user';
import { ListedUser } from '@/lib/models/ListedUser';
import { Pet } from '@/lib/models/Pet';
import { UserData } from '@/lib/models/UserData';

import CommentList from '@/components/layout/CommentList';
import EmptyContent from '@/components/layout/EmptyContent';
import FriendList from '@/components/layout/FriendList';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import PetList from '@/components/layout/PetList';
import ProfileHeader from '@/components/layout/ProfileHeader';

interface Props {
  user: UserData;
  friends: ListedUser[];
  comments: [];
  pets: Pet[];
}

const emptyUser: UserData = {
  id: -1,
  name: '',
  image: '',
  description: '',
};

const ProfilePage: NextPage<Props> = (props) => {
  enum Tab {
    Friends,
    Comments,
    Pets,
  }
  const user = props.user;
  const [friends, setFriends] = useState<ListedUser[]>(props.friends || []);
  const [comments, setComments] = useState(props.comments || []);
  const [pets, setPets] = useState(props.pets || []);
  const [tab, setTab] = useState(Tab.Friends);

  const getFriends = useCallback(async () => {
    const friends = (await FriendAPI.getFriends(user.id)).data;
    setFriends(friends);
  }, [user.id]);

  const getComments = useCallback(async () => {
    const comments = (await CommentsAPI.getComments(user.id)).data;
    setComments(comments);
  }, [user.id]);

  const getPets = useCallback(async () => {
    const pets = (await PetAPI.getPets(user.id)).data;
    setPets(pets);
  }, [user.id]);

  useEffect(() => {
    getFriends();
    getComments();
    getPets();
  }, [getFriends, getComments, getPets]);

  const handleTabClick = useCallback(
    (selectedTab: Tab) => {
      setTab(selectedTab);
      switch (selectedTab) {
        case Tab.Friends:
          getFriends();
          break;
        case Tab.Comments:
          getComments();
          break;
        case Tab.Pets:
          getPets();
          break;
      }
    },
    [Tab.Comments, Tab.Friends, Tab.Pets, getComments, getFriends, getPets]
  );

  const handleTabClassName = useCallback(
    (selectedTab: Tab) => {
      const isTabActive = (selectedTab: Tab) => {
        return tab === selectedTab ? 'text-orange-500' : 'text-gray-500';
      };
      return (
        'cursor-pointer text-center text-[16px] font-semibold px-[16px] py-[8px] ' +
        isTabActive(selectedTab)
      );
    },
    [tab]
  );

  const content = useMemo(() => {
    switch (tab) {
      case Tab.Friends:
        return (
          <div className='align-items-center grid-cols grid grid-cols-1 text-gray-900 md:grid-cols-4'>
            <div className='md:col-span-2 md:col-start-2'>
              {friends.length ? (
                <FriendList friends={friends} />
              ) : (
                <EmptyContent text='No friends yet' />
              )}
            </div>
          </div>
        );
      case Tab.Comments:
        return (
          <div className='px-[32px]'>
            {comments.length ? (
              <CommentList comments={comments || []} />
            ) : (
              <EmptyContent text='No comments yet' />
            )}
          </div>
        );
      case Tab.Pets:
        return (
          <div className='align-items-center grid-cols grid grid-cols-1 text-gray-900 md:grid-cols-4'>
            <div className='md:col-span-2 md:col-start-2'>
              {pets.length ? (
                <PetList pets={pets} />
              ) : (
                <EmptyContent text='No pets yet' />
              )}
            </div>
          </div>
        );
    }
  }, [Tab.Comments, Tab.Friends, Tab.Pets, comments, friends, pets, tab]);

  const profileContent = useMemo(() => {
    return (
      <div className='grid-rows grid'>
        <div className='grid-cols grid sm:grid-cols-1 md:grid-cols-4'>
          <div className='md:col-span-2 md:col-start-2'>
            <div className='justify-content-center flex flex-row justify-around md:justify-between'>
              <p
                className={handleTabClassName(Tab.Friends)}
                onClick={() => handleTabClick(Tab.Friends)}
              >
                Friends
              </p>
              <p
                className={handleTabClassName(Tab.Comments)}
                onClick={() => handleTabClick(Tab.Comments)}
              >
                Comments
              </p>
              <p
                className={handleTabClassName(Tab.Pets)}
                onClick={() => handleTabClick(Tab.Pets)}
              >
                Pets
              </p>
            </div>
          </div>
        </div>
        <div className='pb-[28px]'>{content}</div>
      </div>
    );
  }, [
    Tab.Comments,
    Tab.Friends,
    Tab.Pets,
    content,
    handleTabClassName,
    handleTabClick,
  ]);

  return (
    <Layout>
      <Header />
      <ProfileHeader name={user.name} image={user.image} />

      <div className='align-items-center grid-cols grid grid-cols-1 justify-items-center text-gray-900 md:grid-cols-4'>
        <div className='p-4 md:col-span-2 md:col-start-2'>
          <p className='text-semibold text-justify text-[16px]'>
            {user.description}
          </p>
        </div>
      </div>
      {profileContent}
    </Layout>
  );
};

export async function getStaticPaths() {
  const ids = await (await UserAPI.getAllUserIds()).data;
  const paths = ids.map((id: string) => {
    return {
      params: {
        pid: id,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params: { pid },
}: {
  params: { pid: string };
}) {
  const user = (await UserAPI.getUserData(parseInt(pid))).data;
  if (!user) {
    return { props: { user: emptyUser, pets: [], comments: [], friends: [] } };
  }
  const friends = (await FriendAPI.getFriends(parseInt(pid))).data;

  // const pets = (await PetAPI.getPets(parseInt(pid))).data;

  const comments = (await CommentsAPI.getComments(parseInt(pid))).data;
  console.log('props', user, friends, comments);
  return {
    props: {
      user: user as UserData,
      friends: friends as ListedUser[],
      // pets: pets as Pet[],
      comments: comments as Comment[],
    },
  };
}

export default ProfilePage;
