import {describe, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event'
import { useState, useEffect } from "react";
import { Sorter } from "./Sorter.jsx";
import RestroomCard from "../Card/Card";

describe('sorting by rating should sort restroom results', () => {
  it('should sort the restrooms in descending order of rating', async () => {
    var data = [
        {
            "id": "ChIJNTSZLwnQD4gR1wMmC0JyWaE",
            "name": "Hilton Garden Inn Chicago North Shore/Evanston",
            "address": "1818 Maple Avenue, Evanston",
            "distance": "0.47",
            "rating": 1.5,
            "types": [
                "lodging",
                "point_of_interest",
                "establishment"
            ],
            "priceLevel": "Purchase required ($6)",
            "operational": "OPERATIONAL"
        },
        {
            "id": "ChIJVdSTYgzQD4gRbzIjM9fLL3k",
            "name": "Hilton Orrington/Evanston",
            "address": "1710 Orrington Avenue, Evanston",
            "distance": "0.46",
            "rating": 4.6,
            "types": [
                "lodging",
                "point_of_interest",
                "establishment"
            ],
            "priceLevel": "Purchase required ($6)",
            "operational": "OPERATIONAL"
        },
        {
            "id": "ChIJ4-tR8w_QD4gRtzOvW82iYA0",
            "name": "Margarita European Inn",
            "address": "1566 Oak Avenue, Evanston",
            "distance": "0.15",
            "rating": 4,
            "types": [
                "lodging",
                "point_of_interest",
                "establishment"
            ],
            "priceLevel": "Purchase required ($6)",
            "operational": "CLOSED_TEMPORARILY"
        }
    ]

    // reason for putting in container: https://testing-library.com/docs/ecosystem-user-event/https://stackoverflow.com/questions/75968559/cannot-read-properties-of-null-reading-usestate-typeerror-cannot-read-prope
    const Contained = ({ data }) => {
        const [dataInput, modifyDataInput] = useState([]);
        const [selected, setSelected] = useState();
        const openModal = () => setOpen(true);
        //modifyDataInput(data);
        return (
            <div>
                <Sorter data={data} getSortedData={modifyDataInput}/>
                <div>
                    {dataInput &&
                    dataInput.map((result) => (
                        <RestroomCard
                            key={result.id}
                            result={result}
                            openModal={openModal}
                            setSelected={setSelected}
                        />
                    ))}
            </div>
          </div>
        );
    }

    // query docs: https://testing-library.com/docs/queries/
    render(<Contained data={data}/>)
    // click docs: https://testing-library.com/docs/ecosystem-user-event/
    await userEvent.click(screen.getByLabelText("sort"));
    //console.log(screen.getByLabelText("distance"))
    await userEvent.click(screen.getByLabelText("rating"));
    const restroomCards = await screen.findAllByLabelText("card");
    //console.log(restroomCards[0].textContent)
    // expect docs: https://vitest.dev/api/expect.html
    for (var i = 0; i < 3; i++) {
        if (i == 0) {
            expect(restroomCards[i].textContent).to.includes("Orrington");
        } else if (i == 1) {
            expect(restroomCards[i].textContent).to.includes("Margarita");
        } else if (i == 2) {
            expect(restroomCards[i].textContent).to.includes("Garden");
        }
    }
  });
});