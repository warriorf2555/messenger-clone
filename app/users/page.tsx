import React from "react";
import EmptyState from "../components/EmptyState";

type Props = {};

function Users({}: Props) {
  return (
    <main className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </main>
  );
}

export default Users;
