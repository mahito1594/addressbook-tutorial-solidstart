import { query } from "@solidjs/router";
import { getContact, getContacts } from "~/data";

export const queryContacts = query(async () => {
  "use server";
  return await getContacts();
}, "contacts");

export const queryContact = query(async (id: string) => {
  "use server";
  const contact = await getContact(id);
  if (contact == null) {
    throw new Error("Contact not found");
  }
  return contact;
}, "contactById");
