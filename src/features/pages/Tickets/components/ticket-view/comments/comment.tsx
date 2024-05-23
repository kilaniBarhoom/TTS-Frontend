import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { CommentT } from "@/lib/types";
import { useEffect, useState } from "react";
import { useDeleteCommentMutation } from "../../../api";
import DeleteAlertDialog from "./delete-alert-dialog";
import CommentForm from "./form";

const Comment = ({ comment }: { comment: CommentT }) => {
  const [isEditingComment, setIsEditingComment] = useState(false);

  const { mutate: deleteComment } = useDeleteCommentMutation();

  useEffect(() => {
    console.log("isEditingComment", isEditingComment);
  }, [isEditingComment]);

  return isEditingComment ? (
    <CommentForm comment={comment} setIsEditingComment={setIsEditingComment} />
  ) : (
    <div className="flex gap-2">
      <Avatar className="size-8">
        <AvatarImage src={undefined} alt={""} />
        <AvatarFallback className="xl">
          {comment.member.name.split("")[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <div className="grid">
          <Typography as="largeText" element="p" className="font-bold">
            {comment.member.name}
          </Typography>
          {/* <Typography
            as="extraSmallText"
            element="p"
            className="text-muted-foreground font-light"
          >
            1 second ago
          </Typography> */}
        </div>
        <div
          className="text-secondary-foreground w-11/12 leading-5 list-disc cursor-text"
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />
        {/* <Typography as="smallText" element="p" className="leading-5 ">
          {comment.content}
        </Typography> */}
        <div className="flex gap-2 w-fit pt-2">
          <DeleteAlertDialog
            title="Delete this comment?"
            description="Are you sure you want to delete this comment?"
            action="Delete"
            onAction={() => deleteComment(comment.id)}
          >
            <Button variant="link" className="p-0 h-fit">
              <Typography
                as="extraSmallText"
                element="p"
                className="text-muted-foreground font-light"
              >
                Delete
              </Typography>
            </Button>
          </DeleteAlertDialog>

          <Button
            onClick={() => setIsEditingComment(true)}
            variant="link"
            className="p-0 h-fit"
          >
            <Typography
              as="extraSmallText"
              element="p"
              className="text-muted-foreground font-light"
            >
              Edit
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
