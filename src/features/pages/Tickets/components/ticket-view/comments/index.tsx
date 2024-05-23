import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { CommentT } from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { useTicket } from "../provider";
import CommentForm from "./form";
import Comment from "./comment";

const Comments = () => {
  const { user } = useAuth();
  const { ticket } = useTicket();
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3 mb-3">
        <Avatar className="">
          <AvatarImage src={undefined} alt={""} />
          <AvatarFallback className="xl">
            {user?.name.split("")[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <CommentForm />
      </div>
      <div className="grid gap-2 p-4">
        {ticket?.comments.map((comment: CommentT) => (
          <div key={comment.id} className="grid gap-2">
            <Comment comment={comment} />
            <Separator className="w-11/12 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
