import { useToast } from "@/components/ui/use-toast";
import useAxios from "@/hooks/use-axios";
import {
  addMemToProjEndp,
  createProjEndp,
  editProjEndp,
  getMemOfAProjEndp,
  getProjEndp,
  searchProjEndp,
} from "@/lib/constants";
import { dateToString } from "@/lib/utils";
import { AddMemberSchemaType, ProjectFormSchema } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import * as z from "zod";

export const useGetAllProjectsQuery = () => {
  const axios = useAxios();
  const [searchParams] = useSearchParams();
  const ProjectName = searchParams.get("ProjectName") || "";
  const PageSize = searchParams.get("PageSize") || "5";
  const PageNumber = searchParams.get("PageNumber") || "1";

  return useQuery({
    queryKey: [
      "projects",
      {
        ProjectName,
        PageSize,
        PageNumber,
      },
    ],
    queryFn: async () => {
      const { data: response } = await axios.get(searchProjEndp, {
        params: { ProjectName, PageSize, PageNumber },
      });
      return response;
    },
  });
};

export const useGetProjectByIdQuery = (projectId?: string) => {
  const axios = useAxios();
  projectId = projectId ?? useParams().projectId;
  if (!projectId) {
    return {
      data: null,
      isLoading: false,
    };
  }
  return useQuery({
    queryKey: [
      "project",
      {
        projectId,
      },
    ],
    queryFn: async () => {
      const { data: response } = await axios.get(getProjEndp, {
        params: { projectId },
      });
      return response;
    },
  });
};

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

export const useMemberMutation = ({ projectId }: { projectId: string }) => {
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
      console.log(payload);

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

// Update the useProjectFormMutation hook to accept form data object
export const useProjectFormMutation = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  type PartialProjectFormData = Partial<z.infer<typeof ProjectFormSchema>>;
  return useMutation({
    mutationFn: (data: PartialProjectFormData & { projectId?: string }) => {
      const { projectId, ...formData } = data;

      if (!projectId) {
        return axios.post(createProjEndp, {
          ...formData,
          startDate: formData.startDate
            ? dateToString(formData.startDate)
            : undefined,
          endDate: formData.endDate
            ? dateToString(formData.endDate)
            : undefined,
        });
      } else {
        return axios.put(editProjEndp, {
          ...formData,
          projectId,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project"],
      });
    },
    onError: (error: any) => {
      console.log("error mutation projects", error);
    },
  });
};
