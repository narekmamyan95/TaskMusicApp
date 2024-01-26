import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "../component/header/Header";

const mockStore = configureStore();

test("should be in app", () => {
  const store = mockStore({});
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  const headerPage = screen.getByTestId("test-1");
  expect(headerPage).toBeInTheDocument();
});
