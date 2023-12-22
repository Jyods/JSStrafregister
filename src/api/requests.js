const backend = 'https://api.strafregister.jyods.com/public/api/strafregister';
// const backend = "http://jsstrafregisterbackend.test/api/strafregister"

export async function getFiles() {
    const response = await fetch(`${backend}/files`,{
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    return await response.json();
}

export async function getCase(CaseID) {
    const response = await fetch(`${backend}/files/id/${CaseID}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function getEntries() {
    const response = await fetch(`${backend}/entries/index`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function switchWarrentState(id) {
    const response = await fetch(`${backend}/entries/switchWanted/${id}`,{
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function getOnlyEntries() {
    const response = await fetch(`${backend}/entries/onlyEntry`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function getEntry(EntryID) {
    const response = await fetch(`${backend}/entries/index/${EntryID}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function getMember(MemberID) {
    const response = await fetch(`${backend}/members/${MemberID}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
    });
    return await response.json();
}

export async function getMembers() {
    const response = await fetch(`${backend}/members`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function createFile(data) {
    const response = await fetch(`${backend}/files/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function createEntry(data) {
    const response = await fetch(`${backend}/entries/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}


export async function getCurrentUser() {
    console.log(localStorage.getItem('token'))
    const response = await fetch(`${backend}/user`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return await response.json();
}

export async function authenticateUser(identification, password) {
    const response = await fetch(`${backend}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({identification, password})
    });
    let data = await response.json();
    //print the header from the response
    console.log(response)

    console.log(data);
    if(response.status != 200)
    {
        return data;
    }
    localStorage.setItem('token', data.token);
    console.log(data.status)
    return data;
}

export async function auth(getAll = false) {
    // read document.cookie token
    const token = localStorage.getItem('token');

    console.log(token)
    if (!token) {
      return false;
    }
  
    // send token to backend as bearer token
    const response = await fetch(`${backend}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    // if response status is 500, remove token from document.cookie
    if (response.status === 500) {
        localStorage.removeItem('token');
        console.log("Token removed")
        return false;
    }

    if (response.status === 503) {
        localStorage.removeItem('token');
        console.log("Token removed")
        return false;
    }

    if(response.status === 401) {
        localStorage.removeItem('token');
        console.log("Token removed")
        return false;
    }

    const data = await response.json();
    console.log("Data:",data)

    if (getAll)
    {
        return data;
    }
  
    // return true if response status is 200
    return response.status === 200;
  }

export async function loginByID(id) {
    const response = await fetch(`${backend}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({identification, password})
    });
}
  
export async function getPermissions() {
    const response = await fetch(`${backend}/getPermissions`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
    });
    const data = await response.json();
    console.log(data)
    return data;
}

export async function createUser(data) {
    const response = await fetch(`${backend}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
    });
    let res = await response.json();
    console.log(res);
    if(res.message == "User created")
    {
        return true;
    }
    return false;
}

export async function logout() {
    const response = await fetch(`${backend}/logout`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            console.log(data)
    return data;
}

export async function switchActive(id) {
    const response = await fetch(`${backend}/switchActive/${id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function getLaws() {
    const response = await fetch(`${backend}/law`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function getLawID(id) {
    const response = await fetch(`${backend}/law/${id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function createFileLaw(data) {
    const response = await fetch(`${backend}/filelaw`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function getRanks() {
    const response = await fetch(`${backend}/ranks`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function getCompanies() {
    const response = await fetch(`${backend}/company`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function editUser(data) {
    const response = await fetch(`${backend}/members`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
    });
    console.log(data)
    return await response.json();
}

export async function publishCase(id) {
    console.warn(id)
    const response = await fetch(`${backend}/publish/case/id/${id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function getPublishedCase(route) {
    const response = await fetch(`${backend}/publish/case/route/${route}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function deletePublishedCase(id) {
    const response = await fetch(`${backend}/publish/case/id/${id}`,{
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return response.json();
}

export async function sendMinorMessage(data) {
    const response = await fetch(`${backend}/event/minor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function sendMajorMessage(data) {
    const response = await fetch(`${backend}/event/major`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function getODT() {
    const response = await fetch(`${backend}/odt`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function storeODT(data) {
    const response = await fetch(`${backend}/odt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function getInstitutions() {
    const response = await fetch(`${backend}/institution`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function getAllchat(from = "")
{
    if (from != "")
    {
        const response = await fetch(`${backend}/allchat/${from}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
        return await response.json();
    }
    const response = await fetch(`${backend}/allchat`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

export async function storeAllchat(data) {
    const response = await fetch(`${backend}/allchat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function getAllNeedReply() {
    const response = await fetch(`${backend}/odtreply`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    return await response.json();
}

/*

export async function checkPermission(permission) {
    const response = await fetch(`${backend}/permission/${permission}`);
    return await response.json();
}*/