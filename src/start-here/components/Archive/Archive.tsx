import { useFeedbackContext } from '../../libs/context/FeedbackProvider';

export default function Archive() {
  const { archives } = useFeedbackContext();

  return (
    <ul>
      {archives.map(({ entityId, name, description }) => (
        <li key={entityId}>
          <div>
            <span>{name}</span>
            <span>-</span>
            <span>{description}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
