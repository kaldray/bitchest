import { Table, TableCaption, TableContainer, Tbody, Thead } from "@chakra-ui/react";

/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {JSX.Element} props.thead
 * @param {JSX.Element} props.tbody
 * @returns {JSX.Element}
 */
export const CustomTable = ({ title, thead, tbody }) => {
  return (
    <>
      <TableContainer border={"3px solid black"} width={"80%"}>
        <Table variant="simple">
          <TableCaption>{title}</TableCaption>
          <Thead>{thead}</Thead>
          <Tbody>{tbody}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
