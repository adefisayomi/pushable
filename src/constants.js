export const __PROD__ = process.env.NODE_ENV === 'production'

//
export function errorMessage(err) {
  if (!__PROD__) {
    console.log(({
      success: false,
      message: err.message,
      data: null
    }))
  }
  return ({
    success: false,
    message: err.message,
    data: null
  })
}
