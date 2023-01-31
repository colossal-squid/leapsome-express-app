import { USER_DATA_SELECTOR } from "../users/constants";

export const FEEDBACK_DATA_SELECTOR = {
  id: true,
  title: true,
  body: true,
  author: { select: USER_DATA_SELECTOR },
  receivers: { select: USER_DATA_SELECTOR },
};
