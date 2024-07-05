let encoder = new TextEncoder();

async function verifySignature(secret, signature, payload) {
  let parts = signature.split("=");
  let sigHex = parts[1];

  let algorithm = { name: "HMAC", hash: { name: "SHA-256" } };
  let keyBytes = encoder.encode(secret);

  let extractable = false;
  let key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    algorithm,
    extractable,
    ["sign", "verify"],
  );

  let sigBytes = hexToBytes(sigHex);
  let dataBytes = encoder.encode(payload);
  let equal = await crypto.subtle.verify(
    algorithm.name,
    key,
    sigBytes,
    dataBytes,
  );

  return equal;
}

function hexToBytes(hex) {
  let len = hex.length / 2;
  let bytes = new Uint8Array(len);

  let index = 0;
  for (let i = 0; i < hex.length; i += 2) {
    let c = hex.slice(i, i + 2);
    let b = parseInt(c, 16);
    bytes[index] = b;
    index += 1;
  }

  return bytes;
}

export async function POST(request) {
  try {
    const payload = await request.json();

    if (
      !verifySignature(
        process.env.GITHUB_WEBHOOK_SECRET,
        request.headers.get("X-Hub-Signature-256"),
        payload,
      )
    ) {
      return new Response("Invalid request!", {
        status: 400,
      });
    }

    const github_event = request.headers.get("X-GitHub-Event");
    const event_action = payload["action"];
    if (github_event === "issues" && event_action === "opened") {
      handleIssueOpen(request);
    }
    console.log(github_event, event_action);
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  return new Response("Success!", {
    status: 200,
  });
}

function handleIssueOpen(request) {}