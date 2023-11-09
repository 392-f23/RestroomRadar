import {describe, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import { useState, useEffect } from "react";
import Sorter from "./Sorter.jsx";

describe('sorting by distance should sort restroom results', () => {
  it('should sort the restrooms in ascending order of distance', () => {
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

    //https://stackoverflow.com/questions/75968559/cannot-read-properties-of-null-reading-usestate-typeerror-cannot-read-prope
    const contained = () => {
        const [dataInput, modifyDataInput] = useState([]);
        modifyDataInput(data);
        console.log(dataInput);
        render(<Sorter data={dataInput} getSortedData={modifyDataInput}/>)
        screen.getByText("Sort By")
        screen.getByText('Distax');

        return (
            <div></div>
        )
    }

    contained();
  });
});