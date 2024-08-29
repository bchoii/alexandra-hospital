import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { destroySession, getSession } from "../utils/sessions";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { serialiseForm } from "app/utils/utils";

export default function Component() {
  const actionData = useActionData();
  const [value, setValue] = useState("");
  useEffect(() => {
    const defaultValue = `test-${Date.now().toString(36)}`;
    setValue(defaultValue);
  }, []);
  return (
    <div className="m-auto w-96 border p-10 backdrop-blur-lg">
      <Form method="post" className="formgrid">
        <div>
          <div>Name</div>
          <input name="name" placeholder="Name" defaultValue={value}></input>
        </div>
        <div>
          <div>Action</div>
          <button>Create</button>
        </div>
      </Form>
      <pre>{JSON.stringify(actionData, null, 2)}</pre>
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const form = serialiseForm(formData);
  console.log("form", form);

  const result = await fetch(`${process.env.DIFY_SERVER}/datasets`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DIFY_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((r) => r.json());

  console.log(result);

  return redirect(`../list`);
  // return redirect(`../list/${result.id}`);
};
