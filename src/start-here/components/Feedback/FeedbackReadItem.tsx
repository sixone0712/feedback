import { FeedbackEntity } from '../../libs/context/FeedbackContext';

interface FeedbackItemProps extends FeedbackEntity {
  onClick: (id: FeedbackEntity['entityId']) => void;
}

export default function FeedbackReadItem({
  entityId,
  name,
  description,
  onClick,
}: FeedbackItemProps) {
  return (
    <div
      onClick={() => {
        onClick(entityId);
      }}
    >
      <span>{name}</span>
      <span>-</span>
      <span>{description}</span>
    </div>
  );
}
