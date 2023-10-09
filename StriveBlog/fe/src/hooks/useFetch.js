const useFetch = async (url) => {
    try {
        const res = await fetch(url)
        return await res.json()
    } catch (e) {
        console.log(e)
    }
}

export default useFetch