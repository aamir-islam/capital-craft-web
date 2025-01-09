 // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
 export const debounce = (func: Function, delay : number)=>{
    let timeoutId : NodeJS.Timeout; ;
    return (...args: unknown[]) => {
          clearInterval(timeoutId)
          timeoutId = setTimeout(()=> func(...args), delay)
    }
}