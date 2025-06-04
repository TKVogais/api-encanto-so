const TryCatch = async (query) => {
    const response = await query()
    try {
        return {
            error: false,
            data: response
        }
    } catch (error) {
        return {
            error: true,
            data: error
        }
    }
}

module.exports = TryCatch