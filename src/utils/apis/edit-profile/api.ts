import axios from 'axios';
import { EditProfileData } from '@/utils/apis/edit-profile/schema';

const API_BASE_URL = 'https://zyannstore.my.id/users/profile'; 

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; 
  }
};

export const updateUserProfile = async (data: EditProfileData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/users/profile`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error; 
  }
};
