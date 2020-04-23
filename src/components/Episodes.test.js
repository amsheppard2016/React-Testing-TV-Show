import React from "react";
import { render } from "@testing-library/react";

import Episodes from "./Episodes";

test("Episodes renders episodes", () => {
    const mockData = [
        {
            id: 1234,
            image: { medium: "url-one.jpg" },
            name: "name",
            season: 1,
            number: 1,
            summary: "<p>summary</p>",
            runtime: 60,
        },
    ];

    const { queryAllByText, rerender } = render(<Episodes episodes={[]} />);

    let allEpisodes = queryAllByText(/episode/i);

    expect(allEpisodes).toHaveLength(0);
    expect(allEpisodes).toStrictEqual([]);

    rerender(<Episodes episodes={mockData} />);
    allEpisodes = queryAllByText(/episode/i);
    expect(allEpisodes).toHaveLength(1);
});
