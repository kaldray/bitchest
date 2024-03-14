import { CustomLink } from "@/components/Navigation/CustomLink";

export const ClientNavLink = () => {
  return (
    <>
      <CustomLink
        to="/wallet"
        bg={"blue.700"}
        px={"16px"}
        py={"8px"}
        verticalAlign={"middle"}
        borderRadius={"6px"}
        minW={"130px"}
        textAlign={"center"}
        color={"white"}>
        Mon portefeuille
      </CustomLink>
    </>
  );
};
