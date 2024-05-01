
const fetchJobs = async (limit, offset) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      limit: limit,
      offset: offset,
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
  
    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  
  export default fetchJobs;