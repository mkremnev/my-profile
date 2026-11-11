import type { Profile } from "../content/schema";
import ProfileCard from "./ProfileCard";
import { toProfileCardVm, type ProfileCardVm } from "./profileCardVm";

interface Props {
  profile: Profile;
  contactText: string;
  email?: string;
  telegram?: string;
}

export default function ProfileCardIsland({ profile, contactText, email, telegram }: Props) {
  const vm: ProfileCardVm = toProfileCardVm(profile, contactText);

  const handleClick = () => {
    if (telegram) {
      window.location.href = telegram;
      return;
    }
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  return <ProfileCard {...vm} onContactClick={handleClick} />;
}
