export type UserT = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: string;
};

export type ThemeT = "dark" | "light" | "system";

export type LanguageT = "en" | "ar";

export type ProjectT = {
  id: string;
  name: string;
  description: string;
  owner: Partial<Pick<UserT, "id" | "firstName" | "lastName">>;
  startDate: string;
  endDate: string;
  projectStatus:
    | "Active"
    | "Pending"
    | "Canceled"
    | "Completed"
    | "UnderReview"
    | "Draft"
    | "OnHold";
};

export type TicketT = {
  id: string;
  project: Partial<Pick<ProjectT, "id" | "name">>;
  assignee: Partial<Pick<UserT, "id" | "firstName" | "lastName">>;
  reporter: Partial<Pick<UserT, "id" | "firstName" | "lastName">>;
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  ticketPriority: "Low" | "High" | "Medium";
  ticketStatus: "Pending" | "Completed" | "Canceled" | "InProgress";
};

export type CommentT = {
  id: string;
  content: string;
  ticket: Partial<Pick<TicketT, "id" | "name">>;
  member: Partial<Pick<UserT, "id" | "firstName" | "lastName">>;
};
