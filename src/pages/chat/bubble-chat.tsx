interface IProps {
  message: any;
  userRole: string;
  loginId: number;
}

const BubbleChat = ({ message, userRole, loginId }: IProps) => {
  return (
    <div
      className={`flex ${
        userRole == "user" && message.sender_id == loginId && "justify-end"
      } ${
        userRole == "admin" && message.sender_id != loginId && "justify-end"
      }`}
    >
      <div
        className={`w-fit rounded-lg p-2 bg-[#9ED1E3] ${
          userRole == "user" && message.sender_id == loginId && "bg-[#C6D6CE]"
        } ${
          userRole == "admin" && message.sender_id != loginId && "bg-[#C6D6CE]"
        }`}
      >
        <p className="text-justify">{message.message}</p>
      </div>
    </div>
  );
};

export default BubbleChat;
