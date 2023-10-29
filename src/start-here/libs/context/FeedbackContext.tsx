import { createContext, Dispatch } from 'react';
import CategoryEntity from '../../../bases/types/CategoryEntity';

export interface FeedbackEntity extends CategoryEntity {
  mode: 'add' | 'edit' | 'read';
}

export type FeedbackState = {
  managements: Map<string, FeedbackEntity>;
  archives: CategoryEntity[];
};

export type FeedbackAction =
  | { type: 'SET_SERVER_DATA'; payload: CategoryEntity[] }
  | { type: 'ADD_FEEDBACK'; payload: CategoryEntity }
  | { type: 'EDIT_FEEDBACK'; payload: CategoryEntity }
  | { type: 'DELETE_FEEDBACK'; payload: CategoryEntity['entityId'] }
  | {
      type: 'SET_FEEDBACK_MODE';
      payload: Pick<FeedbackEntity, 'entityId' | 'mode'>;
    }
  | { type: 'ADD_LOCAL_FEEDBACK'; payload: FeedbackEntity['entityId'] }
  | { type: 'DELETE_LOCAL_FEEDBACK'; payload: FeedbackEntity['entityId'] };

type FeedbackDispatch = Dispatch<FeedbackAction>;

export const FeedbackStateContext = createContext<FeedbackState | undefined>(
  undefined,
);

export const FeedbackDispatchContext = createContext<
  FeedbackDispatch | undefined
>(undefined);
