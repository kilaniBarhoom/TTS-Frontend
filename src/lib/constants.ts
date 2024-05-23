export const loginEndp = import.meta.env.VITE_LOGIN_ENDPOINT as string;

export const registerEndp = import.meta.env.VITE_REGISTER_ENDPOINT as string;

export const refreshEndp = import.meta.env
  .VITE_REFRESH_TOKEN_ENDPOINT as string;

export const logoutEndp = import.meta.env.VITE_LOGOUT_ENDPOINT as string;

export const searchProjEndp = import.meta.env
  .VITE_SEARCH_PROJECTS_ENDPOINT as string;

export const createProjEndp = import.meta.env
  .VITE_CREATE_PROJECT_ENDPOINT as string;

export const editProjEndp = import.meta.env
  .VITE_EDIT_PROJECT_ENDPOINT as string;

export const getProjEndp = import.meta.env
  .VITE_GET_PROJECT_BY_ID_ENDPOINT as string;

export const getTicketsByProjIdEndp = import.meta.env
  .VITE_GET_TICKETS_BY_PROJECT_ID_ENDPOINT;

export const getMemOfAProjEndp = import.meta.env
  .VITE_GET_MEMBERS_OF_A_PROJECT_ENDPOINT as string;

export const addMemToProjEndp = import.meta.env
  .VITE_ADD_MEMBER_TO_PROJECT_ENDPOINT as string;

export const getMemNotifsEndp = import.meta.env
  .VITE_GET_MEMBER_NOTIFICATIONS_ENDPOINT as string;

export const getTicketsByProjectId = import.meta.env
  .VITE_GET_TICKETS_BY_PROJECTID_ENDPOINT;
export const getTicketById = import.meta.env.VITE_GET_TICKETS_BY_ID_ENDPOINT;

export const addCommentEndp = import.meta.env.VITE_ADD_COMMENT_ENDPOINT;
export const editCommentEndp = import.meta.env.VITE_EDIT_COMMENT_ENDPOINT;
export const deleteCommentEndp = import.meta.env.VITE_DELETE_COMMENT_ENDPOINT;
