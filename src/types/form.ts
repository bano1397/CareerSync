export interface ProfileFormData {
  name: string;
  email: string;
  profileImage: File | string | null;
  project: string;
  techniques: string[];
  tools: string[];
  imageUrl?: string;
}