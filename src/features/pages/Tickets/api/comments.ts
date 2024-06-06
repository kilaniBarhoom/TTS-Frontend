import { toast, useToast } from "@/components/ui/use-toast";
import useAxios from "@/hooks/use-axios";
import {
  addCommentEndp,
  deleteCommentEndp,
  editCommentEndp,
} from "@/lib/constants";
import { CommentFormSchemaType } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export const useCommentMutation = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get("selectedTicket") || "";
  return useMutation({
    mutationFn: ({
      data,
      commentId,
    }: {
      data: CommentFormSchemaType;
      commentId?: string;
    }) => {
      const { ...formData } = data;

      if (ticketId && !commentId) {
        return axios.post(addCommentEndp, {
          ...formData,
          ticketId,
        });
      } else {
        return axios.put(editCommentEndp, {
          ...formData,
          commentId,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ticket"],
      });
      toast({
        title: "Comment Added",
        description: "Your comment has been added successfully",
      });
    },
    onError: (error: any) => {
      console.log("error mutation comment", error);
    },
  });
};

export const useDeleteCommentMutation = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (commentId: string) =>
      axios.delete(deleteCommentEndp, {
        data: {
          commentId,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ticket"],
      });
      toast({
        title: t("Success"),
        description: t("Comment was deleted successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: t("Error"),
        description: error?.response?.data?.message
          ? t(error?.response?.data?.message)
          : t("Something went wrong"),
      });
    },
  });
};
