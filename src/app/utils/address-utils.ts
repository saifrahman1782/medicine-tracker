export function findAddressNumber(addressComponents: {long_name: string, short_name: string, types: string[]}[]): string {
    return findAddressComponent(addressComponents, "street_number");
}

export function findCity(addressComponents: {long_name: string, short_name: string, types: string[]}[]): string {
    return findAddressComponent(addressComponents, "locality");
}

export function findNeighborhood(addressComponents: {long_name: string, short_name: string, types: string[]}[]): string {
    return findAddressComponent(addressComponents, "sublocality") ||
        findAddressComponent(addressComponents, "sublocality_level_1");
}

export function findCounty(addressComponents: {long_name: string, short_name: string, types: string[]}[]): string {
    return findAddressComponentShortName(addressComponents, "administrative_area_level_2");
}

export function findCountyShortName(addressComponents: {long_name: string, short_name: string, types: string[]}[]): string {
    return findAddressComponentShortName(addressComponents, "administrative_area_level_1");
}

export function findAddress(addressComponents: {long_name: string, short_name: string, types: string[]}[]): string {
    return findAddressComponent(addressComponents, "route");
}

export function findPostCode(addressComponents: {long_name: string, short_name: string, types: string[]}[]): string {
    let element = ""
    addressComponents.forEach((a: any) => {
        let hasPostCode = a.types.some((t: any) => t == "postal_code");
        if (hasPostCode) {
            element = a.long_name;
        }
    });
    return element;
}

export function findAddressComponent(
    addressComponents: {long_name: string, short_name: string, types: string[]}[],
    type: string
) : string {
    let element = addressComponents.find(a => a.types.some(t => t == type));
    return element ? element.long_name : '';
}

export function findAddressComponentShortName(
    addressComponents: {long_name: string, short_name: string, types: string[]}[],
    type: string
) : string {
    let element = addressComponents.find(a => a.types.some(t => t == type));
    return element ? element.short_name : '';
}
