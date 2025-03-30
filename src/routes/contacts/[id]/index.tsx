import {
  type RouteDefinition,
  action,
  createAsync,
  redirect,
  useParams,
  useSubmission,
} from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { ErrorBoundary, Show } from "solid-js";
import { type ContactRecord, deleteContact, updateContact } from "~/data";
import { queryContact } from "~/queries/contact";

export const route = {
  preload: ({ params }) => queryContact(params.id),
} satisfies RouteDefinition;

const deleteAction = action(async (id: string) => {
  "use server";
  await deleteContact(id);
  throw redirect("/");
}, "deleteContact");

const favoriteAction = action(async (id: string, formData: FormData) => {
  "use server";
  const favorite = formData.get("favorite") === "true";
  await updateContact(id, { favorite });
}, "favoriteContact");

const Contact = () => {
  const params = useParams();
  const contact = createAsync(() => queryContact(params.id));

  return (
    <div id="contact">
      <ErrorBoundary
        fallback={(e: Error) => (
          <Show when={e.message === "Contact not found"}>
            <HttpStatusCode code={404} />
            <h1>Contact not found</h1>
          </Show>
        )}
      >
        <div>
          <img alt={`${contact()?.first} ${contact()?.last} avatar`} src={contact()?.avatar} />
        </div>
        <div>
          <h1>
            <Show when={contact()?.first || contact()?.last} fallback={<i>No Name</i>}>
              {contact()?.first} {contact()?.last}
            </Show>
            <Show when={contact()}>{(contact) => <Favorite contact={contact()} />}</Show>
          </h1>

          <Show when={contact()?.twitter}>
            <p>
              <a href={`https://twitter.com/${contact()?.twitter}`}>{contact()?.twitter}</a>
            </p>
          </Show>

          <Show when={contact()?.notes}>
            <p>{contact()?.notes}</p>
          </Show>

          <div>
            <form action={`/contacts/${contact()?.id}/edit`} method="get">
              <button type="submit">Edit</button>
            </form>

            <form
              action={deleteAction.with(params.id)}
              method="post"
              onSubmit={(e) => {
                const confirmed = confirm("Please confirm you want to delete this record.");
                if (!confirmed) e.preventDefault();
              }}
            >
              <button type="submit">Delete</button>
            </form>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};
export default Contact;

type FavoriteProps = { contact: Pick<ContactRecord, "id" | "favorite"> };
const Favorite = (props: FavoriteProps) => {
  const submission = useSubmission(favoriteAction);
  const favorite = () =>
    submission.pending ? submission.input[1].get("favorite") === "true" : !!props.contact.favorite;

  return (
    <form action={favoriteAction.with(props.contact?.id)} method="post">
      <button
        type="submit"
        aria-label={favorite() ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite() ? "false" : "true"}
      >
        {favorite() ? "★" : "☆"}
      </button>
    </form>
  );
};
