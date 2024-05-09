"use client";
import MultipleSelector, { Option } from "@/components/component/multi-select";
import { toast } from "@/components/ui/use-toast";

const OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
];

const MultipleSelectorWithMaxSelected = () => {
  return (
    <div className="flex w-96 flex-col gap-5 px-10">
      <MultipleSelector
        maxSelected={3}
        onMaxSelected={(maxLimit) => {
          toast({
            title: `You have reached max selected: ${maxLimit}`,
          });
        }}
        defaultOptions={OPTIONS}
        placeholder="Status"
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
    </div>
  );
};

export default MultipleSelectorWithMaxSelected;
