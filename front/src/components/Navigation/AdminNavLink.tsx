import { CustomLink } from "@/components/Navigation/CustomLink";

export const AdminNavLink = () => {
  return (
    <>
      <CustomLink
        to={{ to: "/admin", from: "/" }}
        px={"16px"}
        py={"8px"}
        verticalAlign={"middle"}
        borderRadius={"6px"}
        minW={"130px"}
        textAlign={"center"}
        color={"white"}
        bg={"blue.700"}>
        Page d&apos;accueil
      </CustomLink>
    </>
  );
};
