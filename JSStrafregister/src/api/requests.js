const backend = 'http://jsstrafregisterbackend.test/api';

export async function getFiles() {
    const response = await fetch(`${backend}/files`);
    return await response.json();
}

export async function getCase(CaseID) {
    const response = await fetch(`${backend}/files/${CaseID}`);
    return await response.json();
}

export async function getEntry(EntryID) {
    const response = await fetch(`${backend}/entries/${EntryID}`);
    return await response.json();
}