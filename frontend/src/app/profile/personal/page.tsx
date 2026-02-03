"use client";

import ProfileContainer from "@/components/Profile/ProfilePage";
import { useAuth } from "@/hook/auth";

export default function ProfilePage() {
  const { user } = useAuth();

  return <ProfileContainer user={user} />;
}
