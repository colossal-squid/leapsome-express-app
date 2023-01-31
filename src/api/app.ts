import "reflect-metadata";
import "dotenv/config";

import { createExpressServer } from "routing-controllers";
import { UserController } from "./modules/users/user.controller";
import { FeedbackController } from "./modules/feedback/feedback.controller";

const app = createExpressServer({
  cors: true,
  controllers: [UserController, FeedbackController],
  validation: true,
  classTransformer: true,
  /*
  plainToClassTransformOptions: {
    strategy: "excludeAll",
  },
  */
});

export { app };
