import { Comment } from '@/lib/models/Comment';

interface Props {
  comment: Comment;
}

export default function CommentItem({ comment }: Props) {
  return (
    <div className='grid-rows grid p-[16px]'>
      <div className='align-content-center flex items-center pb-[16px] text-[14px] text-gray-400'>
        <p>{comment.text}</p>
      </div>
      <div className='align-content-center items-center'>{comment.title}</div>
    </div>
  );
}
