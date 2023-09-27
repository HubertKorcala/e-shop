export type LabelProps = {
  label: string;
  type: string;
  id: string;
  value: string;
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<{ data: LabelProps }> = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.data.id} className="mb-2">
        {props.data.label}
      </label>
      <input
        type={props.data.type}
        id={props.data.id}
        value={props.data.value}
        placeholder={props.data.placeHolder}
        className="input input-bordered w-full max-w-md"
        onChange={props.data.onChange}
      />
    </div>
  );
};

export default Input;
