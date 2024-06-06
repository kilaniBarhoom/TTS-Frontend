import useAxios from "@/hooks/use-axios";
import {
  createProjEndp,
  editProjEndp,
  getProjEndp,
  searchProjEndp,
} from "@/lib/constants";
import { dateToString } from "@/lib/utils";
import { ProjectFormSchema } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
