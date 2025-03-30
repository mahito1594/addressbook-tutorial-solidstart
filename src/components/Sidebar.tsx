import { A, action, createAsync, redirect, useIsRouting, useSearchParams } from "@solidjs/router";
import { For, Show, Suspense } from "solid-js";
import { queryContacts } from "~/queries/contact";
import { createEmptyContact } from "../data";

const addContact = action(async () => {
  "use server";
  const contact = await createEmptyContact();
  throw redirect(`/contacts/${contact.id}/edit`);
}, "addContact");

const Sidebar = () => {
  const isRouting = useIsRouting();
  const [searchParams, setSearchParams] = useSearchParams<{ q: string }>();
  const contacts = createAsync(() => queryContacts(searchParams.q));
  const contactsLength = () => contacts()?.length || 0;
  return (
    <div id="sidebar">
      <h1>
        <A href="/about">Solid Start Contacts</A>
      </h1>
      <div>
        <form id="search-form">
          <input
            aria-label="Search contacts"
            id="q"
            name="q"
            classList={{ loading: isRouting() }}
            value={searchParams.q || ""}
            placeholder="Search"
            type="search"
            onInput={(ev) => setSearchParams({ q: ev.currentTarget.value })}
          />
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
