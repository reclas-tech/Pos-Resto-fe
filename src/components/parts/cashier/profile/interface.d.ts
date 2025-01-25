export interface UserProfileResponse {
  statusCode: number;
  message: string;
  data: UserProfileData;
}

interface UserProfileData {
  address: string;
  phone: string;
  name: string;
  role: string;
}
