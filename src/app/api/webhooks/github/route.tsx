import type { NextRequest } from "next/server";
import { handleIssueOpen } from "./handleIssueOpen";
import { Webhooks } from "@octokit/webhooks";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const signature = request.headers.get("X-Hub-Signature-256");

    const webhooks = new Webhooks({
      secret: process.env.WEBHOOK_SECRET,
    });

    const verified = await webhooks.verify(JSON.stringify(payload), signature);

    if (!verified) {
      return new Response("Invalid request!", {
        status: 400,
      });
    }

    const github_event = request.headers.get("X-GitHub-Event");
    const event_action = payload["action"];

    if (github_event === "issues" && event_action === "opened") {
      handleIssueOpen(payload);
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
