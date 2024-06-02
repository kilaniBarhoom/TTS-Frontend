import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentT } from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { useTicket } from "../provider";
import CommentForm from "./form";
import Comment from "./comment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { useTranslation } from "react-i18next";

const Comments = () => {
  const { user } = useAuth();
  const { ticket } = useTicket();
  const { t } = useTranslation();
  return (
    <div className="grid gap-4">
      <Typography element="p" as="smallText">
        {t("Activity")}:
      </Typography>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-fit justify-start rtl:flex-row-reverse mb-2">
          <TabsTrigger value="all" className="gap-1 items-center flex text-sm">
            All
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="gap-1 items-center flex text-sm"
          >
            Comments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="flex flex-col gap-1">
            <div className="flex gap-3 mb-3">
              <Avatar className="">
                <AvatarImage src={undefined} alt={""} />
                <AvatarFallback className="xl">
                  {user?.name.split("")[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CommentForm />
            </div>
            <div className="grid gap-2 md:p-4 p-2">
              {ticket?.comments.length ? (
                ticket?.comments.map((comment: CommentT) => (
                  <Comment key={comment.id} comment={comment} />
                ))
              ) : (
                <Typography
                  className="text-center"
                  as={"largeText"}
                  element="p"
                >
                  No comments yet
                </Typography>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="comments">
          <Typography as="p" element="p">
            No comments yet
          </Typography>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Comments;
