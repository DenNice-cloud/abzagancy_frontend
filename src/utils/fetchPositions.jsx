import axios from "axios";

export const fetchPositions = async (setPositions) => {
  const apiPositionUrl =
    "https://frontend-test-assignment-api.abz.agency/api/v1/positions";
  try {
    const response = await axios.get(apiPositionUrl);
    const { positions } = response.data;

    const positionsMap = positions.reduce((acc, position) => {
      acc[position.id] = position.name;
      return acc;
    }, {});

    setPositions(positionsMap);
  } catch (error) {
    console.error("Error fetching positions:", error);
  }
};
