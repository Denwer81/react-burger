export const checkResponce = async (response: Response) => {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Server Error!')
    } else {
      const error = await response.json()
      throw new Error(error.message)
    }
  }

  return await response.json()
}
