import { createFileRoute } from '@tanstack/react-router';
import { PostDetails } from '../../pages/PostDetails';

export const Route = createFileRoute('/posts/$postId')({
  component: PostDetails,
}); 