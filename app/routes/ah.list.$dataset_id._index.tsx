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
      <div className="p-2">
        <div>Documents</div>
        <table>
          <tr>
            <th></th>
            <th>Document ID</th>
            <th>tokens</th>
            <th>display_status</th>
            <th>indexing_status</th>
            <th>word_count</th>
            <th>hit_count</th>
            <th>Action</th>
          </tr>
          {!data.documents.data.length && (
            <tr>
              <td></td>
              <td>No documents</td>
            </tr>
          )}
          {data.documents.data.map((document) => (
            <tr>
              <td></td>
              <td>
                <Link className="text-blue-700 underline" to={document.id}>
                  {document.id}
                </Link>
              </td>
              <td>{document.tokens}</td>
              <td>{document.display_status}</td>
              <td>{document.indexing_status}</td>
              <td>{document.word_count}</td>
              <td>{document.hit_count}</td>
              <td>
                <Form action={document.id} method="delete">
                  <button>Delete Document</button>
                </Form>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="m-2 border p-5">
        <Form method="post">
          <textarea name="text"></textarea>
          <button>Add New Document</button>
        </Form>
      </div>
    </>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  console.log("Delete ?");
  const formData = await request.formData();
  const form = serialiseForm(formData);

  const result = await fetch(
    `${process.env.DIFY_SERVER}/datasets/${params.dataset_id}/document/create_by_text`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DIFY_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "text",
        text: form.text,
        indexing_technique: "high_quality",
        process_rule: {
          mode: "automatic",
        },
      }),
    },
  ).then((r) => r.json());

  return result;
};
