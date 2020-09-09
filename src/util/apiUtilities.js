export function requestHasRequiredFields(request, fields) {
    let valid = true;
    fields.forEach(f => {
        if (request[f] === undefined)
            valid = false;
    });
    return valid;
}
