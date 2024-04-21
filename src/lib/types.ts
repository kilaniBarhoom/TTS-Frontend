export type UserT = {
  id: string;
  name: string;
  email: string;
};

export type ThemeT = "dark" | "light" | "system";

export type LanguageT = "en" | "ar";

export type TicketT = {
  id: string;
  project: Partial<Pick<ProjectT, "id" | "name">>;
  assignee: OwnerT;
  reporter: OwnerT;
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
  member: OwnerT;
};

export interface ProjectT {
  id: string;
  owner: OwnerT;
  name: string;
  description: string;
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
}

export interface OwnerT {
  id: string;
  name: string;
}
