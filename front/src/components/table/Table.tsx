import { Table, TableCaption, TableContainer, Tbody, Tfoot, Thead } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

type TableRootProps = PropsWithChildren & {
  title: string;
};

const TableRoot = ({ title, children }: TableRootProps) => {
  return (
    <>
      <TableContainer border={"3px solid black"} width={"80%"}>
        <Table variant="simple" maxH={"600px"}>
          <TableCaption>{title}</TableCaption>
          {children}
        </Table>
      </TableContainer>
    </>
  );
};

const CustomThead = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Thead>{children}</Thead>
    </>
  );
};

const CustomTbody = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Tbody>{children}</Tbody>
    </>
  );
};

const CustomTfooter = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Tfoot>{children} </Tfoot>
    </>
  );
};

export { TableRoot, CustomThead, CustomTfooter, CustomTbody };
