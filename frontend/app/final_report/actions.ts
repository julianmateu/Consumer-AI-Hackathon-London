"use server";
import { reportData } from "../mockdata";

function getAPIURL() {
    return process.env.API_URL || "http://localhost:3001";
}

export async function fetchReportData(vehicle: string) {
    console.log('Fetching report data for vehicle:', vehicle);
    const res = await fetch(`${getAPIURL()}/api?vehicle=${vehicle}`);
    console.log('Response:', res);
    const reports = await res.json();
    console.log('Reports:', reports);
    const newData = reports[0];
    const dataOverride = {
        timeOfDay: newData.time_of_day,
        numberOfParties: newData.number_of_parties,
        location: newData.location,
        additionalInfo: newData.additional_information,
        damageLevel: newData.damage_type,
    };
    const result = {...reportData, ...dataOverride}
    return result;
}