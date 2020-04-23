import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { fetchShow as mockFetchShow } from "./api/fetchShow";

import App from "./App";

jest.mock("./api/fetchShow");
console.log(mockFetchShow);

test("App fetches episode data and render data", async () => {
    const mockData = [
        {
            data: {
                image: { original: "url-two.jpg" },
                name: "show name",
                summary: "<p>show summary</p>",
                _embedded: {
                    episodes: [{ season: 1, id: 1 }],
                },
            },
        },
    ];
    mockFetchShow.mockResolvedValueOnce(mockData);
    const { getByText, queryAllByText } = render(<App />);
    const button = getByText(/Select a season/i);
    fireEvent.click(button);

    getByText(/Fetching data/i);
    await waitFor(() => {
        expect(queryAllByText(/episodes/i)).toHaveLength(1);
    });
});
