import { A, action, createAsync, query, redirect } from "@solidjs/router";
import { For, Show, Suspense } from "solid-js";
import { queryContacts } from "~/queries/contact";
import { createEmptyContact, getContacts } from "../data";

const addContact = action(async () => {
  "use server";
  const contact = await createEmptyContact();
  throw redirect(`/contacts/${contact.id}/edit`);
}, "addContact");

const Sidebar = () => {
  const contacts = createAsync(() => queryContacts());
  const contactsLength = () => contacts()?.length || 0;
  return (
    <div id="sidebar">
      <h1>
        <A href="/about">Solid Start Contacts</A>
      </h1>
      <div>
        <form id="search-form">
          <input aria-label="Search contacts" id="q" name="q" placeholder="Search" type="search" />
          <div aria-hidden hidden={true} id="search-spinner" />
        </form>
        <form action={addContact} method="post">
          <button type="submit">New</button>
        </form>
      </div>
      <nav>
        <Suspense>
          <Show
            when={contactsLength() > 0}
            fallback={
              <p>
                <i>No contacts</i>
              </p>
            }
          >
            <ul>
              <For each={contacts()}>
                {(contact) => (
                  <li>
                    <A href={`/contacts/${contact.id}`}>
                      <Show when={contact.first || contact.last} fallback={<i>No Name</i>}>
                        {contact.first} {contact.last}
                      </Show>
                      <Show when={contact.favorite}>
                        <span>★</span>
                      </Show>
                    </A>
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </Suspense>
      </nav>
    </div>
  );
};
export default Sidebar;
