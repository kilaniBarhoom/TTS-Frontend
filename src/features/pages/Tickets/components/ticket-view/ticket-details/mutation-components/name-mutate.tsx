import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTicketFormMutation } from "../../../../api/tickets";
import { useTicket } from "../../provider";

const NameMutate = () => {
  const { ticket } = useTicket();
  const [isFocused, setIsFocused] = useState(false);

  const NameSchema = z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot be more than 50 characters"),
  });
  type NameSchemaType = z.infer<typeof NameSchema>;

  const nameForm = useForm<NameSchemaType>({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: ticket?.name,
    },
  });

  const { mutateAsync } = useTicketFormMutation();

  const onSubmit = async (data: NameSchemaType) => {
    try {
      await mutateAsync({
        ...data,
        projectId: ticket?.project?.id,
        ticketId: ticket?.id,
      });
      setIsFocused(false);
    } catch (error) {
      // Handle submission error
    }
  };

  const handleCancel = () => {
    nameForm.reset();
    setIsFocused(false);
  };

  const isLoading = nameForm.formState.isSubmitting;

  return (
    <Form {...nameForm}>
      <form
        onSubmit={nameForm.handleSubmit(onSubmit, () => {
          if (Object.keys(nameForm.formState.errors).length > 0) {
            setIsFocused(true);
          }
        })}
      >
        <div>
          <FormField
            control={nameForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    className={cn(
                      "text-3xl font-extrabold resize-none border-0 focus-visible:border-2 pl-0 h-fit w-full",
                      isFocused && "pl-4"
                    )}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      setTimeout(() => {
                        if (
                          !nameForm.formState.isSubmitting &&
                          !Object.keys(nameForm.formState.errors).length
                        ) {
                          setIsFocused(false);
                          nameForm.reset();
                        }
                      }, 100); // Adjust the timeout as needed
                    }}
                    autoComplete="name"
                    error={!!nameForm.formState.errors.name?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isFocused && (
            <div className="flex space-x-2 mt-2">
              <Button
                type="submit"
                size={"xs"}
                loading={isLoading}
                disabled={isLoading}
              >
                <Check size={16} />
              </Button>
              <Button size={"xs"} variant="secondary" onClick={handleCancel}>
                <X size={16} />
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default NameMutate;
