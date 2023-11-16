import { describe, it, vi } from "vitest";
import { getByText, render, screen } from "@testing-library/react";
import { useState, useEffect } from "react";
import RestroomCard from "../Card/Card";
import { Modal } from "../Modal/Modal";
import { ReviewList } from "../ReviewList/ReviewList";

describe("Showing reviews modal", () => {
  it("should show the modal which displays reviews", async () => {
    var data = [
      {
        id: "ChIJNTSZLwnQD4gR1wMmC0JyWaE",
        name: "Hilton Garden Inn Chicago North Shore/Evanston",
        address: "1818 Maple Avenue, Evanston",
        distance: "0.47",
        rating: 1.5,
        types: ["lodging", "point_of_interest", "establishment"],
        priceLevel: "Purchase required ($6)",
        operational: "OPERATIONAL",
      },
      {
        id: "ChIJVdSTYgzQD4gRbzIjM9fLL3k",
        name: "Hilton Orrington/Evanston",
        address: "1710 Orrington Avenue, Evanston",
        distance: "0.46",
        rating: 4.6,
        types: ["lodging", "point_of_interest", "establishment"],
        priceLevel: "Purchase required ($6)",
        operational: "OPERATIONAL",
      },
      {
        id: "ChIJ4-tR8w_QD4gRtzOvW82iYA0",
        name: "Margarita European Inn",
        address: "1566 Oak Avenue, Evanston",
        distance: "0.15",
        rating: 4,
        types: ["lodging", "point_of_interest", "establishment"],
        priceLevel: "Purchase required ($6)",
        operational: "CLOSED_TEMPORARILY",
      },
    ];

    // reason for putting in container: https://testing-library.com/docs/ecosystem-user-event/https://stackoverflow.com/questions/75968559/cannot-read-properties-of-null-reading-usestate-typeerror-cannot-read-prope
    const Contained = ({ data }) => {
      const [dataInput, modifyDataInput] = useState([]);
      const [selected, setSelected] = useState();
      const [open, setOpen] = useState(false);
      const openModal = () => setOpen(true);
      const closeModal = () => setOpen(false);

      return (
        <div>
          <Modal open={open} close={closeModal}>
            <ReviewList selected={selected} open={open} />
          </Modal>
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
    };

   const {getByText} =  render(<Contained data={data} />);
   let g = getByText('Restroom Reviews')
   expect(g).toBeDefined();


  });
});
