import { cn, getInitialsOfFullName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAvatarProps = {
  name?: string;
  image?: string | undefined;
  description?: string;
  avatarSize?: string;
  nameSize?: string;
  className?: string;
};
const UserAvatar = ({
  name,
  description,
  image,
  avatarSize,
  nameSize,
  className,
}: UserAvatarProps) => {
  const initials = getInitialsOfFullName(name);

  return (
    <div className={cn("flex gap-2", className)}>
      <Avatar className={cn("size-7", avatarSize)}>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-center gap-0">
        <p
          className={cn(
            "leading-none text-foreground text-xs font-medium",
            nameSize
          )}
        >
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
