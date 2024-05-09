import useAxios from "@/hooks/use-axios";
import { getTicketsByProjIdEndp } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useGetTicketsByProjectId = () => {
  const axios = useAxios();
  const { projectId } = useParams();
  return useQuery({
    queryKey: [
      "tickets",
      {
        projectId,
      },
    ],
    queryFn: async () => {
      const { data: response } = await axios.get(getTicketsByProjIdEndp, {
        params: { projectId },
      });
      return response?.tickets;
    },
  });
};
