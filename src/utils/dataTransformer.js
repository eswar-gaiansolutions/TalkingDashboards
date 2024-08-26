export const transformDataForLineChart = (rawData, sourceType) => {
  const transformedData = {};

  rawData.forEach((item) => {
    let year, userCount, MIA;

    if (sourceType === "BQ") {
      // Assuming BigQuery returns data in a format where fields are nested or have different keys
      year = item.year_field; // Replace 'year_field' with the actual field name in BQ data
      userCount = item.user_count_field; // Replace 'user_count_field' with the actual field name in BQ data
      MIA = item.mia_field; // Replace 'mia_field' with the actual field name in BQ data
    } else {
      // Assuming the standard query returns data as before
      ({ year, userCount, MIA } = item);
    }

    if (!transformedData[year]) {
      transformedData[year] = {};
    }
    transformedData[year][MIA] = userCount;
  });

  // Convert to array of objects where each object represents a year with all MIAs
  return Object.keys(transformedData).map((year) => ({
    year,
    ...transformedData[year],
  }));
};

