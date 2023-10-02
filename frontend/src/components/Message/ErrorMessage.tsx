import { Message } from "./successMessage";

const ErrorMessage: React.FC<Message> = (props) => {
  return <div className="alert alert-error py-3">{props.message}</div>;
};

export default ErrorMessage;
