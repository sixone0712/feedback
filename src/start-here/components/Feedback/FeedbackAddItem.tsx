import { useState } from 'react';
import { FeedbackEntity } from '../../libs/context/FeedbackContext';

interface FeedbackAddItemProps extends FeedbackEntity {
  onCancel: (id: FeedbackEntity['entityId']) => void;
  onAdd: (
    data: Pick<FeedbackEntity, 'entityId' | 'name' | 'description'>,
  ) => void;
}

export default function FeedbackAddItem({
  entityId,
  name,
  description,
  onCancel,
  onAdd,
}: FeedbackAddItemProps) {
  const [localName, setLocalName] = useState(name);
  const [localDesc, setLocalDesc] = useState(description);

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
      }}
    >
      <input
        value={localName}
        onChange={({ target: { value } }) => {
          setLocalName(value);
        }}
        placeholder="유형이름"
      />
      <input
        value={localDesc}
        onChange={({ target: { value } }) => {
          setLocalDesc(value);
        }}
        placeholder="유형설명"
      />

      <button
        onClick={() => {
          onCancel(entityId);
        }}
      >
        취소
      </button>
      {Boolean(localName || localDesc) && (
        <button
          onClick={() => {
            if (!localName) {
              alert('유형 이름은 필수값입니다.');
              return;
            }
            onAdd({
              entityId,
              name: localName,
              description: localDesc,
            });
          }}
        >
          추가
        </button>
      )}
    </div>
  );
}
