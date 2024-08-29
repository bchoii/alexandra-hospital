import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { destroySession, getSession } from "../utils/sessions";
import {
  Form,
  Link,
  Outlet,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { serialiseForm } from "app/utils/utils";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const documents = await fetch(
    `${process.env.DIFY_SERVER}/datasets/${params.dataset_id}/documents`,
    {
      headers: {
        Authorization: `Bearer ${process.env.DIFY_KEY}`,
      },
    },
  ).then((r) => r.json());
  // console.log(list);

  return { id: params.dataset_id, documents };
};

export default function Component() {
  const data = useLoaderData();
  const actionData = useActionData();

  return (
    <>
      <div>
        <div className="m-5 flex bg-gray-50 p-5">
          Knowledge ID :{" "}
          <Link className="text-blue-700 underline" to={`.`}>
            {data.id}
          </Link>
          <Form method="delete" className="ms-auto">
            <button>Delete</button>
          </Form>
        </div>
      </div>
      <div className="m-5 bg-gray-50 p-5">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  if (request.method == "DELETE") {
    const result = await fetch(
      `${process.env.DIFY_SERVER}/datasets/${params.dataset_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.DIFY_KEY}`,
        },
      },
    ).then((r) => r.text());

    return redirect("./..");
  }
};
