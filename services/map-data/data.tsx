const BASE_URL = "https://backend-blazetrack.fastapicloud.dev";

export async function GetData() {
    const response = await fetch(`${BASE_URL}/api/v1`, {
        cache: "no-store",
    });

    // const parsedresponse = JSON.parse(response.data);

    console.log(response.status);
    console.log(response.statusText);

    if (!response.ok) {
        throw new Error(`Failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
}