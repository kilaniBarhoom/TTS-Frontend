import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserAvatar } from "@/components/ui/user-avatar";
import { axios } from "@/hooks/use-axios";
import { getMemOfAProjEndp } from "@/lib/constants";
import { OwnerT } from "@/lib/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function MembersList() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("projectId") || "";
  const [members, setMembers] = useState<OwnerT[]>([]);
  const [loadingTogetMembers, setLoadingTogetMembers] = useState(false);

  useEffect(() => {
    const getMembers = async () => {
      setLoadingTogetMembers(true);
      try {
        const { data: response } = await axios.get(getMemOfAProjEndp, {
          params: { projectId: search },
        });

        setMembers(response.members);
      } catch (error) {
        throw new Error("An error occurred while fetching the members");
      } finally {
        setLoadingTogetMembers(false);
      }
    };
    getMembers();
  }, []);

  // const {
  //   data: members,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["members"],
  //   queryFn: async () => {
  //     try {
  //       const { data: response } = await axios.get(getMemOfAProjEndp, {
  //         params: { projectId },
  //       });

  //       return response.members;
  //     } catch (error) {
  //       throw new Error("An error occurred while fetching the members");
  //     }
  //   },
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <ErrorHandler status={500} title="Internal Server Error!" />;
  // }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {members.length} {members.length > 1 ? "Members" : "Member"}
          <div className="ml-auto">
            <ChevronDown size={20} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <ScrollArea className="max-h-56">
          {members?.map((member: OwnerT) => (
            <div key={member.id} className="w-full">
              <UserAvatar name={member.name} />
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
