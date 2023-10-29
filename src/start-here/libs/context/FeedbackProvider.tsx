import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import CategoryEntity from "../../../bases/types/CategoryEntity";
import {
  FeedbackAction,
  FeedbackDispatchContext,
  FeedbackEntity,
  FeedbackState,
  FeedbackStateContext,
} from "./FeedbackContext";

const FeedbackProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(feedbackReducer, {
    managements: new Map(),
    archives: [],
  });

  return (
    <FeedbackStateContext.Provider value={state}>
      <FeedbackDispatchContext.Provider value={dispatch}>
        {children}
      </FeedbackDispatchContext.Provider>
    </FeedbackStateContext.Provider>
  );
};

function feedbackReducer(
  state: FeedbackState,
  action: FeedbackAction
): FeedbackState {
  switch (action.type) {
    case "SET_SERVER_DATA": {
      const categories = action.payload;
      const managements: FeedbackState["managements"] = new Map();
      const archives: FeedbackState["archives"] = [];

      categories.forEach((category) => {
        if (category.isArchived) {
          archives.push(category);
        } else {
          managements.set(category.entityId, { ...category, mode: "read" });
        }
      });

      return {
        managements,
        archives,
      };
    }

    case "ADD_FEEDBACK": {
      const addData = action.payload;
      state.managements.set(addData.entityId, { ...addData, mode: "read" });
      console.log("add", state.managements);

      return {
        ...state,
        managements: new Map(state.managements),
      };
    }

    case "EDIT_FEEDBACK": {
      const editData = action.payload;
      const { managements } = state;

      if (!managements.has(editData.entityId)) {
        return state;
      }

      managements.set(editData.entityId, { ...editData, mode: "read" });

      return {
        ...state,
        managements: new Map(managements),
      };
    }

    case "DELETE_FEEDBACK": {
      const deleteId = action.payload;

      console.log("delete_feedback", state.managements);

      // if (!state.managements.has(deleteId)) {
      // return {
      //   managements: new Map(state.managements),
      //   archives: [...state.archives],
      // };
      //   return state;
      // }

      console.log(state.managements.delete(deleteId));

      return {
        ...state,
        managements: new Map(state.managements),
        archives: [...state.archives],
      };
      // const { managements, archives } = state;
      // console.log(managements);

      // console.log(managements);
      // console.log(new Map(managements));

      // const newManagements = new Map(managements);

      // if (!newManagements.has(deleteId)) {
      //   return state;
      // }

      // const deleteData = newManagements.get(deleteId);
      // if (!deleteData) {
      //   return state;
      // }

      // newManagements.delete(deleteId);

      // console.log(Array.from(newManagements));

      // console.log(newManagements);

      // const { mode, ...newArchives } = deleteData;

      // return {
      //   managements: newManagements,
      //   archives: [
      //     ...archives,
      //     {
      //       ...newArchives,
      //     },
      //   ],
      // };

      // if (!state.managements.has(deleteId)) {
      //   return state;
      // }

      // const deleteData = state.managements.get(deleteId);
      // if (!deleteData) {
      //   return state;
      // }

      // state.managements.delete(deleteId);
      // console.log(state);

      // console.log(Array.from(state.managements));

      // console.log(state.managements);

      // const { mode, ...newArchives } = deleteData;
      // console.log(mode);

      // return {
      //   managements: new Map(state.managements),
      //   archives: [
      //     ...archives,
      //     {
      //       ...newArchives,
      //     },
      //   ],
      // };
    }

    case "SET_FEEDBACK_MODE": {
      const { mode, entityId } = action.payload;

      const found = state.managements.get(entityId);
      if (!found) {
        return state;
      }

      state.managements.set(entityId, {
        ...found,
        mode,
      });

      return {
        ...state,
        managements: new Map(state.managements),
      };
    }

    case "ADD_LOCAL_FEEDBACK": {
      const entityId = action.payload;
      state.managements.set(entityId, {
        entityId,
        name: "",
        description: "",
        isArchived: false,
        mode: "add",
      });

      return {
        ...state,
        managements: new Map(state.managements),
      };
    }

    case "DELETE_LOCAL_FEEDBACK": {
      const deleteId = action.payload;

      state.managements.delete(deleteId);
      return {
        ...state,
        managements: new Map(state.managements),
      };
    }

    default:
      return state;
  }
}

export const useFeedbackContext = () => {
  const state = useContext(FeedbackStateContext);
  if (!state) throw new Error("Cannot find FeedbackStateContext");

  const dispatch = useContext(FeedbackDispatchContext);
  if (!dispatch) throw new Error("Cannot find FeedbackDispatchContext");

  useEffect(() => {
    console.log("changed", state.managements);
  }, [state.managements]);

  const managements = useMemo(() => {
    return [...state.managements.values()];
  }, [state.managements]);

  const archives = useMemo(() => {
    return state.archives;
  }, [state.archives]);

  const saveCategories = useCallback(
    (categories: CategoryEntity[]) => {
      dispatch({
        type: "SET_SERVER_DATA",
        payload: categories,
      });
    },
    [dispatch]
  );

  const addFeedback = useCallback(
    (feedback: CategoryEntity) => {
      dispatch({ type: "ADD_FEEDBACK", payload: feedback });
    },
    [dispatch]
  );

  const editFeedback = useCallback(
    (feedback: CategoryEntity) => {
      dispatch({ type: "EDIT_FEEDBACK", payload: feedback });
    },
    [dispatch]
  );

  const deleteFeedback = useCallback(
    (id: CategoryEntity["entityId"]) => {
      dispatch({ type: "DELETE_FEEDBACK", payload: id });
    },
    [dispatch]
  );

  const setFeedbackMode = useCallback(
    (payload: Pick<FeedbackEntity, "mode" | "entityId">) => {
      dispatch({ type: "SET_FEEDBACK_MODE", payload });
    },
    [dispatch]
  );

  const addLocalFeedback = useCallback(
    (payload: FeedbackEntity["entityId"]) => {
      dispatch({ type: "ADD_LOCAL_FEEDBACK", payload });
    },
    [dispatch]
  );

  const deleteLocalFeedback = useCallback(
    (payload: FeedbackEntity["entityId"]) => {
      dispatch({ type: "DELETE_LOCAL_FEEDBACK", payload });
    },
    [dispatch]
  );

  return {
    managements,
    archives,
    saveCategories,
    addFeedback,
    editFeedback,
    deleteFeedback,
    setFeedbackMode,
    addLocalFeedback,
    deleteLocalFeedback,
  };
};

export default FeedbackProvider;
