import { toast, useToast } from "@/components/ui/use-toast";
import useAxios from "@/hooks/use-axios";
import {
  addCommentEndp,
  createTicketEndp,
  deleteCommentEndp,
  editCommentEndp,
  editTicketEndp,
  getTicketById,
  getTicketsByProjIdEndp,
  getTicketsEndp,
  watchTicketEndp,
} from "@/lib/constants";
import { TicketT } from "@/lib/types";
import { dateToString } from "@/lib/utils";
import { CommentFormSchemaType, TicketFormSchema } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import * as z from "zod";

export const useGetTicketsQuery = () => {
  const axios = useAxios();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId" || "");
  const TicketName = searchParams.get("TicketName") || "";

  return useQuery({
    queryKey: [
      "tickets",
      {
        projectId,
        TicketName,
      },
    ],
    queryFn: async () => {
      const { data: response } = await axios.get(
        projectId ? getTicketsByProjIdEndp : getTicketsEndp,
        {
          params: { projectId, TicketName },
        }
      );
      const tickets = projectId ? response?.tickets : response?.items;
      return tickets as TicketT[];
    },
  });
};

export const useGetTicketByIdQuery = () => {
  const axios = useAxios();
  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get("selectedTicket") || useParams().ticketId;

  return useQuery({
    queryKey: ["ticket", { ticketId }],
    queryFn: async () => {
      const { data: response } = await axios.get(getTicketById, {
        params: { ticketId },
      });
      return response as TicketT;
    },
  });
};

export const useTicketFormMutation = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { toast } = useToast();
  type PartialTicketFormData = Partial<z.infer<typeof TicketFormSchema>>;
  return useMutation({
    mutationFn: (
      data: PartialTicketFormData & { ticketId?: string } & {
        projectId?: string;
      }
    ) => {
      const { ticketId, projectId, ...formData } = data;
      if (!ticketId) {
        return axios.post(createTicketEndp, {
          ...formData,
          startDate: formData.startDate
            ? dateToString(formData.startDate)
            : undefined,
          dueDate: formData.dueDate
            ? dateToString(formData.dueDate)
            : undefined,
          projectId,
        });
      } else {
        return axios.put(editTicketEndp, {
          ...formData,
          ticketId,
          projectId,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
      toast({
        title: t("Success"),
        description: t("Ticket was added successfully"),
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
    onSuccess: (data) => {
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

export const useTicketWatchMutation = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (ticketId: string) =>
      axios.post(`${watchTicketEndp}?ticketId=${ticketId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ticket"],
      });
      toast({
        title: t("Success"),
        description: t("You are now watching this ticket"),
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
