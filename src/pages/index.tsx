import * as React from 'react';

import { UserAPI } from '@/lib/api/user';
import { getFromLocalStorage, setInLocalStorage } from '@/lib/helper';
import { ListedUser } from '@/lib/models/ListedUser';

import EmptyContent from '@/components/common/layout/EmptyContent';
import Header from '@/components/common/layout/Header';
import Layout from '@/components/common/layout/Layout';
import Loading from '@/components/common/layout/Loading';
import SearchBar from '@/components/index/SearchBar';
import UserList from '@/components/index/UserList';
import Seo from '@/components/Seo';

interface Props {
  users: ListedUser[];
  numberOfPages: number;
  currentPage: number;
}

export default function HomePage(props: Props) {
  const [search, setSearch] = React.useState(
    getFromLocalStorage('previousSearch') || ''
  );
  const [orderByName, setOrderByName] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [users, setUsers] = React.useState<ListedUser[]>(props.users);

  const pageFromLocalStorage = getFromLocalStorage('lastSelectedPage');
  const lastSelectedPage =
    pageFromLocalStorage !== null ? parseInt(pageFromLocalStorage) : null;

  const [selectedPage, setSelectedPage] = React.useState(
    lastSelectedPage || props.currentPage
  );
  const [numberOfPages, setNumberOfPages] = React.useState(props.numberOfPages);

  const getNewUsers = React.useCallback(
    async (text: string, orderByName: boolean, page?: number) => {
      setIsLoading(true);
      UserAPI.getUsersByName(text, orderByName, page)
        .then((result) => {
          setIsLoading(false);
          setUsers(result.data.users);
          setSelectedPage(result.data.currentPage);
          setInLocalStorage(
            'lastSelectedPage',
            result.data.currentPage.toString()
          );
          setNumberOfPages(result.data.numberOfPages);
        })
        .catch(() => {
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
      setInLocalStorage('previousSearch', text);
    },
    [getNewUsers, orderByName]
  );

  const handleSelectedPage = React.useCallback((page: number) => {
    setSelectedPage(page);
    setInLocalStorage('lastSelectedPage', page.toString());
    getNewUsers(search, orderByName, page);
  }, []);

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
            className={`flex items-center rounded-full px-[16px] py-[12px] ${
              orderByName ? 'bg-[#FDF9F7] text-orange-500' : ''
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
          <Loading />
        ) : (
          <div className='px-[24px]'>
            {users.length ? (
              <div>
                <UserList
                  onDelete={(id: number): void => handleDelete(id)}
                  users={users}
                  handleSelectedPage={handleSelectedPage}
                  numberOfPages={numberOfPages}
                  selectedPage={selectedPage}
                />
              </div>
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
  let data: Props = { users: [], numberOfPages: 1, currentPage: 1 };

  await UserAPI.getUsersByName('', false).then(
    (response) => (data = response.data)
  );

  return {
    props: data,
  };
}
