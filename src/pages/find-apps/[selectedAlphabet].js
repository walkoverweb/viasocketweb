import AlphabeticalComponent from '@/components/alphabetSort/alphabetSort'

export const config = {
    runtime: 'experimental-edge',
  }

const SelectedAlphabetPage = ({ apps, pathArray }) => {
    return (
        <div className="container py-8  mt-24">
            <div className="pt-4">
                <h1 className="text-center lg:text-2xl md:text-xl text-lg font-semibold pb-4">
                    Apps starting with : {pathArray[2].toUpperCase()}
                </h1>
                <AlphabeticalComponent />

                {apps.length > 0 ? (
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 justify-center items-center py-4">
                        {apps.map((app) => (
                            <a
                                key={app?.rowid}
                                href={
                                    app?.appslugname
                                        ? `/integration/${app?.appslugname}`
                                        : `/noplugin`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                                aria-label="app"
                            >
                                <p className="text-base py-1 ">{app.name}</p>
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-4 text-lg text-red-500">
                        No apps found for the selected alphabet.
                    </p>
                )}
            </div>
        </div>
    )
}

export default SelectedAlphabetPage

// Fetch data from API
export async function getServerSideProps(context) {
    const { selectedAlphabet } = context.query

    const fetchUrl = `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=200`

    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    }

    try {
        const response = await fetch(fetchUrl, apiHeaders)
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        const apps = await response.json()

        // Filter apps based on the selected alphabet
        const filteredApps = selectedAlphabet
            ? apps.filter(
                  (app) =>
                      app.name.charAt(0).toUpperCase() ===
                      selectedAlphabet.toUpperCase()
              )
            : []

        filteredApps.sort((a, b) => a.name.localeCompare(b.name))

        return {
            props: {
                apps: filteredApps,
                pathArray: context.params.selectedAlphabet
                    ? context.params.selectedAlphabet
                    : '',
            },
        }
    } catch (error) {
        console.error('Error fetching apps:', error)

        return {
            props: {
                apps: [],
                pathArray: '',
            },
        }
    }
}
