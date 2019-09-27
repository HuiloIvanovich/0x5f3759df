import { CHANGE_STORY } from "../actionTypes";

const initialState = {
  activeStory: 'popular'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_STORY: {
      console.log("change story action! was", state);
      const  newStoryName  = action.payload.activeStory;
      console.log("new st name is ", newStoryName);
      return {
        ...state,
        activeStory: newStoryName
      };
    }
    default:
      return state;
  }
}
