import type { Profile } from "../content/schema";

const base = import.meta.env.BASE_URL;

export interface ProfileCardVm {
  avatarUrl?: string;
  name: string;
  title: string;
  handle?: string;
  status: string;
  contactText: string;
  theme: "dark";
}

export function toProfileCardVm(profile: Profile, contactText: string): ProfileCardVm {
  const github = profile.contacts.find((c) => c.type === "github");
  const handle = github ? github.url.replace(/\/+$/, "").split("/").pop() : undefined;
  return {
    avatarUrl: profile.photo ? `${base.replace(/\/$/, "")}${profile.photo}` : undefined,
    name: profile.name,
    title: profile.title,
    handle,
    status: "",
    contactText,
    theme: "dark",
  };
}
