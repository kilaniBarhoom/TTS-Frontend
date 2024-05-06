import useAxios from "@/hooks/use-axios";
import {
  getProjEndp,
  searchProjEndp,
  getMemOfAProjEndp,
  addMemToProjEndp,
  createProjEndp,
  editProjEndp,
} from "@/lib/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, useToast } from "@/components/ui/use-toast";
import { AddMemberSchemaType, ProjectFormSchemaType } from "@/schemas";
import { dateToString } from "@/lib/utils";

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

// export const getProjectByIdQuery = async () => {
//   const axios = useAxios();
//   const [searchParams] = useSearchParams();
//   const search = searchParams.get("projectId");
//   const { data: response } = await axios.get(getProjEndp, {
//     params: { search },
//   });
//   console.log(response);

//   return response;
// };

// export const useAddProjectMutation = () => {
//   const axios = useAxios();
//   const queryClient = useQueryClient();

//   const addProject = async (project: ProjectT) => {
//     try {
//       const { data: response } = await axios.post(searchProjEndp, project);
//       queryClient.invalidateQueries("projects");
//       return response;
//     } catch (error) {
//       throw new Error("Failed to add project");
//     }
//   };

//   return useMutation(addProject);
// };

// get project by id

export const useGetMembersByProjectId = ({
  projectId,
}: {
  projectId: string;
}) => {
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
        description: t("Project was added successfully"),
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

export const useProjectFormMutation = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      data,
      projectId,
    }: {
      data: ProjectFormSchemaType;
      projectId?: string;
    }) => {
      if (!projectId) {
        return axios.post(createProjEndp, {
          ...data,
          startDate: dateToString(data.startDate),
          endDate: dateToString(data.endDate),
        });
      } else {
        return axios.put(editProjEndp, {
          ...data,
          projectId,
        });
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      toast({
        title: "Project Created",
        description: "A new project has been created successfuly",
      });
    },
    onError: (error: any) => {
      console.log("error mutation projects", error);
    },
  });
};
