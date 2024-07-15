import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

import envVars from "@/configs/envVars";
import UserService from "@/services/user.service";

const CLERK_EVENT = {
  USER: {
    CREATED: "user.created",
  },
};

export async function POST(req: Request) {
  if (!envVars.WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(envVars.WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;
  switch (eventType) {
    case CLERK_EVENT.USER.CREATED:
      console.log(evt);
      const { id, first_name, last_name, image_url, email_addresses } =
        evt.data as UserJSON;
      await UserService.createUser({
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
        avatar: image_url,
        email: email_addresses[0].email_address,
      });
      break;
    default:
      throw new Error(`Invalid event: ${eventType}`);
  }

  return new Response("", { status: 200 });
}
