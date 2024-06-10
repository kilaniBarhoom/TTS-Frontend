import { useToast } from "@/components/ui/use-toast";
import useAxios from "@/hooks/use-axios";
import {
  addMemToProjEndp,
  getMemOfAProjEndp,
  removeMemFromProjEndp,
} from "@/lib/constants";
import { AddMemberSchemaType } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useGetMembersByProjectId = (projectId?: string) => {
  if (!projectId) {
    return {
      data: [],
      isLoading: false,
    };
  }
  const axios = useAxios();

  return useQuery({
    queryKey: [
      "members",
      {
        projectId,
      },
    ],
    queryFn: async () => {
      const { data: response } = await axios.get(getMemOfAProjEndp, {
        params: {
          projectId,
        },
      });
      return response.members;
    },
  });
};

export const useMemberMutation = (projectId: string) => {
  const axios = useAxios();
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: AddMemberSchemaType }) => {
      const { email } = data;
      const payload = {
        email,
        projectId,
      };
      return axios.post(addMemToProjEndp, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
      toast({
        variant: "default",
        title: t("Success"),
        description: t("New member was added successfully"),
      });
    },
    onError: (error: any) => {
      // toast({
      //   variant: "destructive",
      //   title: t("Error"),
      //   description: error?.response?.data?.message
      //     ? t(error?.response?.data?.message)
      //     : t("Something went wrong"),
      // });
      console.log(error);
    },
  });
};

export const useRemoveMemberMutation = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({
      projectId,
      memberId,
    }: {
      projectId: string;
      memberId: string;
    }) =>
      axios.delete(removeMemFromProjEndp, {
        data: {
          projectId,
          memberId,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
      toast({
        title: t("Success"),
        description: t("Member was removed successfully"),
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
