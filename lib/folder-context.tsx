"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Folder } from "@/components/FolderList";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Folder;
};

const FolderContext = createContext<FolderContextValue | null>(null);

type FolderProviderProps = {
  initialFolders: Folder[];
  children: ReactNode;
};

export function FolderProvider({
  initialFolders,
  children,
}: FolderProviderProps) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = useCallback((name: string) => {
    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name,
      count: 0,
    };
    setFolders((prev) => [...prev, newFolder]);
    return newFolder;
  }, []);

  return (
    <FolderContext.Provider value={{ folders, addFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
