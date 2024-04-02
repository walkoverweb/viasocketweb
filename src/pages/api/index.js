//fetch data from DBDash
export const getDbdashData = async (tableName) => {
    const apiUrl = `https://dbdash-backend-h7duexlbuq-el.a.run.app/65d2ed33fa9d1a94a5224235/${tableName}`
    const authKey = 'keyJZz-15yE8MAp' // Replace 'AUTH_TOKEN' with your actual authentication token

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'auth-key': `keyJZz-15yE8MAp`,
            },
        })
        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error('Error:', error)
    }
}

//fetch data from multiple tables in DB Dash
export default async function fetchDataAndUpdateState(IDs, getDataFunction) {
    for (let i = 0; i < IDs.length; i++) {
        const ID = IDs[i]
        const dbdashData = await getDataFunction(ID)
    }
}

export const integration = async () => {
    const apiUrl = `https://dbdash-backend-h7duexlbuq-el.a.run.app/64f58cfe54919de3f250dc6d/tblwegm8v?limit=25%27`

    // const authKey = 'keyc9x2Q54-PHlP';
    // try{
    //   const response = await fetch(apiUrl, {
    //     method: 'GET',
    //     headers: {
    //       'auth-key': `keyc9x2Q54-PHlP`,
    //     },
    //     body: JSON.stringify(data)
    //   });
    //   const responseData = await response.json();
    //   if(responseData){
    //   }
    //   return responseData;
    // }  catch (error) {
    // }
}
