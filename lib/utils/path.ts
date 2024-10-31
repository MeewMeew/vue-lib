
type _PathParam<Path extends string> =
  // split path into individual path segments
  Path extends `${infer L}/${infer R}`
  ? _PathParam<L> | _PathParam<R>
  : // find params after `:`
  Path extends `:${infer Param}`
  ? Param extends `${infer Optional}?`
  ? Optional
  : Param
  : // otherwise, there aren't any params present
  never

/**
* Examples:
* "/a/b/*" -> "*"
* ":a" -> "a"
* "/a/:b" -> "b"
* "/a/blahblahblah:b" -> "b"
* "/:a/:b" -> "a" | "b"
* "/:a/b/:c/*" -> "a" | "c" | "*"
*/
export type PathParam<Path extends string> =
  // check if path is just a wildcard
  Path extends '*' | '/*'
  ? '*'
  : // look for wildcard at the end of the path
  Path extends `${infer Rest}/*`
  ? '*' | _PathParam<Rest>
  : // look for params in the absence of wildcards
  _PathParam<Path>
// Attempt to parse the given string segment. If it fails, then just return the
// plain string type as a default fallback. Otherwise, return the union of the
// parsed string literals that were referenced as dynamic segments in the route.
export type ParamParseKey<Segment extends string> =
  // if you could not find path params, fallback to `string`
  [PathParam<Segment>] extends [never] ? string : PathParam<Segment>

/**
* The parameters that were parsed from the URL path.
*/
export type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined
}

/**
 * A utility function that generates a path from a route path and parameters.
 * @param originalPath - The route path.
 * @param params - The parameters to replace in the route path.
 * @returns string
 * @example
 * generatePath('/user/:id', { id: '123' }) // /user/123
 * generatePath('/user/:id/:name?', { id: '123' }) // /user/123
 * generatePath('/user/:id/:name?', { id: '123', name: 'john' }) // /user/123/john
 * generatePath('/user/:id/*', { id: '123', name: 'john' }) // /user/123/john
 * generatePath('/user/:id/*', { id: '123' }) // /user/123
 */

export function generatePath<Path extends string>(
  originalPath: Path,
  params: {
    [key in PathParam<Path>]: string | null
  } = {} as any
): string {
  let path: string = originalPath
  if (path.endsWith('*') && path !== '*' && !path.endsWith('/*')) {
    console.warn(
      false,
      `Route path "${path}" will be treated as if it were ` +
      `"${path.replace(/\*$/, '/*')}" because the \`*\` character must ` +
      'always follow a `/` in the pattern. To get rid of this warning, ' +
      `please change the route path to "${path.replace(/\*$/, '/*')}".`
    )
    path = path.replace(/\*$/, '/*') as Path
  }
  const prefix = path.startsWith('/') ? '/' : ''
  const stringify = (p: any) => (p == null ? '' : typeof p === 'string' ? p : String(p))
  const segments = path
    .split(/\/+/)
    .map((segment, index, array) => {
      const isLastSegment = index === array.length - 1
      if (isLastSegment && segment === '*') {
        const star = '*' as PathParam<Path>
        return stringify(params[star])
      }

      const keyMatch = segment.match(/^:([\w-]+)(\??)$/)
      if (keyMatch) {
        const [, key, optional] = keyMatch
        const param = params[key as PathParam<Path>]
        invariant(optional === '?' || param != null, `Missing ":${key}" param`)
        return stringify(param)
      }
      return segment.replace(/\?$/g, '')
    })
    .filter((segment) => !!segment)
  return prefix + segments.join('/')
}

function invariant(value: boolean, message?: string): asserts value
function invariant<T>(value: T | null | undefined, message?: string): asserts value is T
function invariant(value: any, message?: string) {
  if (value === false || value === null || typeof value === 'undefined') {
    throw new Error(message)
  }
}
