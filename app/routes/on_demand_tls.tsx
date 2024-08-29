import { createId } from "@paralleldrive/cuid2";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const domain = new URL(request.url).searchParams.get("domain") ?? "";
  console.log(`checking ${domain} `);
  if (["ah.bchoii.com"].includes(domain)) {
    console.log(`Domain ${domain} is accepted`);
    return "";
  }
  console.log(`Domain ${domain} is rejected`);
  // if (domain?.endsWith("que.sg")) return "";
  // if (domain?.endsWith("que.bz")) return "";
  // if (domain?.endsWith("quick-queue.com")) return "";
  throw new Response(null, { status: 404 });
};
