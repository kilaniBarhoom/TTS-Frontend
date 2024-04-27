import useAxios from "@/hooks/use-axios";
import { getMemNotifsEndp } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetMemberNotifs = () => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data: response } = await axios.get(getMemNotifsEndp);

      return response;
    },
  });
};
