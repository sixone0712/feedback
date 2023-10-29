import { useState } from 'react';
import CategoryProvider from '../../../fill-here/CategoryProvider';
import { FeedbackEntity } from '../../libs/context/FeedbackContext';
import { useFeedbackContext } from '../../libs/context/FeedbackProvider';
import FeedbackAddItem from './FeedbackAddItem';
import FeedbackEditItem from './FeedbackEditItem';

import FeedbackReadItem from './FeedbackReadItem';

interface FeedbackItemProps extends FeedbackEntity {}

export default function FeedbackItem(props: FeedbackItemProps) {
  const [isFetching, setFetching] = useState(false);
  const {
    addFeedback,
    editFeedback,
    deleteFeedback,
    deleteLocalFeedback,
    setFeedbackMode,
  } = useFeedbackContext();

  const onAdd = async (
    data: Pick<FeedbackEntity, 'entityId' | 'name' | 'description'>,
  ) => {
    setFetching(true);
    const { entityId, ...reqData } = data;
    try {
      const response = await CategoryProvider.createCategory(reqData);
      addFeedback(response);
    } catch (e) {
      console.error(e);
    } finally {
      deleteLocalFeedback(entityId);
      setFetching(false);
    }
  };

  const onDelete = async (entityId: FeedbackEntity['entityId']) => {
    setFetching(true);

    try {
      await CategoryProvider.deleteCategory(entityId);
      deleteFeedback(entityId);
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  const onEdit = async (
    data: Pick<FeedbackEntity, 'entityId' | 'name' | 'description'>,
  ) => {
    setFetching(true);

    try {
      const response = await CategoryProvider.modifyCategory(data);
      if (response) {
        editFeedback(response);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  const onDeleteLocal = (entityId: FeedbackEntity['entityId']) => {
    deleteLocalFeedback(entityId);
  };

  const onCancel = (entityId: FeedbackEntity['entityId']) => {
    setFeedbackMode({
      entityId,
      mode: 'read',
    });
  };

  const onChangeEditMode = (entityId: FeedbackEntity['entityId']) => {
    setFeedbackMode({
      entityId,
      mode: 'edit',
    });
  };

  if (isFetching) {
    return <li>Loading....</li>;
  }

  return (
    <li>
      {props.mode === 'read' && (
        <FeedbackReadItem {...props} onClick={onChangeEditMode} />
      )}
      {props.mode === 'edit' && (
        <FeedbackEditItem
          {...props}
          onCancel={onCancel}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {props.mode === 'add' && (
        <FeedbackAddItem {...props} onAdd={onAdd} onCancel={onDeleteLocal} />
      )}
    </li>
  );
}
