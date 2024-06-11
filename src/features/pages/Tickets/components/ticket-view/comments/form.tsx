import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommentT } from "@/lib/types";
import { CommentFormSchema, CommentFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCommentMutation } from "../../../api/comments";
import RichEditor from "@/components/component/rich-editor";

const CommentForm = ({
  comment,
  setIsEditingComment,
}: {
  comment?: CommentT;
  setIsEditingComment?: (value: boolean) => void;
}) => {
  const [isWritingANewComment, setIsWritingANewComment] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const commentForm = useForm<CommentFormSchemaType>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      content: comment?.content || "",
    },
  });
  const isLoading = commentForm.formState.isSubmitting;
  const { mutateAsync } = useCommentMutation();

  const onSubmit = async (data: CommentFormSchemaType) => {
    try {
      if (comment) {
        await mutateAsync({ data, commentId: comment.id });
      } else {
        await mutateAsync({ data });
        commentForm.reset();
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsEditingComment?.(false);
      setIsWritingANewComment(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setIsEditingComment?.(false);
      setIsWritingANewComment(false);
    }
  };

  useEffect(() => {
    if (isWritingANewComment || comment) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isWritingANewComment, comment]);

  const submitButton = comment ? (
    <div className="flex space-x-2 items-center">
      <Button
        type="submit"
        size="sm"
        className="my-4"
        loading={isLoading}
        disabled={isLoading}
      >
        Update Comment
      </Button>
      <Button
        size="sm"
        variant="secondary"
        className="my-4"
        disabled={isLoading}
        onClick={() => setIsEditingComment?.(false)}
      >
        Cancel
      </Button>
    </div>
  ) : (
    <div className="flex space-x-2 items-center mt-4">
      <Button type="submit" size="sm" loading={isLoading} disabled={isLoading}>
        Add Comment
      </Button>
      <Button
        size="sm"
        variant="secondary"
        disabled={isLoading}
        onClick={() => setIsWritingANewComment(false)}
      >
        Cancel
      </Button>
    </div>
  );

  return (
    <Form {...commentForm}>
      <form
        ref={formRef}
        onSubmit={commentForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full items-start"
      >
        <div className="grid gap-2 w-full">
          {comment || isWritingANewComment ? (
            <FormField
              control={commentForm.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RichEditor value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <Input
              placeholder="Add a comment..."
              onFocus={() => setIsWritingANewComment(true)}
            />
          )}
        </div>
        {(isWritingANewComment || comment) && submitButton}
      </form>
    </Form>
  );
};

export default CommentForm;
