export interface UserEditorRequest {
  username: string;
  email: string;
  activated: number;
  password?: string;
  role: number;
}
