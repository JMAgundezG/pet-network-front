import * as React from 'react';

import { UserAPI } from '@/lib/api/user';
import { ListedUser } from '@/lib/models/ListedUser';
import { UserData } from '@/lib/models/UserData';

import SearchBar from '@/components/index/SearchBar';
import UserList from '@/components/index/UserList';
import EmptyContent from '@/components/layout/EmptyContent';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

interface Props {
  users: ListedUser[];
}

export default function HomePage(props: Props) {
  const [search, setSearch] = React.useState('');
  const [orderByName, setOrderByName] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [users, setUsers] = React.useState<ListedUser[]>(props.users);
  const getNewUsers = React.useCallback(
    async (text: string, orderByName: boolean) => {
      setIsLoading(true);
      UserAPI.getUsersByName(text, orderByName).then((result) => {
        setIsLoading(false);
        setUsers(result.data);
      }).catch(() => {
        setIsLoading(false);
        setUsers([]);
      });
    },
    []
  );

  const handleSearch = React.useCallback(
    async (text: string) => {
      getNewUsers(text, orderByName);
      setSearch(text);
    },
    [getNewUsers, orderByName]
  );

  const handleDelete = React.useCallback(
    (id: number): void => {
      UserAPI.deleteUser(id).then(() => {
        getNewUsers(search, orderByName);
      });
    },
    [getNewUsers, orderByName, search]
  );

  const handleOrderByName = React.useCallback(() => {
    getNewUsers(search, !orderByName);
    setOrderByName(!orderByName);
  }, [getNewUsers, search, orderByName]);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Header></Header>
      <Seo />

      <main>
        <div className='justify-content-center flex justify-between px-[24px]'>
          <div className='max-w-[596px] grow'>
            <SearchBar onChange={handleSearch} textByDefault={search} />
          </div>
          <div
            className={`flex items-center ${
              orderByName ? 'text-orange-500' : ''
            }`}
          >
            <p
              onClick={() => {
                handleOrderByName();
              }}
            >
              Order by name
            </p>
          </div>
        </div>

        {isLoading ? (
          <h1>LOADING</h1>
        ) : (
          <div className='px-[24px]'>
            {users.length ? (
              <UserList
                onDelete={(id: number): void => handleDelete(id)}
                users={users}
              />
            ) : (
              <div className='pt-[165px] lg:pt-[262px]'>
                <EmptyContent text='There is no users yet' />
              </div>
            )}
          </div>
        )}
      </main>
    </Layout>
  );
}
export async function getServerSideProps() {
  let users: UserData[] = []
  await UserAPI.getUsersByName('', false).then((response) => users = response.data).catch(() => users = []);
  return {
    props: {
      users: users,
    },
  };
}
