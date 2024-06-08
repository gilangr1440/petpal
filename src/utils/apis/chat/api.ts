import { toast } from "@/components/ui/use-toast";
import axiosWithConfig from "../axiosWithConfig";

export const getChatMessages = async (chatId: number) => {
  try {
    const response = await axiosWithConfig.get(
      `${import.meta.env.VITE_BASE_URL}/chats/${chatId}`
    );
    return response.data;
  } catch (error) {
    toast({
      variant: "destructive",
      title: `Error fetching chat messages: ${error}`,
    });
    return [];
  }
};

export const postChatMessage = async (chatId: number, message: string) => {
  try {
    const response = await axiosWithConfig.post(
      `${import.meta.env.VITE_BASE_URL}/chats/${chatId}`,
      { message }
    );
    return response.data;
  } catch (error) {
    toast({
      variant: "destructive",
      title: `Error fetching chat messages: ${error}`,
    });
    return null;
  }
};
