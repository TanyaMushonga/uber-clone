// utils/coordinates.ts
export function generateRandomCoordinates() {
  const coordinates = [
    {
      name: "National Gallery of Zimbabwe",
      address: "20 Julius Nyerere Way, Harare, Zimbabwe",
      latitude: "-17.8292",
      longitude: "31.0522",
    },
    {
      name: "Harare Gardens",
      address: "Harare, Zimbabwe",
      latitude: "-17.8265",
      longitude: "31.0487",
    },
    {
      name: "Mukuvisi Woodlands",
      address: "Hillside Rd, Harare, Zimbabwe",
      latitude: "-17.8486",
      longitude: "31.0610",
    },
    {
      name: "Chapungu Sculpture Park",
      address: "Doonside, Msasa, Harare, Zimbabwe",
      latitude: "-17.8312",
      longitude: "31.1204",
    }
  ];

  // Randomly select one of the coordinates
  const randomIndex = Math.floor(Math.random() * coordinates.length);
  return coordinates[randomIndex];
}