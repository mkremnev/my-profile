import ProfileCard from "./ProfileCard";
import { toProfileCardVm, type ProfileCardVm } from "./profileCardVm";
import type { Profile } from "../content/schema";

interface Props {
  profile: Profile;
  contactText: string;
  email?: string;
}

export default function ProfileCardIsland({ profile, contactText, email }: Props) {
  const vm: ProfileCardVm = toProfileCardVm(profile, contactText);
  return (
    <ProfileCard
      {...vm}
      onContactClick={() => {
        if (email) window.location.href = `mailto:${email}`;
      }}
    />
  );
}
