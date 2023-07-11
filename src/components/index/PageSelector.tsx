import React from 'react';

interface Props {
  selectedPage: number;
  handleSelectedPage: (page: number) => void;
  numberOfPages: number;
}
export default function PageSelector({
  selectedPage,
  handleSelectedPage,
  numberOfPages,
}: Props) {
  const [actualSelectedPage, setActualSelectedPage] =
    React.useState(selectedPage);

  const goToNextPage = () => {
    if (actualSelectedPage === numberOfPages) return;
    handleSelectedPage(actualSelectedPage + 1);
    setActualSelectedPage(actualSelectedPage + 1);
  };

  const goToPreviousPage = () => {
    if (actualSelectedPage === 1) return;
    handleSelectedPage(actualSelectedPage - 1);
    setActualSelectedPage(actualSelectedPage - 1);
  };

  const goToFirstPage = () => {
    if (actualSelectedPage === 1) return;
    handleSelectedPage(1);
    setActualSelectedPage(1);
  };

  const goToLastPage = () => {
    if (actualSelectedPage === numberOfPages) return;
    handleSelectedPage(numberOfPages);
    setActualSelectedPage(numberOfPages);
  };

  const elementStyle = (active: boolean) =>
    `p-2 cursor-pointer border-[1px] border-solid rounded-md flex items-center justify-center ${
      active ? 'border-[#FE9705]' : 'border-[#D7D7F7]'
    } `;

  const fillStyle = (active: boolean) => `${active ? '#FE9705' : '#D7D7F7'}`;

  return (
    <div className='flex gap-x-3'>
      <div
        className={elementStyle(actualSelectedPage !== 1)}
        onClick={goToFirstPage}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='21'
          height='21'
          viewBox='0 0 21 21'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M13.0514 6.43597L11.8854 5.2699L6.92334 10.2319L11.8854 15.1939L13.0514 14.0279L9.26376 10.2319L13.0514 6.43597Z'
            fill={fillStyle(actualSelectedPage !== 1)}
          />
        </svg>
      </div>
      <div
        className={elementStyle(actualSelectedPage !== 1)}
        onClick={goToPreviousPage}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='21'
          height='21'
          viewBox='0 0 21 21'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M13.4411 6.43597L12.275 5.2699L7.31299 10.2319L12.275 15.1939L13.4411 14.0279L9.65341 10.2319L13.4411 6.43597Z'
            fill={fillStyle(actualSelectedPage !== 1)}
          />
        </svg>
      </div>
      <div className={`${elementStyle(true)} bg-[#FDF9F7] px-4 text-[#FE9705]`}>
        {`${actualSelectedPage} of ${numberOfPages}`}
      </div>
      <div
        className={elementStyle(actualSelectedPage !== numberOfPages)}
        onClick={goToNextPage}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='21'
          height='21'
          viewBox='0 0 21 21'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M7.65071 6.43597L8.81678 5.2699L13.7788 10.2319L8.81678 15.1939L7.65071 14.0279L11.4384 10.2319L7.65071 6.43597Z'
            fill={fillStyle(actualSelectedPage !== numberOfPages)}
          />
        </svg>
      </div>
      <div
        className={elementStyle(actualSelectedPage !== numberOfPages)}
        onClick={goToLastPage}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='21'
          height='21'
          viewBox='0 0 21 21'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M7.42561 6.43597L8.59169 5.2699L13.5537 10.2319L8.59169 15.1939L7.42561 14.0279L11.2133 10.2319L7.42561 6.43597Z'
            fill={fillStyle(actualSelectedPage !== numberOfPages)}
          />
        </svg>
      </div>
    </div>
  );
}
