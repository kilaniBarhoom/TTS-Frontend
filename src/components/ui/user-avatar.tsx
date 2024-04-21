import { getInitialsOfFullName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

type UserAvatarProps = {
  name: string;
  image?: string;
  email: string;
};
const UserAvatar = ({ name, email }: UserAvatarProps) => {
  const initials = getInitialsOfFullName(name);
  return (
    <div className="flex gap-2 ">
      <Avatar>
        <AvatarImage src={undefined} alt={name} />
        <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-center gap-[-20px]">
        <p className='leading-none" text-sm font-medium'>{name}</p>
        <p className="text-xs leading-none text-muted-foreground">{email}</p>
      </div>
    </div>
  );
};

export { UserAvatar };
