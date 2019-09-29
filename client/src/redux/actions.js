import { CHANGE_STORY } from './actionTypes';

export const changeStoryAction = (content) => ({
  type: CHANGE_STORY,
  payload: {
    activeStory: content.newStoryName
  }
});
