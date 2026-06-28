import type { NodeExecutor } from "../types";
import { triggerManualExecutor } from "./trigger-manual";
import { httpRequestExecutor } from "./http-request";
import { aiChatExecutor } from "./ai-chat";
import { codeExecutor } from "./code";
import { ifConditionExecutor } from "./if-condition";
import { setVariablesExecutor } from "./set-variables";
import { sendEmailExecutor } from "./send-email";
import { webhookTriggerExecutor } from "./webhook-trigger";
import { outputExecutor } from "./output";
import { loopExecutor } from "./loop";
import { filterExecutor } from "./filter";
import { delayExecutor } from "./delay";

export const executors: Record<string, NodeExecutor> = {
  TRIGGER_MANUAL:   triggerManualExecutor,
  WEBHOOK_TRIGGER:  webhookTriggerExecutor,
  SCHEDULE_TRIGGER: triggerManualExecutor,
  HTTP_REQUEST:     httpRequestExecutor,
  AI_CHAT:          aiChatExecutor,
  CODE:             codeExecutor,
  IF_CONDITION:     ifConditionExecutor,
  SET_VARIABLES:    setVariablesExecutor,
  SEND_EMAIL:       sendEmailExecutor,
  OUTPUT:           outputExecutor,
  LOOP:             loopExecutor,
  FILTER:           filterExecutor,
  DELAY:            delayExecutor,
};
