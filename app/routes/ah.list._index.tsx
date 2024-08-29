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

export const loader = async ({ request }: { request: Request }) => {
  const list = await fetch(
    `${process.env.DIFY_SERVER}/datasets?page=1&limit=20`,
    {
      headers: {
        Authorization: `Bearer ${process.env.DIFY_KEY}`,
      },
    },
  ).then((r) => r.json());
  // console.log(list);

  return list;
};

export default function Component() {
  const data = useLoaderData();
  const actionData = useActionData();
  return (
    <div className="m-auto flex flex-wrap">
      {data.data.map((d) => (
        <Link
          to={d.id}
          className="container relative m-2 max-w-64 cursor-pointer rounded-lg bg-gray-100 p-4 shadow transition hover:bg-white hover:shadow-lg"
        >
          <div className="text-bold">{d.name}</div>
          <div className="text-gray-400">{d.document_count} documents</div>
        </Link>
      ))}
    </div>
  );
}
