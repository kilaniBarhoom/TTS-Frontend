import { Button } from "@/components/ui/button";
import { Calendar as DatePicker } from "@/components/ui/calendar"; // Assuming you have a Calendar component
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Adjust the import paths as needed
import Typography from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { Calendar, MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { useProjectFormMutation } from "../../../api";
import { useProject } from "../../../provider";

const DateMutate = () => {
  const { project } = useProject();
  const { t } = useTranslation();

  const DateSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
  });

  type DateSchemaType = z.infer<typeof DateSchema>;

  const dateForm = useForm<DateSchemaType>({
    resolver: zodResolver(DateSchema),
    defaultValues: {
      startDate: project?.startDate || "",
      endDate: project?.endDate || "",
    },
  });

  const { mutateAsync } = useProjectFormMutation();

  const onSubmit = async (data: DateSchemaType) => {
    try {
      await mutateAsync({
        ...data,
        projectId: project?.id,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      });
    } catch (error) {
      // Handle submission error
    }
  };

  const handleDateChange = async (field: any, date?: Date) => {
    field.onChange(date?.toISOString());
    await dateForm.handleSubmit(onSubmit)();
  };

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Typography element="p" as="smallText" className="font-bold">
        {t("Dates")}:
      </Typography>
      <Form {...dateForm}>
        <form onSubmit={dateForm.handleSubmit(onSubmit)}>
          <div className="flex gap-2 items-center flex-wrap">
            <FormField
              control={dateForm.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <Calendar size={15} />
                          {field.value
                            ? format(parseISO(field.value), "dd/MM/yyyy")
                            : t("Start Date")}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <DatePicker
                        mode="single"
                        captionLayout="dropdown-buttons"
                        fromYear={2024}
                        toYear={2025}
                        selected={parseISO(field.value)}
                        onSelect={(date) => handleDateChange(field, date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <MoveRight className="text-muted-foreground" size={15} />
            <FormField
              control={dateForm.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <Calendar size={15} />
                          {field.value
                            ? format(parseISO(field.value), "dd/MM/yyyy")
                            : t("End Date")}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <DatePicker
                        mode="single"
                        captionLayout="dropdown-buttons"
                        fromYear={2024}
                        toYear={2025}
                        selected={parseISO(field.value)}
                        onSelect={(date) => handleDateChange(field, date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DateMutate;
