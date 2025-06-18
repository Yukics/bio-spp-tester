// import { readdir } from "fs/promises";
import { readdirSync } from 'fs';

export function changeTest(testName: string) {
  if ("URLSearchParams" in window) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("name", testName);
    window.location.search = searchParams.toString();
  }
}

export const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)