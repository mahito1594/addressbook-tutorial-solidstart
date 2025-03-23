import { A, type RouteDefinition, createAsync, useParams } from "@solidjs/router";
import { Suspense } from "solid-js";
import { queryContact } from "~/queries/contact";

export const route = {
  preload: ({ params }) => queryContact(params.id),
} satisfies RouteDefinition;

const EditContact = () => {
  const params = useParams();
  const contact = createAsync(() => queryContact(params.id));

  return (
    <Suspense fallback="Loading...">
      <form id="contact-form" method="post">
        <p>
          <span>Name</span>
          <input
            aria-label="First name"
            value={contact()?.first || ""}
            name="first"
            placeholder="First"
            type="text"
          />
          <input
            aria-label="Last name"
            value={contact()?.last || ""}
            name="last"
            placeholder="Last"
            type="text"
          />
        </p>
        <label>
          <span>Twitter</span>
          <input value={contact()?.twitter || ""} name="twitter" placeholder="@jack" type="text" />
        </label>
        <label>
          <span>Avatar URL</span>
          <input
            aria-label="Avatar URL"
            value={contact()?.avatar || ""}
            name="avatar"
            placeholder="https://example.com/avatar.jpg"
            type="text"
          />
        </label>
        <label>
          <span>Notes</span>
          <textarea value={contact()?.notes || ""} name="notes" rows={6} />
        </label>
        <p>
          <button type="submit">Save</button>
          <button type="button">
            <A href={`/contacts/${params.id}`} style={{ "text-decoration": "none" }}>
              Cancel
            </A>
          </button>
        </p>
      </form>
    </Suspense>
  );
};
export default EditContact;
