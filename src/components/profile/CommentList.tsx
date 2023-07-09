import * as React from 'react';

import { Comment } from '@/lib/models/Comment';

import CommentItem from './CommentItem';

interface Props {
  comments: Comment[];
}

export default function CommentList({ comments }: Props) {
  return (
    <div className='grid-rows grid'>
      {comments.map((comment, index) => (
        <CommentItem comment={comment} key={'comment-' + index} />
      ))}
    </div>
  );
}
