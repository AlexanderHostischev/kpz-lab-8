import { createFileRoute } from "@tanstack/react-router";
import NewPost from "../../pages/NewPost";

export const Route = createFileRoute('/posts/new')({
  component: NewPost,
});
