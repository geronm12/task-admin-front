import React, { useContext } from "react";
import { DataProvider } from "../../context/DataContext";

export default function HomePage() {
  const { userInfo } = useContext(DataProvider);

  return <div>HomePage</div>;
}
