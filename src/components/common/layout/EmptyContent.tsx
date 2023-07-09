import Empty from '~/svg/Empty.svg';
interface Props {
  text: string;
}

export default function EmptyContent({ text }: Props) {
  return (
    <div className='grid-rows grid h-full w-full place-items-center justify-center'>
      <Empty width={100} height={100} />
      <p>{text}</p>
    </div>
  );
}
