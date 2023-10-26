const backend = 'https://home-5013253951.app-ionos.space/public/api/logistic';
// const backend = "http://jsstrafregisterbackend.test/api/logistic";

export async function getLogistics() {
    const response = await fetch(`${backend}`,{method: 'GET'});
        return await response.json();
}
