import { useFeedbackContext } from "../../libs/context/FeedbackProvider";
import FeedbackItem from "./FeedbackItem";
import { v4 as uuidv4 } from "uuid";

export default function Feedback() {
  const { managements, addLocalFeedback } = useFeedbackContext();

  return (
    <div>
      <ul>
        {managements.map((management) => (
          <FeedbackItem key={management.entityId} {...management} />
        ))}
      </ul>
      <button
        onClick={() => {
          addLocalFeedback(uuidv4());
        }}
      >
        카테고리 추가
      </button>
    </div>
  );
}
