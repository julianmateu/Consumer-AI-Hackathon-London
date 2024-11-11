"use server";
import { reportData } from "../mockdata";

function getAPIURL() {
    return process.env.API_URL || `http://localhost:${process.env.PORT || 3000}`;
}

export async function fetchReportData(vehicle: string, isFirstTime: boolean): Promise<Record<string, string>> {
    // console.log('Fetching report data for vehicle:', vehicle);
    // const res = await fetch(`${getAPIURL()}/api?vehicle=${vehicle}`);
    // console.log('Response:', res);
    // const reports = await res.json();
    // console.log('Reports:', reports);
    // const newData = reports[0];

    // const res2 = await fetch(`${getAPIURL()}/api/save-image-result?vehicle=${vehicle}`);
    // console.log('Response:', res2);
    // const reports2 = await res2.json();
    // console.log('Reports:', reports2);
    // const newData2 = reports2[0];

    // const dataOverride = {
    //     timeOfDay: newData.time_of_day,
    //     numberOfParties: newData.number_of_parties,
    //     location: newData.location,
    //     additionalInfo: newData.additional_information,
    //     damageLevel: isFirstTime ? newData2.damage_level : newData.damage_type,
    //     damageDescription: newData2.damage_description,
    // };
    // const result = {...reportData, ...dataOverride}

    // COMMENTING OUT BACKEND - MATT POST HACKATHON
    const result = reportData;
    return result;
}