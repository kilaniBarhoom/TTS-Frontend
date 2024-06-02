import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentT } from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { useTicket } from "../provider";
import CommentForm from "./form";
import Comment from "./comment";
import Typography from "@/components/ui/typography";

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
      <div className="grid gap-2 md:p-4 p-2">
        {ticket?.comments.length ? (
          ticket?.comments.map((comment: CommentT) => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <Typography className="text-center" as={"largeText"} element="p">
            No comments yet
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Comments;
