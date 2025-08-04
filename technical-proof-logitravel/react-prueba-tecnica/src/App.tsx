import React from "react";
import { HomePage } from "./pages";
import { ItemsProvider } from "./features/items";

const App: React.FC = () => {
  return (
    <ItemsProvider>
      <HomePage />
    </ItemsProvider>
  );
};

export default App;
