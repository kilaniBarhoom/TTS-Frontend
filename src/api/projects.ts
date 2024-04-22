import useAxios from "@/hooks/use-axios";
import { getProjEndp, searchProjEndp } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { ProjectT } from "@/lib/types";
import { useSearchParams } from "react-router-dom";

export const useGetAllProjectsQuery = () => {
  console.log("test")
  const axios = useAxios();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("ProjectName") || "";

  return useQuery({
    queryKey: [
      "projects",
      {
        ProjectName: search,
      },
    ],
    queryFn: async () => {
      const { data: response } = await axios.get(searchProjEndp, {
        params: { search },
      });
      return response.items;
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
