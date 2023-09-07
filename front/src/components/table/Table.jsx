import { Table, TableCaption, TableContainer, Tbody, Tfoot, Thead } from "@chakra-ui/react";

/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
const TableRoot = ({ title, children }) => {
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

const CustomThead = ({ children }) => {
  return (
    <>
      <Thead> {children} </Thead>
    </>
  );
};

const CustomTbody = ({ children }) => {
  return (
    <>
      <Tbody>{children}</Tbody>
    </>
  );
};

const CustomTfooter = ({ children }) => {
  return (
    <>
      <Tfoot>{children} </Tfoot>
    </>
  );
};

export { TableRoot, CustomThead, CustomTfooter, CustomTbody };
