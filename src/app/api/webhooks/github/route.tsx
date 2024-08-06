import type { NextRequest } from "next/server";
import { handleIssueOpen } from "./issues/handleIssueOpen";
import { Webhooks } from "@octokit/webhooks";
import handleLabelCreated from "./labels/handleLabelCreated";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const signature = request.headers.get("X-Hub-Signature-256");

    const webhooks = new Webhooks({
      secret: process.env.GITHUB_WEBHOOK_SECRET,
    });

    const verified = await webhooks.verify(JSON.stringify(payload), signature);

    if (!verified) {
      return new Response("Invalid request!", {
        status: 400,
      });
    }

    const github_event = request.headers.get("X-GitHub-Event");
    const event_action = payload["action"];

    switch (github_event) {
      case "issues":
        switch (event_action) {
          case "opened":
            await handleIssueOpen(payload);
            break;
          default:
            throw new Error(`Unsupport issue event ${event_action}`);
        }
        break;
      case "label":
        switch (event_action) {
          case "created":
            await handleLabelCreated(payload);
        }
    }
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  return new Response("Success!", {
    status: 200,
  });
}
