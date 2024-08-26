import { useEffect, useState } from "react";
import gujaratDistricts from "../../data/gujaratDistricts";
import PieChart from "../Charts/PieChart";
import { generatePieChartData } from "../../utils/dataFormatterChart";

export default function AppsRevenuePerDistrict({ bqId=null, queryString=null }) {
    const [selectedDistrict, setSelectedDistrict] = useState(gujaratDistricts[0]);
    const [mapData, setMapData] = useState(new Map());
    const [chartLoading, setChartLoading] = useState(true)
    const [districtData, setDistrictData] = useState([]);
    const [districtList, setDistrictList] = useState([]);

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
        setDistrictData(mapData.get(selectedDistrict))
    };

    useEffect(() => {
        async function loadMapData() {
            let mapData = await generatePieChartData(bqId,queryString)
            setMapData(mapData)
            setDistrictData(mapData?.get(selectedDistrict))
            setDistrictList([...mapData?.keys()])
        }
        loadMapData()
        setChartLoading(false)
    }, [])

    return (
        <div>
            {chartLoading && <div>Fetching Data...</div>}
            {!chartLoading && <>
                <div>
                    <label htmlFor="district">Select District: </label>
                    <select
                        id="district"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                    >
                        <option value="" disabled>Select a district</option>
                        {districtList.map((district) => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>
                <PieChart chartData={districtData} />
            </>
            }
        </div>
    );
}