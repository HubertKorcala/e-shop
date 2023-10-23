import { Message } from "./SuccessMessage";

const ErrorMessage: React.FC<Message> = (props) => {
  return <div className="alert alert-error py-3">{props.message}</div>;
};

export default ErrorMessage;
