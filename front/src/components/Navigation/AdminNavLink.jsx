import { CustomLink } from "@/components/Navigation/CustomLink";

export const AdminNavLink = () => {
  return (
    <>
      <CustomLink
        to={"/"}
        from={"/"}
        bg={"blue.700"}
        px={"16px"}
        py={"8px"}
        verticalAlign={"middle"}
        borderRadius={"6px"}
        minW={"130px"}
        textAlign={"center"}
        color={"white"}>
        Page d&apos;accueil
      </CustomLink>
    </>
  );
};
