import React, {useReducer, createContext} from 'react';

export const StateContext = createContext();

const initialState = {
  publisherDetail: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        publisherDetail: [
          ...state.publisherDetail,
          {
            name: action.payload.publisher,
            location: action.payload.location,
          },
        ],
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        publisherDetail: state.publisherDetail.filter(
          (item, index) => index !== action.payload,
        ),
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        publisherDetail: action.payload.updatedArray,
      };

    default:
      return state;
  }
};

export const StateContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {props.children}
    </StateContext.Provider>
  );
};
