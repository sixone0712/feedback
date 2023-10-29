import { useState } from "react";
import { FeedbackEntity } from "../../libs/context/FeedbackContext";

interface FeedbackEditItemProps extends FeedbackEntity {
  onCancel: (id: FeedbackEntity["entityId"]) => void;
  onDelete: (id: FeedbackEntity["entityId"]) => void;
  onEdit: (
    data: Pick<FeedbackEntity, "entityId" | "name" | "description">
  ) => void;
}

export default function FeedbackEditItem({
  entityId,
  name,
  description,
  onCancel,
  onDelete,
  onEdit,
}: FeedbackEditItemProps) {
  const [localName, setLocalName] = useState(name);
  const [localDesc, setLocalDesc] = useState(description);

  console.log("render", entityId);

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
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
      <button
        onClick={() => {
          console.log("delete", entityId);
          onDelete(entityId);
        }}
      >
        삭제
      </button>
      <button
        onClick={() => {
          if (!localName) {
            alert("유형 이름은 필수값입니다.");
            return;
          }
          if (localName !== name || localDesc !== description) {
            if (
              !confirm(
                "유형 이름을 변경하면 기존에 등록된 피드백들의 유형도 변경됩니다.  변경하시겠습니까?"
              )
            ) {
              return;
            }
          }
          onEdit({
            entityId,
            name: localName,
            description: localDesc,
          });
        }}
      >
        저장
      </button>
    </div>
  );
}
