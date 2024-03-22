import * as React from "react";
import type { UserRole } from "@/api";
import { userStore } from "@/store/userStore";

interface MatchProps extends React.PropsWithChildren {
  state: UserRole["role"];
}

const { getState } = userStore;

export const Match = ({ state, children }: MatchProps) => {
  if (getState().user === state) {
    return children;
  }
  return null;
};
