export interface UserInterface {
  email?: string | null;
  first_name?: string;
  last_name?: string;
  accessToken?: string;
  family_name?: string;
  given_name?: string;
  granted_scopes?: string;
  id?: string;
  idToken?: string;
  locale?: string;
  name?: string;
  pendingToken?: string;
  picture?: string;
  providerId?: string;
  signInMethod?: string;
  verified_email?: boolean;
  role?: string;
}
