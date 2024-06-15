import RichEditor from "@/components/component/rich-editor";
import { UserAvatar } from "@/components/component/user-avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetMembersByProjectId } from "@/features/pages/Projects/api/members";
import { OwnerT, ProjectT } from "@/lib/types";
import { cn, stringToDate } from "@/lib/utils";
import { format } from "date-fns";
import { ar, enGB } from "date-fns/locale";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

type TicketFormProps = {
  ticketForm: any;
  onSubmit: any;
  isLoading: boolean;
  projects: ProjectT[];
};

const TicketForm = ({
  ticketForm,
  onSubmit,
  isLoading,
  projects,
}: TicketFormProps) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [projectId, setProjectId] = useState(
    searchParams.get("ProjectId") || projects[0]?.id
  );

  const { data: members, isLoading: isLoadingToGetMembers = false } =
    useGetMembersByProjectId(projectId);

  // console.log("members", members);

  return (
    <Form {...ticketForm}>
      <form
        onSubmit={ticketForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="grid gap-2">
          <FormField
            control={ticketForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Name"
                    autoComplete="name"
                    error={!!ticketForm.formState.errors.name?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={ticketForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RichEditor value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between gap-2">
          <div className="grid gap-2 flex-1">
            <FormField
              control={ticketForm.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(stringToDate(field.value), "dd/LL/y", {
                              locale:
                                document.documentElement.lang === "ar"
                                  ? ar
                                  : enGB,
                            })
                          ) : (
                            <span>Start Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        fromYear={2024}
                        toYear={2025}
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2 flex-1">
            <FormField
              control={ticketForm.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(stringToDate(field.value), "dd/LL/y", {
                              locale:
                                document.documentElement.lang === "ar"
                                  ? ar
                                  : enGB,
                            })
                          ) : (
                            <span>Due Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        fromYear={2024}
                        toYear={2025}
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="grid gap-2 flex-1">
            <FormField
              control={ticketForm.control}
              name="ticketStatus"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pending">{t("Pending")}</SelectItem>
                      <SelectItem value="InProgress">
                        {t("InProgress")}
                      </SelectItem>
                      <SelectItem value="Completed">
                        {t("Completed")}
                      </SelectItem>
                      <SelectItem value="Canceled">{t("Draft")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2 flex-1">
            <FormField
              control={ticketForm.control}
              name="ticketPriority"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Low">{t("Low")}</SelectItem>
                      <SelectItem value="Medium">{t("Medium")}</SelectItem>
                      <SelectItem value="High">{t("High")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="gap-3 flex items-center">
          <FormField
            control={ticketForm.control}
            name="projectId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setProjectId(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Project"
                        defaultValue={
                          projects.find((project) => project.id === projectId)
                            ?.name
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projects?.map(({ id, name }: OwnerT) => {
                      return (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={ticketForm.control}
            name="assigneeId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign To" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoadingToGetMembers ? (
                      <div className="h-20 flex justify-center items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      </div>
                    ) : (
                      members?.map(({ id, name }: OwnerT) => {
                        return (
                          <SelectItem key={id} value={id}>
                            <UserAvatar
                              name={name}
                              avatarSize="size-5"
                              nameSize="text-xs"
                              // className="hover:bg-muted/40 cursor-pointer py-1 px-2 rounded-md transition-all duration-200 ease-in-out"
                            />
                          </SelectItem>
                        );
                      })
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Button type="submit" loading={isLoading}>
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TicketForm;
