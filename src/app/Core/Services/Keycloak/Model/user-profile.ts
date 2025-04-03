import { UUID } from "crypto";

export interface UserProfile {
  id?: UUID;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
}
