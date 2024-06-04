import { z } from 'zod';
import { editUserSchema } from '@/utils/apis/edit-profile/types';

export type EditProfileData = z.infer<typeof editUserSchema>;