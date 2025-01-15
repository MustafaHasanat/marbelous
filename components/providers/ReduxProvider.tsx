import { Provider } from "react-redux";
import { persistor, store } from "../../lib/store";
import { PersistGate } from "redux-persist/integration/react";
import { LoadingSpinner } from "@/components";

/**
 * * The persist gate prevents the hydration errors caused by the difference
 * * between the UI in the server side and the new one rendered in the client side
 * * due to filling the persisted data after it was applied on the client side
 */

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<LoadingSpinner isFullPage />}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default ReduxProvider;
