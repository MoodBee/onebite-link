"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { LinkItem } from "@/components/LinkCard";

type LinkUpdate = Partial<Pick<LinkItem, "title" | "description" | "folderId">>;

type LinkContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => LinkItem;
  removeLink: (id: string) => void;
  updateLink: (id: string, updates: LinkUpdate) => void;
};

const LinkContext = createContext<LinkContextValue | null>(null);

type LinkProviderProps = {
  initialLinks: LinkItem[];
  children: ReactNode;
};

export function LinkProvider({ initialLinks, children }: LinkProviderProps) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  const addLink = useCallback((link: Omit<LinkItem, "id">) => {
    const newLink: LinkItem = { id: crypto.randomUUID(), ...link };
    setLinks((prev) => [newLink, ...prev]);
    return newLink;
  }, []);

  const removeLink = useCallback((id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }, []);

  const updateLink = useCallback((id: string, updates: LinkUpdate) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...updates } : link)),
    );
  }, []);

  return (
    <LinkContext.Provider value={{ links, addLink, removeLink, updateLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinkProvider");
  }
  return context;
}
