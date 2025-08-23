// pages/ganesh-chaturthi-invitation/[family].js
import { DynamicGaneshInvitation } from "@/components/DynamicGaneshInvitation";
import { useRouter } from "next/router";

export default function FamilyInvitation() {
  const router = useRouter();
  const { family } = router.query;
  console.log("family", family);

  return <DynamicGaneshInvitation familyKey={family} />;
}
