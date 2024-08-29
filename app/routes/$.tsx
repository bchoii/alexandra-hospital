import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useRouteError } from "@remix-run/react";
import { mapError } from "app/root";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const host = request.headers.get("host");
  const ip = request.headers.get("x-forwarded-for");
  const path = params["*"];
  // throw new Response(null, { status: 404 });
  throw json(null, { status: 404 });
  // throw redirect("/");
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const host = request.headers.get("host");
  const ip = request.headers.get("x-forwarded-for");
  const path = params["*"];
  throw json(null, { status: 404 });
};

export function ErrorBoundary() {
  const error = useRouteError();
  console.dir(error);
  return (
    <div className="m-auto">
      Page not found.{" "}
      <a className="block text-blue-600 underline" href="/">
        Go back to root.
      </a>
      {mapError(error).map((e, i) => (
        <pre>{e}</pre>
      ))}
    </div>
  );
}
