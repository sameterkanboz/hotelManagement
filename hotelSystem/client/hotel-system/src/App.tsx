import MyRoutes from "routes/routes";
import Header from "core/header/header";
import { UiProvider } from "view-model/uiContext";
import { AuthProvider } from "view-model/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UiProvider>
            <Header />
            <MyRoutes />
          </UiProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
