import { prerender as ssr, hydrate } from 'preact-iso'
import { App } from './app.tsx'
 
if (typeof window !== 'undefined') {
    hydrate(<App />, document.getElementById('app')!)
}

export async function prerender(data: any) {
    return await ssr(<App {...data} />)
}