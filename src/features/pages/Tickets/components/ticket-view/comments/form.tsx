import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CommentFormSchema, CommentFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCommentMutation } from "../../../api";
import TiptapEditor from "@/features/pages/Projects/components/tiptqp-editor/tiptap-editor";
import { CommentT } from "@/lib/types";

const CommentForm = ({
  comment,
  setIsEditingComment,
}: {
  comment?: CommentT;
  setIsEditingComment?: (value: boolean) => void;
}) => {
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
    }
  };

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
    <Button
      type="submit"
      size="sm"
      className="mt-4"
      loading={isLoading}
      disabled={isLoading}
    >
      Add Comment
    </Button>
  );

  return (
    <Form {...commentForm}>
      <form
        onSubmit={commentForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full items-start"
      >
        <div className="grid gap-2 w-full">
          <FormField
            control={commentForm.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TiptapEditor
                    content={field.value}
                    onChange={field.onChange}
                    error={!!commentForm.formState.errors.content?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {submitButton}
      </form>
    </Form>
  );
};

export default CommentForm;
