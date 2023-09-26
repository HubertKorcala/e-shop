type Props = {
  children: React.ReactNode;
};

const FormContainer = (props: Props) => {
  return <div className="mx-auto max-w-lg prose">{props.children}</div>;
};

export default FormContainer;
