export type URLParam = {
  nab: number,
  oTab: number,
  oType: string,
  oId: string | null,
  implId: string | null,
  fIndex: number | null,
  frBN: number | null,
  toBN: number | null
}

export function classNames(...classes): string {
  return classes.filter(Boolean).join(' ')
}

export function getURLParam(hashURL: string): URLParam {
  hashURL = hashURL.replaceAll("#", "");
  var params: (string | undefined)[] = hashURL.split("/");

  if (params[3] === "null") params[3] = undefined;
  if (params[4] === "null") params[4] = undefined;
  if (params[5] === "null") params[5] = undefined;
  if (params[6] === "null") params[6] = undefined;
  if (params[7] === "null") params[7] = undefined;

  let urlParam: URLParam = {
    nab: params[0] === undefined ?  0 : Number(params[0]),
    oTab: params[1] === undefined ? 0 : Number(params[1]),
    oType: params[2] === undefined ? "account" : params[2],
    oId: params[3] === undefined ? null : params[3],
    implId: params[4] === undefined ? null : params[4],
    fIndex: params[5] === undefined ? null :Number(params[5]),
    frBN: params[6] === undefined ? null : Number(params[6]),
    toBN: params[7] === undefined ? null : Number([7])
  }
  
  return urlParam;
}