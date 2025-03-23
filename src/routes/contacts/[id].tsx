import { createAsync, query, useParams, type RouteDefinition } from "@solidjs/router";
import { Show } from "solid-js";
import { type ContactRecord, getContact } from "~/data";

const queryContact = query(async (id: string) => {
  "use server";
  return await getContact(id);
}, "contactById");

export const route = {
  preload: ({ params }) => queryContact(params.id),
} satisfies RouteDefinition;

const Contact = () => {
  const params = useParams();
  const contact = createAsync(() => queryContact(params.id));

  return (
    <div id="contact">
      <div>
        <img alt={`${contact()?.first} ${contact()?.last} avatar`} src={contact()?.avatar} />
      </div>
      <div>
        <h1>
          <Show when={contact()?.first || contact()?.last} fallback={<i>No Name</i>}>
            {contact()?.first} {contact()?.last}
          </Show>
          <Favorite contact={contact() || undefined} />
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
          <form>
            <button type="submit">Edit</button>
          </form>

          <form
            onSubmit={(e) => {
              const confirmed = confirm("Please confirm you want to delete this record.");
              if (!confirmed) e.preventDefault();
            }}
          >
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;

type FavoriteProps = { contact?: Pick<ContactRecord, "favorite"> };
const Favorite = (props: FavoriteProps) => {
  const favorite = () => props.contact?.favorite || false;

  return (
    <form>
      <button
        type="button"
        aria-label={favorite() ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite() ? "false" : "true"}
      >
        {favorite() ? "★" : "☆"}
      </button>
    </form>
  );
};
