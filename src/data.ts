/**
 * This file is based on react-router's tutorial which is licensed under the MIT license.
 * See the following link for original source code:
 *   https://github.com/remix-run/react-router/blob/main/tutorials/address-book/app/data.ts
 */
import { matchSorter } from "match-sorter";
import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

const _storage = createStorage<ContactRecord>({ driver: fsDriver({ base: "./.db" }) });

const fackContacts = {
  getAll: async () => {
    const keys = await _storage.keys();
    const result: ContactRecord[] = [];
    for (const key of keys) {
      const record = await _storage.getItem(key);
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      result.push(record!);
    }

    return result.sort((a, b) => {
      const dateComparsion = Date.parse(b.createdAt) - Date.parse(a.createdAt);
      if (dateComparsion === 0) {
        const aLast = a.last || "";
        const bLast = b.last || "";
        return aLast.localeCompare(bLast);
      }
      return dateComparsion;
    });
  },

  get: (id: string) => _storage.getItem(id),

  create: async (values: ContactMutation) => {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    await _storage.setItem(id, newContact);
    return newContact;
  },

  set: async (id: string, values: ContactMutation) => {
    const contact = await _storage.get(id);
    if (!contact) throw new Error(`No contact found for ${id}`);

    const updatedContact = { ...contact, ...values };
    _storage.setItem(id, updatedContact);
    return updatedContact;
  },

  destroy: (id: string) => _storage.removeItem(id),
};

export const getContacts = async (query?: string) => {
  // Simulate a delay - 500ms
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fackContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort((a, b) => {
    const aLast = a.last || "";
    const bLast = b.last || "";
    const stringComparsion = aLast.localeCompare(bLast);
    if (stringComparsion === 0) {
      return Date.parse(a.createdAt) - Date.parse(b.createdAt);
    }
    return stringComparsion;
  });
};

export const createEmptyContact = async () => fackContacts.create({});

export const getContact = async (id: string) =>
  new Promise((resolve) => setTimeout(resolve, 200)).then(() => fackContacts.get(id));

export const updateContact = async (id: string, updates: ContactMutation) =>
  fackContacts.set(id, updates);

export const deleteContact = (id: string) => fackContacts.destroy(id);
