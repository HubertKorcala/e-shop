import EmptyStar from "../assets/icons/EmptyStar";
import HalfStar from "../assets/icons/HalfStar";
import Star from "../assets/icons/Star";

const Rating: React.FC<{
  value: number;
  text: string;
}> = (props) => {
  return (
    <div className=" rating flex">
      <span>
        {props.value >= 1 ? (
          <Star />
        ) : props.value >= 0.5 ? (
          <HalfStar />
        ) : (
          <EmptyStar />
        )}
      </span>
      <span>
        {props.value >= 2 ? (
          <Star />
        ) : props.value >= 1.5 ? (
          <HalfStar />
        ) : (
          <EmptyStar />
        )}
      </span>
      <span>
        {props.value >= 3 ? (
          <Star />
        ) : props.value >= 2.5 ? (
          <HalfStar />
        ) : (
          <EmptyStar />
        )}
      </span>
      <span>
        {props.value >= 4 ? (
          <Star />
        ) : props.value >= 3.5 ? (
          <HalfStar />
        ) : (
          <EmptyStar />
        )}
      </span>
      <span>
        {props.value >= 5 ? (
          <Star />
        ) : props.value >= 4.5 ? (
          <HalfStar />
        ) : (
          <EmptyStar />
        )}
      </span>
      <div className="badge badge-xs self-center">{props.text}</div>
    </div>
  );
};

export default Rating;
