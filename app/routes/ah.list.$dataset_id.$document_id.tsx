import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { destroySession, getSession } from "../utils/sessions";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { serialiseForm } from "app/utils/utils";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const document = await fetch(
    `${process.env.DIFY_SERVER}/datasets/${params.dataset_id}/documents/${params.document_id}/segments`,
    {
      headers: {
        Authorization: `Bearer ${process.env.DIFY_KEY}`,
      },
    },
  ).then((r) => r.json());
  // console.log(list);

  return { document };
};

export default function Component() {
  const data = useLoaderData();
  const actionData = useActionData();

  return (
    <>
      <table>
        <tr>
          <th></th>
          <th>content</th>
          <th>word_count</th>
          <th>tokens</th>
          <th>keywords</th>
        </tr>
        {data.document.data.map((d) => (
          <tr>
            <td></td>
            <td>{d.content}</td>
            <td>{d.word_count}</td>
            <td>{d.tokens}</td>
            <td>{d.keywords}</td>
          </tr>
        ))}
      </table>
      <div className="m-10 border p-10">
        <Form method="delete">
          <button>Delete Document</button>
        </Form>
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre>; */}
    </>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const form = serialiseForm(formData);

  const result = await fetch(
    `${process.env.DIFY_SERVER}/datasets/${params.dataset_id}/documents/${params.document_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.DIFY_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "text",
        text: form.document,
        indexing_technique: "high_quality",
        process_rule: {
          mode: "automatic",
        },
      }),
    },
  ).then((r) => r.json());

  return redirect("..");
};
