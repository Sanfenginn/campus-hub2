"use client";

import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "./apolloClient";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";

const ProviderWrapper: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const client = initializeApollo();

  return (
    <ReduxProvider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <ApolloProvider client={client}>{children}</ApolloProvider>
      {/* </PersistGate> */}
    </ReduxProvider>
  );
};

export default ProviderWrapper;
