import { getInitialsOfFullName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAvatarProps = {
  name: string;
  image?: string;
  description?: string;
};
const UserAvatar = ({ name, description }: UserAvatarProps) => {
  const initials = getInitialsOfFullName(name);

  return (
    <div className="flex gap-2 ">
      <Avatar>
        <AvatarImage src={undefined} alt={name} />
        <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-center gap-1">
        <p className="leading-none text-foreground text-sm font-medium">
          {name}
        </p>
        <p className="text-xs leading-none text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

export { UserAvatar };
