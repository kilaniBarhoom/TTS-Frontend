import { useToast } from "@/components/ui/use-toast";
import useAxios from "@/hooks/use-axios";
import {
  createTicketEndp,
  editTicketEndp,
  getTicketById,
  getTicketsEndp,
  watchTicketEndp,
} from "@/lib/constants";
import { TicketT } from "@/lib/types";
import { dateToString } from "@/lib/utils";
import { TicketFormSchema } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import * as z from "zod";

export const useGetTicketsQuery = () => {
  const axios = useAxios();
  const [searchParams] = useSearchParams();
  const ProjectId = searchParams.get("ProjectId" || "");
  const TicketName = searchParams.get("TicketName") || "";
  const AssignedMemberId = searchParams.get("AssignedMemberId") || "";

  return useQuery({
    queryKey: [
      "tickets",
      {
        ProjectId,
        TicketName,
        AssignedMemberId,
      },
    ],
    queryFn: async () => {
      const { data: response } = await axios.get(getTicketsEndp, {
        params: { ProjectId, TicketName, AssignedMemberId },
      });

      return response?.items as TicketT[];
    },
  });
};

export const useGetTicketByIdQuery = () => {
  const axios = useAxios();
  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get("selectedTicket") ?? useParams().ticketId;

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
        ProjectId?: string;
      }
    ) => {
      const { ticketId, ProjectId, ...formData } = data;
      if (!ticketId) {
        return axios.post(createTicketEndp, {
          ...formData,
          startDate: formData.startDate
            ? dateToString(formData.startDate)
            : undefined,
          dueDate: formData.dueDate
            ? dateToString(formData.dueDate)
            : undefined,
          ProjectId,
        });
      } else {
        return axios.put(editTicketEndp, {
          ...formData,
          ticketId,
          ProjectId,
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
