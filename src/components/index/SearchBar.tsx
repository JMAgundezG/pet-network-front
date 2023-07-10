import * as React from 'react';

interface Props {
  textByDefault?: string;
  onChange?: (text: string) => void;
}

export default function SearchBar({ textByDefault, onChange }: Props) {
  const initialText = textByDefault || '';
  const [text, setText] = React.useState(initialText);
  const handleChange = (text: string) => {
    setText(text);
    onChange && onChange(text);
  };

  return (
    <div className='rounded-lg border-[1px] border-solid border-[#D7D7D7] shadow-md'>
      <div className='flex rounded-lg px-[10px]'>
        <div className='flex items-center justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6 text-gray-600'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </div>
        <input
          type='text'
          className='w-full rounded border-0 py-[9px] pl-[10px] ring-0 focus:outline-none focus:ring-0'
          placeholder='Search by name'
          value={text}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
}
